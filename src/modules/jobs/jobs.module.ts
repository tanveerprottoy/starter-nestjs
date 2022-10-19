import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { BullModule } from "@nestjs/bull";
import { ConfigClientInstance } from "../../libs/clients/config.client";
import { JobsConsumer } from "./jobs.consumer";

@Module({
    imports: [
        BullModule.registerQueue({
            name: ConfigClientInstance.getValue("redisQueueName"),
        }),
    ],
    controllers: [JobsController],
    providers: [
        JobsService,
        JobsConsumer,
    ]
})
export class JobsModule { }
