export default class CoreUtils {

    static printStringify(object: any) {
        try {
            const str = JSON.stringify(object, null, 4); // (Optional) beautiful indented output.
            console.log('stringify ' + str);
        }
        catch(e) { }
    }

    static stringifyToObject(object: any) {
        try {
            return JSON.parse(
                JSON.stringify(object)
            );
        }
        catch(e) {
            console.log(e);
            return undefined;
        }
    }

    static stringify(object: any) {
        try {
            return JSON.stringify(object);
        }
        catch(e) {
            return "";
        }
    }

    static isEmptyObject(object: any) {
        try {
            return Object.keys(object).length === 0;
        }
        catch(e) {
            return false;
        }
    }

    static generateRandomNumber(length: number) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }

    static getKeysFromObject(object: any): string[] {
        return Object.keys(object);
    }

    static hasKey(
        object: any,
        key: string
    ): boolean {
        try {
            return object.hasOwnProperty(
                key
            );
        }
        catch(e) {
            return false;
        }
    }

    static randomIntFromInterval(
        min: number,
        max: number
    ) {
        // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static testRegex(
        pattern: string,
        value: string,
    ): boolean {
        try {
            const regex = new RegExp(
                pattern
            );
            return regex.test(
                value
            );
        }
        catch(e) {
            return false;
        }
    }

    static isValidHttpUrl(
        urlStr: string
    ) {
        let url: URL;
        try {
            url = new URL(urlStr);
        } catch(_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
}