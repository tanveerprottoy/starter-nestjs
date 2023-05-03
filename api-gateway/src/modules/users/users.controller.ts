import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Constants } from "../../utils/constants";
import { SetRequestTimeout } from "../../components/decorators/timeout.decorator";

@Controller({
    path: "users",
    version: Constants.API_VERSION_1
})
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await this.usersService.create(dto);
    }

    @Get()
    @SetRequestTimeout(60000)
    async findAll(@Query("limit") limit: string, @Query("page") page: string) {
        return this.usersService.findAll(+limit, +page);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.usersService.remove(id);
    }
}
