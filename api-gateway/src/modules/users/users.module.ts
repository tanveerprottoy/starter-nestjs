import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { ClientsModule } from "@nestjs/microservices";
import { Services } from "../../utils/constants";
import { UserClientsModuleOptions } from "../../components/clients-modules-options/user-clients-module.options";
import { ClientProxyHelper } from "../../components/helpers/client-proxy.helper";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: Services.USER_SERVICE,
                useClass: UserClientsModuleOptions
            }
        ]),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository,
        ClientProxyHelper,
    ]
})
export class UsersModule { }
