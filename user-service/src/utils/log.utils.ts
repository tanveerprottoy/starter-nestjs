import { Logger } from "winston";
import CoreUtils from "./core.utils";

export class LogUtils {

    static logError(
        logger: Logger,
        payload: any,
        error: Error
    ) {
        error["payload"] = CoreUtils.stringify(payload);
        logger.error(error);
    }

    static logDebug(
        logger: Logger,
        payload: any,
        error: Error
    ) {
        error["payload"] = CoreUtils.stringify(payload);
        logger.error(error);
    }
}