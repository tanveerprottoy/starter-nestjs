import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Constants, Miscs } from "./constants";

export class ErrorUtils {

    static throwError(
        error: Error
    ): Error {
        throw error;
    }

    static throwErrorWithMessage(
        message: string = Constants.GENERIC_ERROR
    ): Error {
        throw new Error(message);
    }

    static throwRpcError(
        status: number = HttpStatus.INTERNAL_SERVER_ERROR,
        message: string = Constants.GENERIC_ERROR
    ): RpcException {
        throw new RpcException(
            `${message}${Miscs.ERR_STATUS_SEPARATOR}${status}`
        );
    }

    static throwRemoteRpcError(
        message: string = Constants.GENERIC_ERROR
    ): RpcException {
        throw new RpcException(
            message
        );
    }

    static genericErrorMessage() {
        return `${Constants.GENERIC_ERROR}`;
    }

    static generateGenericErrorMessage(
        postfix: string        
    ) {
        return `${Constants.GENERIC_ERROR} at ${postfix}`;
    }

    static throwNetworkError(
        code: number = HttpStatus.INTERNAL_SERVER_ERROR,
        data: any = null
    ): Error {
        // code key used to diffrentiate it from other data
        const err = new Error();
        err["code"] = code;
        err["data"] = data;
        throw err;
    }
}