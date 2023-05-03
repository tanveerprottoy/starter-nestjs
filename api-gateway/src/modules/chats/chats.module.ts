import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ClientsModule } from "@nestjs/microservices";
import { UserClientsModuleOptions } from "../../components/clients-modules-options/user-clients-module.options";
import { ChatClientsModuleOptions } from "../../components/clients-modules-options/chat-clients-module.options";
import { ClientProxyHelper } from "../../components/helpers/client-proxy.helper";
import { Services } from "../../utils/constants";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: Services.USER_SERVICE,
                useClass: UserClientsModuleOptions
            },
            {
                name: Services.CHAT_SERVICE,
                useClass: ChatClientsModuleOptions
            },
        ]),
    ],
    controllers: [ChatsController],
    providers: [
        ChatsService,
        ClientProxyHelper,
    ]
})
export class ChatsModule { }
