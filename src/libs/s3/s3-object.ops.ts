import { GetObjectCommand, GetObjectCommandInput, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { S3NodeClientInstance } from "./s3-node.client";

class S3ObjectOps {
    private static instance: S3ObjectOps;

    private constructor() {
        console.log("S3ObjectOps init");
        if(S3ObjectOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): S3ObjectOps {
        S3ObjectOps.instance = S3ObjectOps.instance || new S3ObjectOps();
        return S3ObjectOps.instance;
    }

    static async put(
        params: PutObjectCommandInput
    ) {
        try {
            const data = await S3NodeClientInstance.s3Client.send(
                new PutObjectCommand(
                    params
                )
            );
            console.log("put object: ", data);
            return data;
        }
        catch(err) {
            console.error("Error", err);
        }
    }

    static async list(
        params: GetObjectCommandInput
    ) {
        try {
            const data = await S3NodeClientInstance.s3Client.send(
                new GetObjectCommand(
                    params
                )
            );
            console.log("list objects: ", data);
            return data;
        }
        catch(err) {
            console.error("Error", err);
        }
    }

    static async get(
        params: GetObjectCommandInput
    ) {
        try {
            const data = await S3NodeClientInstance.s3Client.send(
                new GetObjectCommand(
                    params
                )
            );
            console.log("get object: ", data);
            // Convert the ReadableStream to a string.
            const bodyContents = await this.streamToString(data.Body);
            console.log(bodyContents);
            return bodyContents;
        }
        catch(err) {
            console.error("Error", err);
        }
    }

    private static async streamToString(stream: any) {
        new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk: any) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
    }
}

export const S3ObjectOpsInstance = S3ObjectOps.getInstance();