import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from "./users.repository";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { AppUtils } from "../../utils/app.utils";
import { Constants, DatabaseTablePatterns, Events } from "../../utils/constants";
import { ErrorUtils } from "../../utils/error.utils";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventHelper } from "../../core/helpers/event.helper";

@Injectable()
export class UsersService {

    constructor(
        private readonly repository: UsersRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly eventHelper: EventHelper,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) { }

    async create(payload: any) {
        const timestamp = AppUtils.timeToString();
        const item = {
            pk: DatabaseTablePatterns.USER_PK,
            sk: payload.sk,
            name: payload.name,
            email: payload.email,
            createdAt: `${timestamp}`,
            updatedAt: `${timestamp}`,
        };
        const data = await this.repository.create(item);
        if(data instanceof Error) {
            this.logger.error(data);
            ErrorUtils.throwRpcError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                Constants.GENERIC_ERROR
            );
        }
        if(!data) {
            ErrorUtils.throwRpcError(
                HttpStatus.BAD_REQUEST,
                Constants.BAD_REQ
            );
        }
        this.eventHelper.emit(
            Events.USER_CREATED,
            data,
            this.eventEmitter
        );
        return data;
    }

    async findAll(
        limit: number,
        startKey: any,
    ) {
        const expression = "pk = :p0";
        const expressionAttributeValues = {
            ":p0": DatabaseTablePatterns.USER_PK,
        };
        const data = await this.repository.findAll(
            expression,
            expressionAttributeValues,
            false,
            limit,
            startKey
        );
        return data;
    }

    async findOne(sk: string) {
        const key = {
            pk: DatabaseTablePatterns.USER_PK,
            sk: sk
        };
        const data = await this.repository.findOne(
            key
        );
        if(data instanceof Error) {
            ErrorUtils.throwRpcError(
                HttpStatus.BAD_REQUEST,
                Constants.GENERIC_ERROR,
            );
        }
        if(!data) {
            ErrorUtils.throwRpcError(
                HttpStatus.BAD_REQUEST,
                Constants.BAD_REQ,
            );
        }
        return data;
    }

    async update(
        sk: string,
        dto: UpdateUserDto
    ) {
        const timestamp = AppUtils.timeToString();
        const key = {
            pk: DatabaseTablePatterns.USER_PK,
            sk: sk
        };
        const updateExpression = "set #name = :p0, email = :p1, updatedAt = :p2";
        const expressionAttributeValues = {
            ":p0": dto.name,
            ":p1": dto.email,
            ":p2": timestamp,
        };
        const expressionAttributeNames = {
            "#name": "name"
        };
        const data = await this.repository.update(
            key,
            updateExpression,
            expressionAttributeValues,
            expressionAttributeNames
        );
        if(data instanceof Error) {
            ErrorUtils.throwRpcError(
                HttpStatus.BAD_REQUEST,
                Constants.GENERIC_ERROR,
            );
        }
        if(!data) {
            ErrorUtils.throwRpcError(
                HttpStatus.BAD_REQUEST,
                Constants.BAD_REQ,
            );
        }
        return data;
    }

    async remove(sk: string) {
        const key = {
            pk: DatabaseTablePatterns.USER_PK,
            sk: sk
        };
        const data = await this.repository.delete(
            key
        );
        return data;
    }
}
