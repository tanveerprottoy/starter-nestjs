import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Configs } from "../../utils/constants";

const SetTimeout = (timeout: number) => SetMetadata('request-timeout', timeout);

export function SetRequestTimeout(timeout: number = Configs.API_TIMEOUT) {
    return applyDecorators(
        SetTimeout(timeout),
        // no need to UseInterceptors(TimeoutInterceptor) here as TimeoutInterceptor
        // is used globally
        // UseInterceptors(TimeoutInterceptor),
    );
}