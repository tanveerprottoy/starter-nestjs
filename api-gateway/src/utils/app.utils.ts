import DateTimeMomentJsUtils from "./date-time-momentjs.utils";

export class AppUtils {

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
}