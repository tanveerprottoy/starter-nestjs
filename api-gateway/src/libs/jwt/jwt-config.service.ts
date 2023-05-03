import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { ConfigClientInstance } from "../clients/config.client";

export default class JwtConfigService implements JwtOptionsFactory {

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: ConfigClientInstance.getValue(""),
        };
    }
}