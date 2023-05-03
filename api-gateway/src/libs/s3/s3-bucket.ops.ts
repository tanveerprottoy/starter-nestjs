import { CreateBucketCommand, CreateBucketCommandInput, DeleteBucketCommand, DeleteBucketCommandInput, ListBucketsCommand } from "@aws-sdk/client-s3";
import { S3NodeClientInstance } from "./s3-node.client";

class S3BucketOps {
    private static instance: S3BucketOps;

    private constructor() {
        console.log("S3BucketOps init");
        if(S3BucketOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): S3BucketOps {
        S3BucketOps.instance = S3BucketOps.instance || new S3BucketOps();
        return S3BucketOps.instance;
    }

    static async getAll() {
        try {
            const data = await S3NodeClientInstance.s3Client.send(
                new ListBucketsCommand({})
            );
            console.log("getBuckets: ", data);
            return data;
        }
        catch(err) {
            console.error("Error", err);
        }
    }

    static async create(
        params: CreateBucketCommandInput
    ) {
        try {
            const data = await S3NodeClientInstance.s3Client.send(
                new CreateBucketCommand(
                    params
                )
            );
            console.log("createBucket: ", data);
            return data;
        }
        catch(err) {
            console.error("Error", err);
        }
    }

    static async delete(
        params: DeleteBucketCommandInput
    ) {
        try {
            const data = await S3NodeClientInstance.s3Client.send(
                new DeleteBucketCommand(
                    params
                )
            );
            console.log("deleteBucket: ", data);
            return data;
        }
        catch(err) {
            console.error("Error", err);
        }
    }
}

export const S3BucketOpsInstance = S3BucketOps.getInstance();