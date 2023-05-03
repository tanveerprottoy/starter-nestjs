import { BullModule } from "@nestjs/bull";
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigClientInstance } from "./libs/clients/config.client";
import { JobsModule } from './modules/jobs/jobs.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from "@nestjs/config";
import { TimeoutInterceptor } from "./components/interceptors/timeout.interceptor";
import { ResponseInterceptor } from "./components/interceptors/response.interceptor";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.env.NODE_ENV}.env`
        }),
        BullModule.forRootAsync({
            useFactory: async () => ({
                redis: {
                    host: ConfigClientInstance.getValue("redisHost"),
                    port: ConfigClientInstance.getValue("redisPort")
                },
            }),
        }),
        /* BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: BuildUtils.getRedisHost(configService),
                    port: BuildUtils.getRedisPort(configService)
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.forRoot({
            // url: "redis://localhost:6379"
            redis: {
                host: ConfigClientInstance.getValue("redisHost"),
                port: ConfigClientInstance.getValue("redisPort"),
            },
        }), */
        WinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    filename: "logs/debug.log",
                    level: "debug",
                    // maxFiles: "30d"
                }),
                new winston.transports.File({
                    filename: "logs/error.log",
                    level: "error",
                    // maxFiles: "30d"
                }),
            ],
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(info => `${[info.timestamp]}|[${info.level.toUpperCase()}]|${info.message}|${info.level.toUpperCase()} STACK:\n${info.stack}`),
            ),
        }),
        JobsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule { }
