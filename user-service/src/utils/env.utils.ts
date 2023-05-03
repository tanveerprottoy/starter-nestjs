export class EnvUtils {

    static getDbConfigs(): string[] {
        const keys = [
            "DB_REGION",
            "DB_ENDPOINT",
            "DB_ACCESS_KEY_ID",
            "DB_SECRET_ACCESS_KEY"
        ];
        const configs = [];
        for(const key of keys) {
            configs.push(
                process.env[key]
            )
        }
        return configs;
    }

    static getUserServiceParams(): string[] {
        return [
            process.env[`USER_SERVICE_HOST`],
            process.env[`USER_SERVICE_PORT`],
        ];
    }

    static getPort(): string {
        const key = `APP_PORT`;
        return process.env[key];
    }

    static getRedisUrl(): string {
        const key = `REDIS_URL`;
        return process.env[key];
    }

    static getUserTable(): string {
        const key = `USER_TABLE`;
        return process.env[key];
    }
}