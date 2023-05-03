import { CreateTableInput } from "@aws-sdk/client-dynamodb";
import { EnvUtils } from "../../../utils/env.utils";

export const UserSchema: CreateTableInput = {
    TableName: EnvUtils.getUserTable(),
    AttributeDefinitions: [
        {
            AttributeName: "pk",
            AttributeType: "S"
        },
        {
            AttributeName: "sk",
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "pk",
            KeyType: "HASH"
        },
        {
            AttributeName: "sk",
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};
