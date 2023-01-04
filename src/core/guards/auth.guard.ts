import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import JwtClient from "../../libs/jwt/jwt.client";
import { UsersService } from "../../modules/users/users.service";
import { Reflector } from "@nestjs/core";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import HttpUtils from "../../utils/http.utils";
// import * as jwt from 'jsonwebtoken';

export interface AuthGuardConfig {
    disabled?: boolean;
}

export const AUTH_GUARD_CONFIG = Symbol("AUTH_GUARD_CONFIG");

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtHelper: JwtClient,
        private readonly usersService: UsersService,
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
        try {
            const token = HttpUtils.parseToken(req);
            if(!token) {
                return false;
            }
            /*  const jwtPayload = this.jwtHelper.verifyToken(token);
            const data = await this.usersService.fetchOne(
                jwtPayload.userId
            );
            if(!data || data instanceof Error) {
                return false;
            }
            req["user"] = data._doc;
            req["token"] = token;
            req["jwtPayload"] = jwtPayload; */
            return true;
        }
        catch(e) {
            this.logger.error(e);
            /* if(e instanceof jwt.TokenExpiredError) {
                
            } */
            return false;
        }
    }
}