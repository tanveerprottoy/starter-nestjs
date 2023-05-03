import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from "./modules/auth/auth.module";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";

@Module({
    imports: [
        ConfigModule.forRoot(),
        EventEmitterModule.forRoot({
            // set this to `true` to use wildcards
            wildcard: false,
            // the delimiter used to segment namespaces
            delimiter: '.',
            // set this to `true` if you want to emit the newListener event
            newListener: false,
            // set this to `true` if you want to emit the removeListener event
            removeListener: false,
            // the maximum amount of listeners that can be assigned to an event
            maxListeners: 10,
            // show event name in memory leak message when more than maximum amount of listeners is assigned
            verboseMemoryLeak: false,
            // disable throwing uncaughtException if an error event is emitted and it has no listeners
            ignoreErrors: false,
        }),
        WinstonModule.forRoot({
            transports: [
                new transports.File({
                    level: 'debug',
                    filename: 'logs/onboarding-debug.log'
                }),
                new transports.File({
                    level: 'error',
                    filename: 'logs/onboarding-error.log',
                })
            ],
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(info => `${[info.timestamp]}|[${info.level.toUpperCase()}]|${info.message}|${info.level.toUpperCase()} STACK:\n${info.stack}`),
            ),
        }),
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
