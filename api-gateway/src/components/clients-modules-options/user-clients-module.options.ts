import { ClientProvider, ClientsModuleOptionsFactory, Transport } from "@nestjs/microservices";
import { EnvUtils } from "../../utils/env.utils";

export class UserClientsModuleOptions implements ClientsModuleOptionsFactory {

    createClientOptions(): Promise<ClientProvider> | ClientProvider {
        const params = EnvUtils.getUserServiceParams();
        return {
            transport: Transport.TCP,
            options: {
                host: params[0],
                port: parseInt(params[1]),
            }
        }
    }
}