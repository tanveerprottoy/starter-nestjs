import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Events } from "../../utils/constants";
import { UsersEventService } from "./users-event.service";

@Injectable()
export class UsersEventHandler {

    constructor(
        private readonly service: UsersEventService,
    ) { }

    @OnEvent(Events.USER_CREATED)
    handleUserCreated(payload: any) {
        this.service.userCreatedHandler(
            payload
        );
    }
}
