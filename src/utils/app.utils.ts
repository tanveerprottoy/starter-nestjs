import DateTimeMomentJsUtils from "./date-time-momentjs.utils";
import DateTimeUtils from "./date-time.utils";

export class AppUtils {

    static calculateNextPeriod(
        date: Date
    ) {
        return DateTimeUtils.incrementDays(
            date,
            28
        );
    }

    static calculatePeriodLength(
        startDate: Date,
        endDate: Date,
    ) {
        return DateTimeMomentJsUtils.diffInclusive(
            startDate,
            endDate,
            "days"
        );
    }

    static calculateOvulationDay(
        date: Date
    ) {
        return DateTimeUtils.decrementDays(
            date,
            14
        );
    }

    static calculateOvulationStartDate(
        ovulationDate: Date
    ) {
        return DateTimeUtils.decrementDays(
            ovulationDate,
            5
        );
    }

    static calculateCurrentDayInRange(
        startDate: Date,
        endDate: Date,
        timezone: string,
    ) {
        let currentDay = 0;
        const start = DateTimeMomentJsUtils.convertToMoment(
            startDate,
            timezone,
        );
        const today = new Date();
        const todayMoment = DateTimeMomentJsUtils.convertToMoment(
            today,
            timezone
        );
        const isBetween = DateTimeMomentJsUtils.isBetween(
            today,
            startDate,
            endDate,
            "days",
            "[]"
        );
        if(isBetween) {
            currentDay = DateTimeMomentJsUtils.diff(
                start,
                todayMoment,
                "days"
            );
        }
        return currentDay;
    }

    static filterUserData(
        data: any
    ) {
        const {
            passwordHash,
            ...userWithoutPass
        } = data;
        return userWithoutPass;
    }

    static filterUserPeriodLogData(
        data: any
    ) {
        return {
            startDate: data.lastPeriodStartDate,
            endDate: data.lastPeriodEndDate,
        };
    }
}