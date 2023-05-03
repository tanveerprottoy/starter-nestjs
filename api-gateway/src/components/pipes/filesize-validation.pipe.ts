import { ArgumentMetadata, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { AppConfigs } from "../../utils/constants";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // "value" is an object containing the file's attributes and metadata
        Logger.log("FileSizeValidationPipe.value: ", value);
        Logger.log("FileSizeValidationPipe.metadata: ", metadata);
        return value.size < AppConfigs.MAX_FILE_SIZE;
    }
}