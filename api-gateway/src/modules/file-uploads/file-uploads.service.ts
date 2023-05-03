import { Injectable } from '@nestjs/common';
import { FileUploadUtils } from "../../utils/file-upload.utils";

@Injectable()
export class FileUploadsService {

    uploadOne(
        fileRoot: {
            file: Express.Multer.File[]
        },
    ) {
        return FileUploadUtils.processOne(fileRoot);
    }

    uploadMany(
        fileRoot: {
            files: Express.Multer.File[]
        },
    ) {
        return FileUploadUtils.processMany(fileRoot);
    }
}
