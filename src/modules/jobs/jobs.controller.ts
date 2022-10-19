import { Body, Controller, Post } from "@nestjs/common";
import { Constants } from "../../../utils/constants";
import { JobsService } from './jobs.service';

@Controller({
    path: "jobs",
    version: Constants.API_VERSION_1
})
export class JobsController {

    constructor(private readonly queuesService: JobsService) { }

    @Post()
    async createJob(@Body() dto: any) {
        this.queuesService.addJob(dto);
        return {
            message: "Job added to queue"
        };
    }
}
