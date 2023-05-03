import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ErrorUtils } from "../../utils/error.utils";
import { ResponseUtils } from "../../utils/response.utils";
import { ClientProxyHelper } from "../../components/helpers/client-proxy.helper";
import { Services } from "../../utils/constants";

@Injectable()
export class ChatsService {

    constructor(
        @Inject(Services.CHAT_SERVICE)
        private client: ClientProxy,
        private clientProxyHelper: ClientProxyHelper,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    async create(dto: any): Promise<any> {
        return ResponseUtils.buildData(
            await this.clientProxyHelper.send(
                "createChat",
                dto,
                this.client
            ).catch(err => {
                this.logger.error(err);
                ErrorUtils.handleError(err);
            })
        );
    }

    async findAllForUser(
        userSk: string,
        limit: string,
        startKey: any,
    ) {
        return ResponseUtils.buildData(
            await this.clientProxyHelper.send(
                "findAllChatsForUser",
                {
                    userSk: userSk,
                    limit: limit,
                    startKey: startKey,
                },
                this.client
            ).catch(err => {
                this.logger.error(err);
                ErrorUtils.handleError(err);
            })
        );
    }

    async getChatWSEndpointPort() {
        return ResponseUtils.buildData(
            await this.clientProxyHelper.send(
                "getChatWSEndpointPort",
                {},
                this.client
            ).catch(err => {
                this.logger.error(err);
                ErrorUtils.handleError(err);
            })
        );
    }
}
