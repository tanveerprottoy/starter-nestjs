export default class DateTimeUtils {

    static getDate() {
        return new Date();
    }

    static getTime() {
        return new Date().getTime();
    }

    static getISOString() {
        return new Date().toISOString();
    }

    static incrementDays(
        date: Date,
        days: number
    ) {
        const target = new Date(
            date.getTime()
        );
        target.setDate(date.getDate() + days);
        return target;
    }

    static decrementDays(
        date: Date,
        days: number
    ) {
        const target = new Date(
            date.getTime()
        );
        target.setDate(date.getDate() - days);
        return target;
    }

    static setHours(
        date: Date,
        hours: number,
        mins?: number,
        secs?: number,
        millis?: number,
    ) {
        date.setHours(
            hours,
            mins,
            secs,
            millis,
        );
    }
}