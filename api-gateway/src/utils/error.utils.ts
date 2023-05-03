import { HttpException, HttpStatus } from "@nestjs/common";
import { Constants, Miscs } from "./constants";
import StringUtils from "./string.utils";

export class ErrorUtils {

    static throwError(
        error: Error
    ): Error {
        throw error;
    }

    static throwHttpError(
        message: string = Constants.GENERIC_ERROR,
        status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    ): HttpException {
        throw new HttpException(
            message,
            status
        );
    }

    static parseRpcError(
        error: string
    ): any {
        const errorData: {
            message: string,
            status: number
        } = {
            message: Constants.GENERIC_ERROR,
            status: HttpStatus.INTERNAL_SERVER_ERROR
        };
        try {
            const splits = StringUtils.split(
                error,
                Miscs.ERR_STATUS_SEPARATOR,
            );
            errorData.message = splits[0];
            if(splits.length > 1) {
                errorData.status = parseInt(splits[1]);
            }
        }
        catch(e) {
            console.error(e);
        }
        if(isNaN(errorData.status)) {
            errorData.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return errorData;
    }

    static handleError(
        err: any
    ): HttpException {
        const status = err["status"];
        if(status && Number.isInteger(status)) {
            return ErrorUtils.throwHttpError(
                err.message,
                err.status,
            );
        }
        const errData = ErrorUtils.parseRpcError(
            err.message
        );
        return ErrorUtils.throwHttpError(
            errData.message,
            errData.status,
        );
    }
}