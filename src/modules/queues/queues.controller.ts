import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Constants } from "../../../utils/constants";
import { QueuesService } from './queues.service';

@Controller({
    path: "queues",
    version: Constants.API_VERSION_1
})
export class QueuesController {

    constructor(private readonly queuesService: QueuesService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async addJob(@Body() dto: any) {
        return await this.queuesService.addJob(dto);
    }
}
