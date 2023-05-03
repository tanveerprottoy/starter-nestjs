import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class EventHelper {

    emit(
        event: string,
        data: any,
        eventEmitter: EventEmitter2
    ) {
        eventEmitter.emit(
            event,
            data,
        );
    }
}