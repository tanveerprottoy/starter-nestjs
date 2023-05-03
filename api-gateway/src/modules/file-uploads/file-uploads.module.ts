import { Module } from '@nestjs/common';
import { FileUploadsService } from './file-uploads.service';
import { FileUploadsController } from './file-uploads.controller';
import { UsersModule } from "../users/users.module";
import { ClientProxyHelper } from "../../components/helpers/client-proxy.helper";

@Module({
    imports: [
        UsersModule
    ],
    controllers: [FileUploadsController],
    providers: [
        FileUploadsService,
        ClientProxyHelper,
    ]
})
export class FileUploadsModule { }
