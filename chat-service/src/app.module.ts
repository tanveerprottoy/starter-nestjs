import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import type { RedisClientOptions } from "redis";
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WsModule } from "./modules/ws/ws.module";
import { ChatsModule } from "./modules/chats/chats.module";
import { EnvUtils } from "./utils/env.utils";
@Module({
    imports: [
        ConfigModule.forRoot(),
        WinstonModule.forRoot({
            transports: [
                new transports.File({
                    level: "debug",
                    filename: "logs/onboarding-debug.log"
                }),
                new transports.File({
                    level: "error",
                    filename: "logs/onboarding-error.log",
                })
            ],
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.printf(info => `${[info.timestamp]}|[${info.level.toUpperCase()}]|${info.message}|${info.level.toUpperCase()} STACK:\n${info.stack}`),
            ),
        }),
        CacheModule.registerAsync<RedisClientOptions>({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async () => {
                const store = await redisStore({
                    url: EnvUtils.getRedisUrl(),
                });
                return {
                    store: () => store,
                };
            },
        }),
        /* CacheModule.register<RedisClientOptions>({
            store: redisStore({
                url: EnvUtils.getRedisUrl()
            }),
            isGlobal: true,
        }), */
        ChatsModule,
        WsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule {

}
