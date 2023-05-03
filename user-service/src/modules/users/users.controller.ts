import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @MessagePattern("createUser")
    create(@Payload() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @MessagePattern("findAllUsers")
    findAll(@Payload() payload: any) {
        return this.usersService.findAll(
            payload.limit,
            payload.startKey
        );
    }

    @MessagePattern("findOneUser")
    findOne(@Payload() sk: string) {
        return this.usersService.findOne(sk);
    }

    @MessagePattern("updateUser")
    update(@Payload() dto: UpdateUserDto) {
        return this.usersService.update(dto.sk, dto);
    }

    @MessagePattern("removeUser")
    remove(@Payload() sk: string) {
        return this.usersService.remove(sk);
    }
}
