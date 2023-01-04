import { InjectQueue } from "@nestjs/bull";
import { Injectable } from '@nestjs/common';
import { Queue } from "bull";
import { QueueConstants } from "../../utils/constants";
import { ErrorUtils } from "../../utils/error.utils";
import { ConfigClientInstance } from "../../libs/clients/config.client";

@Injectable()
export class JobsService {

    constructor(
        @InjectQueue(ConfigClientInstance.getValue("redisQueueName")) private queue: Queue,
    ) { }

    async addJob(payload: any) {
        try {
            await this.queue.add(
                payload,
                {
                    delay: 5000,
                    removeOnComplete: true,
                },
            );
            return {
                message: "Job added to queue"
            };
        }
        catch(e) {
            console.error(e);
            ErrorUtils.throwHttpError();
        }
    }

    async addNamedJob(payload: any) {
        try {
            await this.queue.add(
                QueueConstants.PROCESS_JOB,
                payload
            );
            return {
                message: "Job added to queue"
            };
        }
        catch(e) {
            console.error(e);
            ErrorUtils.throwHttpError();
        }
    }
}
