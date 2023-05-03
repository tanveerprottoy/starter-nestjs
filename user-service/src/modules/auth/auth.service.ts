import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthorizeDto } from "./dto/authorize.dto";
import { UsersRepository } from "../users/users.repository";
import { Constants, DatabaseTablePatterns } from "../../utils/constants";
import { ErrorUtils } from "../../utils/error.utils";
import * as jwt from 'jsonwebtoken';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import HttpUtils from "../../utils/http.utils";
import { JwtClient } from "../../libs/jwt/jwt.client";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtClient: JwtClient,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger
    ) { }

    async authorize(dto: AuthorizeDto): Promise<any> {
        try {
            const { bearerToken } = dto;
            const token = HttpUtils.parseBearerToken(bearerToken);
            if(!token) {
                ErrorUtils.throwRpcError(
                    HttpStatus.UNAUTHORIZED,
                    Constants.UNAUTH_REQ
                );
            }
            const jwtPayload = this.jwtClient.verifyToken(token);
            const data = await this.usersRepository.findOne({
                pk: DatabaseTablePatterns.USER_PK,
                sk: jwtPayload.id
            });
            if(data instanceof Error) {
                ErrorUtils.throwRpcError();
            }
            if(!data) {
                ErrorUtils.throwRpcError(
                    HttpStatus.UNAUTHORIZED,
                    Constants.UNAUTH_REQ
                );
            }
            if(!data.isActive) {
                ErrorUtils.throwRpcError(
                    HttpStatus.UNAUTHORIZED,
                    Constants.UNAUTH_REQ
                );
            }
            return {
                user: data,
            };
        }
        catch(e) {
            this.logger.error(e);
            if(e instanceof jwt.TokenExpiredError) {
                ErrorUtils.throwRpcError(
                    HttpStatus.UNAUTHORIZED,
                    e.message
                );
            }
            ErrorUtils.throwRpcError(
                HttpStatus.UNAUTHORIZED,
                e.message
            );
        }
    }
}
