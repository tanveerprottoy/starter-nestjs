import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class HttpClient {

    constructor(
        private readonly httpService: HttpService
    ) { }

    async get(
        url: string,
        config: any
    ) {
        return new Promise<any>((resolve, reject) => {
            this.httpService.get(
                url,
                config,
            ).subscribe({
                next: (response: any) => {
                    // console.log('get req next: ', response);
                    resolve(response);
                },
                error: (err: Error) => {
                    // console.error('get req error: ', err);
                    reject(err);
                },
            });
        });
    }

    async post(
        url: string,
        data: any,
        config: any
    ) {
        return new Promise<any>((resolve, reject) => {
            this.httpService.post(
                url,
                data,
                config
            ).subscribe({
                next: response => {
                    // console.log('post req next (res): ', response);
                    resolve(response);
                },
                error: err => {
                    // console.error('post req error: ', err);
                    reject(err);
                },
            });
        });
    }
}
