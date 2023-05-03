import { Injectable } from "@nestjs/common";
import { DbDataOpsInstance } from "../../libs/mongodb";

@Injectable()
export class UsersRepository {
    private collectionName = "users";

    create = async (data: any): Promise<any> => {
        try {
            const result = DbDataOpsInstance.insertOne<any>(
                this.collectionName,
                data
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    readMany = (
        limit: number,
        page: number
    ): any => {
        try {
            return DbDataOpsInstance.find<any>(
                this.collectionName,
                null,
                {
                    limit: limit,
                    skip: page * limit - limit
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    readOne = async (id: string): Promise<any> => {
        try {
            return await DbDataOpsInstance.findOne<any>(
                this.collectionName,
                {
                    id: id
                }
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    update = async (id: string, data: any): Promise<any> => {
        try {
            const result = DbDataOpsInstance.updateOne<any>(
                this.collectionName,
                {
                    _id: id
                },
                data
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    delete = async (id: string): Promise<any> => {
        try {
            const result = DbDataOpsInstance.deleteOne<any>(
                this.collectionName,
                {
                    _id: id
                },
                null
            );
            return result;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }
}
