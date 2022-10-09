import * as configDev from "../../../configs/dev.json";
import * as configProd from "../../../configs/prod.json";

export class ConfigClient {
    private static instance: ConfigClient;
    env: string;
    config: any;

    private constructor() {
        if(ConfigClient.instance) {
            throw new Error("Error - already initialized");
        }
        this.init();
    }

    static getInstance(): ConfigClient {
        ConfigClient.instance = ConfigClient.instance || new ConfigClient();
        return ConfigClient.instance;
    }

    private init() {
        if(this.config) {
            return;
        }
        this.env = process.argv.slice(2)[0] || "dev";
        if(this.env === "prod") {
            this.config = configProd;
        }
        else {
            this.config = configDev;
        }
    }

    isProdEnv() {
        return this.env === "prod";
    }

    getValue(key: string) {
        return this.config[key];
    }
}

export const ConfigClientInstance = ConfigClient.getInstance();