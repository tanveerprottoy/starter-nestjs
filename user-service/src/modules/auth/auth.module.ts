import { HttpModule } from "@nestjs/axios";
import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { HttpClient } from "../../core/clients/http.client";
import { ClientProxyHelper } from "../../core/helpers/client-proxy.helper";
import JwtConfigService from "../../libs/jwt/jwt-config.service";
import { UsersRepository } from "../users/users.repository";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtClient } from "../../libs/jwt/jwt.client";
import { EventHelper } from "../../core/helpers/event.helper";

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        HttpModule
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        UsersRepository,
        JwtClient,
        HttpClient,
        ClientProxyHelper,
    ],
    /* exports: [
        AuthService,
        UsersRepository
    ] */
})
export class AuthModule {
}
