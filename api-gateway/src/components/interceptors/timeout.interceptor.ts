import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, timeout, catchError, TimeoutError, throwError } from "rxjs";
import { Configs } from "../../utils/constants";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    @Inject() private reflector: Reflector;

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const timeoutVal = this.reflector.get<number>("request-timeout", context.getHandler()) || Configs.API_TIMEOUT;
        return next.handle().pipe(
            timeout(
                timeoutVal
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