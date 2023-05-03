import { ArgumentMetadata, Injectable, Logger, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // "value" is an object containing the file's attributes and metadata
        Logger.log("FileValidationPipe.value: ", value);
        Logger.log("FileValidationPipe.metadata: ", metadata);
        return value;
    }
}