import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { BullModule } from "@nestjs/bull";
import { ConfigClientInstance } from "../../libs/clients/config.client";
import { QueuesConsumer } from "./queues.consumer";

@Module({
    imports: [
        BullModule.registerQueue({
            name: ConfigClientInstance.getValue("redisQueueName"),
        }),
    ],
    controllers: [QueuesController],
    providers: [
        QueuesService,
        QueuesConsumer,
    ]
})
export class QueuesModule { }
