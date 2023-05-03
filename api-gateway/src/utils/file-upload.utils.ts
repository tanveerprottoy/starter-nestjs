import { EnvUtils } from "./env.utils";

export class FileUploadUtils {

    static processOne(
        fileRoot: {
            file: Express.Multer.File[]
        }
    ) {
        let fileUrl = null;
        if(fileRoot && fileRoot.file && fileRoot.file.length > 0) {
            if(EnvUtils.isStaticLocalSave()) {
                fileUrl = fileRoot.file[0]["path"];
            }
            else {
                fileUrl = fileRoot.file[0]["location"];
            }
        }
        return {
            fileUrl
        };
    }

    static processMany(
        fileRoot: {
            files: Express.Multer.File[]
        }
    ) {
        let fileUrls = [];
        if(fileRoot && fileRoot.files && fileRoot.files.length > 0) {
            if(EnvUtils.isStaticLocalSave()) {
                fileUrls = fileRoot.files.map(
                    f => f["path"]
                );
            }
            else {
                fileUrls = fileRoot.files.map(
                    f => f["location"]
                );
            }
        }
        return {
            fileUrls
        };
    }
}