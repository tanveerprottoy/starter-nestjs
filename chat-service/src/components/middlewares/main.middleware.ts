import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class MainMiddleware implements NestMiddleware {
    
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req);
        Logger.debug(
            'Request Received'
        );
        next();
    }
}