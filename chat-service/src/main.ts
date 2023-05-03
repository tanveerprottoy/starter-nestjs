import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ChatSchema } from "./modules/chats/schemas/chat.schema";
import { DbClientsInstance, DbControlOpsInstance } from "./libs/dynamodb";
import { TcpTransport } from "./core/transports/tcp.transport";
import { MicroserviceOptions } from "@nestjs/microservices";
import { NestApplicationContextOptions } from "@nestjs/common/interfaces/nest-application-context-options.interface";
import { CreateTableInput } from "@aws-sdk/client-dynamodb";

async function initDbTables() {
    try {
        const schemas: CreateTableInput[] = [
            ChatSchema
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
    // app.useGlobalPipes(new ValidationPipe());
    await initDbTables();
    await app.listen();
}

bootstrap();
