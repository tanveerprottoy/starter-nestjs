import { Controller, Post, UploadedFiles, UseInterceptors, UseGuards, ParseFilePipe } from '@nestjs/common';
import { FileUploadsService } from './file-uploads.service';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ResponseUtils } from "../../utils/response.utils";
import { Constants } from "../../utils/constants";
import { AuthGuard } from "../../components/guards/auth.guard";
import { getMulterConfig } from "../../components/multer/multer.config";

@Controller({
    path: "file-uploads",
    version: Constants.API_VERSION_1
})
@UseGuards(
    AuthGuard
)
export class FileUploadsController {

    constructor(private readonly fileUploadsService: FileUploadsService) { }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: "file", maxCount: 1 }
            ],
            getMulterConfig()
        )
    )
    async uploadOne(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    // new FileSizeValidationPipe(),
                    // new FileTypeValidator({ fileType: 'image/jpeg' }),
                ],
            }),
        ) fileRoot: {
            file: Express.Multer.File[]
        },
    ) {
        return ResponseUtils.buildData(
            this.fileUploadsService.uploadOne(
                fileRoot
            )
        );
    }

    @Post("/multi")
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: "files", maxCount: 10 }
            ],
            getMulterConfig()
        )
    )
    async uploadMany(
        @UploadedFiles() fileRoot: {
            files: Express.Multer.File[]
        },
    ) {
        return ResponseUtils.buildData(
            this.fileUploadsService.uploadMany(
                fileRoot
            )
        );
    }
}
