import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from "./users.repository";
import { EventHelper } from "../../core/helpers/event.helper";
import { AppConfigs } from "../../core/configs/app.configs";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        HttpModule.register({
            timeout: AppConfigs.HTTP_TIMEOUT,
        }),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository,
        EventHelper,
    ]
})
export class UsersModule { }
