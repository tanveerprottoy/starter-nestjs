import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from "@nestjs/common";
import { Observable, timeout, catchError, TimeoutError, throwError } from "rxjs";
import { Configs } from "../../../utils/constants";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(
                Configs.API_TIMEOUT
            ),
            catchError(err => {
                if(err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            }),
        );
    };
};