import { InjectQueue } from "@nestjs/bull";
import { Injectable } from '@nestjs/common';
import { Queue } from "bull";
import { QueueConstants } from "../../../utils/constants";
import { ConfigClientInstance } from "../../libs/clients/config.client";

@Injectable()
export class QueuesService {

    constructor(
        @InjectQueue(ConfigClientInstance.getValue("redisQueueName")) private queue: Queue,
    ) { }

    async addJob(payload: any) {
        try {
            await this.queue.add(
                payload
            );
        }
        catch(e) {
            console.error(e);
        }
    }

    async addNamedJob(payload: any) {
        try {
            await this.queue.add(
                QueueConstants.PROCESS_EVENT,
                payload
            );
        }
        catch(e) {
            console.error(e);
        }
    }
}
