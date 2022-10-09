import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { Constants } from "../utils/constants";
import { AppModule } from './app.module';
import { ResponseInterceptor } from "./core/interceptors/response.interceptor";
import { TimeoutInterceptor } from "./core/interceptors/timeout.interceptor";
import { ConfigClientInstance } from "./libs/clients/config.client";

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule,
        {
            cors: true,
        }
    );
    app.setGlobalPrefix(Constants.API);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.useGlobalPipes(
        new ValidationPipe()
    );
    app.useGlobalInterceptors(
        new TimeoutInterceptor(),
        new ResponseInterceptor(),
    );
    console.log("args: ", process.argv);
    console.log("build: ", process.argv.slice(2)[0]);
    console.log(ConfigClientInstance.getValue("redisQueueName"));
    await app.listen(
        ConfigClientInstance.getValue("appPort")
    );
}

bootstrap();
