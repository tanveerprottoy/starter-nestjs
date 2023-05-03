import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Constants } from "../../utils/constants";
import { JobsService } from './jobs.service';

@Controller({
    path: "jobs",
    version: Constants.API_VERSION_1
})
export class JobsController {

    constructor(private readonly queuesService: JobsService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async addJob(@Body() dto: any) {
        return await this.queuesService.addJob(dto);
    }
}
