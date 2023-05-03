import { Inject, Injectable } from "@nestjs/common";
import DbUtils from "../../libs/mongodb/db.utils";
import { UsersRepository } from "./users.repository";
import { ClientProxy } from "@nestjs/microservices";
import { ClientProxyHelper } from "../../components/helpers/client-proxy.helper";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { ResponseUtils } from "../../utils/response.utils";
import { ErrorUtils } from "../../utils/error.utils";
import { CreateUserDto } from "./dto/create-user.dto";
import { Services } from "../../utils/constants";

@Injectable()
export class UsersService {

    constructor(
        private readonly repository: UsersRepository,
        @Inject(Services.USER_SERVICE)
        private client: ClientProxy,
        private clientProxyHelper: ClientProxyHelper,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    create = async (
        dto: CreateUserDto
    ): Promise<any> => {
        const data = await this.repository.create(dto);
        // call user service as well, just for test
        this.requestToService(
            "createUser",
            {
                sk: data._id,
                name: dto.name,
                email: dto.email,
            }
        );
        return data;
    };

    findAll = async (
        limit: number,
        page: number
    ): Promise<any> => {
        this.requestToService(
            "createUser",
            {
                limit: limit,
                startKey: page,
            },
        );
        const cursor = this.repository.readMany(limit, page);
        const docs = await DbUtils.streamCursorData(cursor);
        return docs;
    };

    findOne = async (
        id: string
    ): Promise<any> => {
        return await this.repository.readOne(id);
    };

    update = async (
        id: string,
        dto: any
    ): Promise<any> => {
        return await this.repository.update(id, dto);
    };

    remove = async (
        id: string
    ): Promise<any> => {
        return await this.repository.delete(id);
    };

    requestToService = async (
        pattern: string,
        dto: any
    ): Promise<any> => {
        return ResponseUtils.buildData(
            await this.clientProxyHelper.send(
                pattern,
                dto,
                this.client
            ).catch(err => {
                this.logger.error(err);
                ErrorUtils.handleError(err);
            })
        );
    }
}
