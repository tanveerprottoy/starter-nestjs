import * as moment from "moment-timezone";
import { unitOfTime } from "moment";

export default class DateTimeMomentJsUtils {

    static diff(
        startDate: Date,
        endDate: Date,
        unitOfTime: unitOfTime.Diff
    ): number {
        const start = moment(startDate).startOf("day");
        const end = moment(endDate).startOf("day");
        return end.diff(start, unitOfTime);
    }

    static diffWithToday(
        date: Date,
        unitOfTime: unitOfTime.Diff
    ): number {
        const today = moment().startOf("day");
        const target = moment(date).startOf("day");
        return today.diff(target, unitOfTime);
    }

    static diffInclusive(
        startDate: Date,
        endDate: Date,
        unitOfTime: unitOfTime.Diff
    ): number {
        const start = moment(startDate).startOf("day");
        const end = moment(endDate).startOf("day");
        return end.diff(start, unitOfTime) + 1;
    }

    static isBetween(
        targetDate: Date,
        startDate: Date,
        endDate: Date,
        granularity: unitOfTime.Diff,
        inclusivity?: "()" | "[)" | "(]" | "[]",
    ): boolean {
        const target = moment(targetDate).startOf("day");
        const start = moment(startDate).startOf("day");
        const end = moment(endDate).startOf("day");
        return target.isBetween(
            start,
            end,
            granularity,
            inclusivity
        );
    }

    static isSame(
        startDate: Date,
        endDate: Date,
        granularity: unitOfTime.Diff,
    ): boolean {
        const start = moment(startDate).startOf(granularity);
        const end = moment(endDate).startOf(granularity);
        return start.isSame(
            end,
            granularity,
        );
    }

    static isBefore(
        startDate: Date,
        endDate: Date,
        granularity: unitOfTime.Diff,
    ): boolean {
        const start = moment(startDate).startOf("day");
        const end = moment(endDate).startOf("day");
        return start.isBefore(
            end,
            granularity,
        );
    }

    static isAfter(
        startDate: Date,
        endDate: Date,
        granularity: unitOfTime.Diff,
    ): boolean {
        const start = moment(startDate).startOf("day");
        const end = moment(endDate).startOf("day");
        return end.isAfter(
            start,
            granularity,
        );
    }

    static convertToMoment(
        date: Date,
        timezone: string,
    ): any {
        return moment(date).tz(timezone);
    }
}