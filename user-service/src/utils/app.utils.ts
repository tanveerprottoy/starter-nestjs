import DateTimeUtils from "./date-time.utils";

export class AppUtils {

    static timeToString() {
        return DateTimeUtils.getTime().toString();
    }
}