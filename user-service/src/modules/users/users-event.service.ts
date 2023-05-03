import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class UsersEventService {

    constructor(
        private readonly repository: UsersRepository,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async userCreatedHandler(payload: any) {
        console.log("userCreatedHandler.payload: ", payload);
    }
}
