import { Body, Controller, Post } from "@nestjs/common";
import { Constants } from "../../../utils/constants";
import { QueuesService } from './queues.service';

@Controller({
    path: "queues",
    version: Constants.API_VERSION_1
})
export class QueuesController {

    constructor(private readonly queuesService: QueuesService) { }

    @Post()
    async createJob(@Body() dto: any) {
        this.queuesService.addJob(dto);
        return {
            message: "Job added to queue"
        };
    }
}
