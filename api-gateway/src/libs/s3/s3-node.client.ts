import { S3Client } from "@aws-sdk/client-s3";
import { EnvUtils } from "../../utils/env.utils";

class S3NodeClient {
    private static instance: S3NodeClient;
    s3Client: S3Client

    private constructor() {
        console.log("S3NodeClient init");
        if(S3NodeClient.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): S3NodeClient {
        S3NodeClient.instance = S3NodeClient.instance || new S3NodeClient();
        return S3NodeClient.instance;
    }

    init() {
        if(this.s3Client) {
            return;
        }
        const s3Configs = EnvUtils.getS3Configs();
        const config = {
            region: s3Configs[0],
            credentials: {
                accessKeyId: s3Configs[1],
                secretAccessKey: s3Configs[2],
            }
        };
        console.log("s3Client: ", config);
        this.s3Client = new S3Client(config);
    }

    destroy() {
        if(!this.s3Client) {
            return;
        }
        this.s3Client.destroy();
    }
}

export const S3NodeClientInstance = S3NodeClient.getInstance();