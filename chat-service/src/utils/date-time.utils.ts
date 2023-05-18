import * as moment from "moment";

export default class DateTimeUtils {

    static getDate() {
        return new Date().getTime();
    }

    static getTime() {
        return new Date().getTime();
    }

    static getUTCMilliseconds() {
        return new Date().getUTCMilliseconds();
    }

    static getISOString() {
        return new Date().toISOString();
    }

    static getDateString() {
        return new Date().toDateString();
    }

    static getUTCString() {
        return new Date().toUTCString();
    }

    static getTimezoneOffset() {
        return new Date().getTimezoneOffset();
    }

    static isSame(
        startDate: Date,
        endDate: Date,
        granularity: moment.unitOfTime.Diff,
    ): boolean {
        const start = moment(startDate).startOf(granularity);
        const end = moment(endDate).startOf(granularity);
        return start.isSame(
            end,
            granularity,
        );
    }
}