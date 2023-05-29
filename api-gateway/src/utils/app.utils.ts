import { RouteNames } from "./constants";
import DateTimeMomentJsUtils from "./date-time-momentjs.utils";
import StringUtils from "./string.utils";

export class AppUtils {

    static getRouteName(path: string, method: string): string {
        try {
            const keys = StringUtils.split(path, "/");
            let key = `${keys[keys.length - 1]}.${method}`;
            // fetch route name for key
            let name = RouteNames[key];
            if(!name) {
                // try again with the previous value
                // if succeeds consider this as a
                // path param endpoint, add p to the key
                key = `${keys[keys.length - 2]}.p.${method}`;
                console.log(key)
                name = RouteNames[key];
            }
            return name;
        }
        catch(e) {
            return null;
        }
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
}