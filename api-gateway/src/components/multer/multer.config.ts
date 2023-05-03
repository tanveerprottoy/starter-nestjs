import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import * as multerS3 from "multer-s3";
import * as path from "path";
import { v4 as uuidv4 } from 'uuid';
import { S3NodeClientInstance } from "../../libs/s3";
import { EnvUtils } from "../../utils/env.utils";
import { ConfigUtils } from "../../utils/config.utils";
import StringUtils from "../../utils/string.utils";
import { AppConfigs } from "../../utils/constants";

export function getMulterConfig(): MulterOptions {
    ConfigUtils.dotenvConfig();
    if(EnvUtils.isStaticLocalSave()) {
        return getMulterFileConfig("./uploads");
    }
    else {
        return getMulterS3Config(EnvUtils.getS3BucketName());
    }
}

export function getMulterFileConfig(
    filePath: string
) {
    return {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, filePath);
            },
            filename: (req, file, cb) => {
                const name = uuidv4() + path.extname(file.originalname);
                cb(null, name);
            }
        }),
        /* fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            // if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            //     return cb(new HttpException('Only images are allowed!', HttpStatus.BAD_REQUEST), null);
            // }
            cb(null, true);
        }, */
        limits: { fileSize: 1024 * 1024 * 50 }
    }
}

export function getMulterS3Config(
    bucketName: string,
) {
    S3NodeClientInstance.init();
    // 0 is bucket name, 1 is prefix
    const params = StringUtils.split(
        bucketName,
        "/",
    );
    console.log("s3.bucket.params: ", params);
    return {
        storage: multerS3({
            s3: S3NodeClientInstance.s3Client,
            bucket: params[0],
            // shouldTransform: true,
            // acl: "public-read",
            // contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                // console.log("metadata " + file);
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                const name = uuidv4() + path.extname(file.originalname);
                cb(null, `${params[1]}/${name}`);
            },
        }),
        limits: { fileSize: AppConfigs.MAX_FILE_SIZE }
    }
}