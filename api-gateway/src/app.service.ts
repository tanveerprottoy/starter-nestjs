import { Injectable, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
    
    onModuleInit() {
        // TODO
    }

    onApplicationBootstrap() {
        // TODO
    }

    onApplicationShutdown(signal?: string) {
        console.log(signal);
    }
}
