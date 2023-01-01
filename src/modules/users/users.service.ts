import { Injectable } from "@nestjs/common";
import DbUtils from "../../libs/mongodb/db.utils";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {

    constructor(private readonly repository: UsersRepository) { }

    create = async (
        data: any
    ): Promise<any> => {
        return await this.repository.create(data);
    };

    findAll = async (
        limit: number,
        page: number
    ): Promise<any> => {
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
        data: any
    ): Promise<any> => {
        return await this.repository.update(id, data);
    };

    remove = async (
        id: string
    ): Promise<any> => {
        return await this.repository.delete(id);
    };
}
