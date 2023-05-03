import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatsService } from './chats.service';

@Controller()
export class ChatsController {

    constructor(private readonly chatsService: ChatsService) { }

    // To Create Chat Message
    @MessagePattern("createChat")
    create(@Payload() payload: any) {
        return this.chatsService.create(payload);
    }

    @MessagePattern("findAllChatsForUser")
    findAllForUser(@Payload() payload: any) {
        return this.chatsService.findAllForUser(
            payload.userSk,
            payload.limit,
            payload.startKey
        );
    }
}
