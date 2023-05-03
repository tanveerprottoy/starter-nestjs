import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthorizeDto } from "./dto/authorize.dto";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @MessagePattern("authorization")
    async authorize(
        @Payload() dto: AuthorizeDto
    ) {
        return await this.authService.authorize(dto);
    }
}
