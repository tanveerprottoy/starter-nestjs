import { Transport } from "@nestjs/microservices";
import { EnvUtils } from "../../utils/env.utils";

export class TcpTransport {

    static getTransport() {
        return {
            transport: Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: EnvUtils.getPort(),
            }
        }
    }
}