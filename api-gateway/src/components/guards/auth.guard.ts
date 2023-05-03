import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { ClientProxy } from "@nestjs/microservices";
import { ClientProxyHelper } from "../helpers/client-proxy.helper";
import { Services } from "../../utils/constants";

export interface AuthGuardConfig {
    disabled?: boolean;
}

export const AUTH_GUARD_CONFIG = Symbol("AUTH_GUARD_CONFIG");

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        @Inject(Services.USER_SERVICE)
        private client: ClientProxy,
        private clientProxyHelper: ClientProxyHelper,
        private reflector: Reflector,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        if(this.checkIfPublicRoute(context)) {
            return true;
        }
        return await this.validateRequest(req);
    }

    private checkIfPublicRoute(
        context: ExecutionContext
    ) {
        const handlerConfig = this.reflector.get<AuthGuardConfig>(
            AUTH_GUARD_CONFIG,
            context.getHandler(),
        );
        const controllerConfig = this.reflector.get<AuthGuardConfig>(
            AUTH_GUARD_CONFIG,
            context.getClass(),
        );
        if(controllerConfig?.disabled || handlerConfig?.disabled) {
            return true;
        }
        return false;
    }

    async validateRequest(req: any): Promise<boolean> {
        const data = await this.clientProxyHelper.send(
            "authorization",
            {
                bearerToken: req.headers.authorization
            },
            this.client
        ).catch(err => {
            this.logger.error(err);
            return false;
        });
        if(!data) {
            return false;
        }
        if(data.user) {
            req["user"] = data.user;
            return true;
        }
        return false;
    }
}