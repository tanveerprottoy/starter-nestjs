import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";
import { QueueConstants } from "../../utils/constants";
import { ConfigClientInstance } from "../../libs/clients/config.client";

@Injectable()
@Processor(ConfigClientInstance.getValue("redisQueueName"))
export class JobsConsumer {

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @Process()
    async handleJob(job: Job<any>) {
        console.log(job.data);
        return {};
    }

    @Process(QueueConstants.PROCESS_JOB)
    async handleNamedJob(job: Job<any>) {
        console.log(job);
        // await this.repository.create(job);
        return {};
    }
}
