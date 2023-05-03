import { ClientProvider, ClientsModuleOptionsFactory, Transport } from "@nestjs/microservices";
import { EnvUtils } from "../../utils/env.utils";

export class ChatClientsModuleOptions implements ClientsModuleOptionsFactory {

    createClientOptions(): Promise<ClientProvider> | ClientProvider {
        const params = EnvUtils.getChatServiceParams();
        return {
            transport: Transport.TCP,
            options: {
                host: params[0],
                port: parseInt(params[1]),
            }
        }
    }
}