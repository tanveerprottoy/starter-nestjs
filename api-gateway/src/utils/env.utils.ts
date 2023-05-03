export class EnvUtils {

    static isStaticLocalSave(): boolean {
        return process.env["IS_STATIC_LOCAL_SAVE"] === "TRUE";
    }

    static getS3Configs(): string[] {
        const keys = [
            "S3_REGION",
            "S3_ACCESS_KEY_ID",
            "S3_SECRET_ACCESS_KEY",
            "S3_ENDPOINT"
        ];
        const configs = [];
        for(const key of keys) {
            configs.push(
                process.env[key]
            )
        }
        return configs;
    }

    static getS3BucketName(): string {
        return `S3_BUCKETNAME`;
    }

    static getUserServiceParams(): string[] {
        return [
            process.env[`USER_SERVICE_HOST`],
            process.env[`USER_SERVICE_PORT`],
        ];
    }

    static getChatServiceParams(): string[] {
        return [
            process.env[`CHAT_SERVICE_HOST`],
            process.env[`CHAT_SERVICE_PORT`],
        ];
    }

    static getPort(): string {
        const key = `APP_PORT`;
        return process.env[key];
    }
}