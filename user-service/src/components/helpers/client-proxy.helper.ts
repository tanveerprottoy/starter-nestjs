import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, throwError, timeout, TimeoutError } from "rxjs";
import { AppConfigs } from "../../utils/constants";

@Injectable()
export class ClientProxyHelper {

    async send(
        pattern: string,
        data: any,
        client: ClientProxy
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            client
                .send<any, any>(
                    pattern,
                    data
                )
                .pipe(
                    timeout(
                        AppConfigs.RPC_TIMEOUT
                    ),
                    catchError(err => {
                        if(err instanceof TimeoutError) {
                            return throwError(() => new RequestTimeoutException());
                        }
                        return throwError(() => err);
                    }),
                )
                .subscribe({
                    next: (result: any) => {
                        resolve(result);
                    },
                    error: (err: any) => {
                        reject(err);
                    },
                });
        });
    }

    async emit(
        pattern: string,
        data: any,
        client: ClientProxy
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            client
                .emit<any, any>(
                    pattern,
                    data
                )
                .pipe(
                    timeout(
                        AppConfigs.RPC_TIMEOUT
                    ),
                    catchError(err => {
                        if(err instanceof TimeoutError) {
                            return throwError(() => new RequestTimeoutException());
                        }
                        return throwError(() => err);
                    }),
                )
                .subscribe({
                    next: (result: any) => {
                        resolve(result);
                    },
                    error: (err: any) => {
                        reject(err);
                    },
                });
        });
    }
}