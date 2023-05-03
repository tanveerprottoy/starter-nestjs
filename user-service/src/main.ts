import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbClientsInstance, DbControlOpsInstance } from "./libs/dynamodb";
import { TcpTransport } from "./core/transports/tcp.transport";
import { NestApplicationContextOptions } from "@nestjs/common/interfaces/nest-application-context-options.interface";
import { MicroserviceOptions } from "@nestjs/microservices";
import { CreateTableInput } from "@aws-sdk/client-dynamodb";
import { UserSchema } from "./modules/users/schemas/user.schema";

async function initDbTables() {
    try {
        const schemas: CreateTableInput[] = [
            UserSchema
        ];
        for(const schema of schemas) {
            await DbControlOpsInstance.create(
                schema
            );
        }
    }
    catch(e) {
        console.error(e);
    }
}

async function bootstrap() {
    DbClientsInstance.init();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        TcpTransport.getTransport() as NestApplicationContextOptions & MicroserviceOptions
    );
    await initDbTables();
    await app.listen();
}

bootstrap();
