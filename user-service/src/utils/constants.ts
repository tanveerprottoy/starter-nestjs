export const Constants = {
    API: "api",
    API_VERSION_1: "1",
    BAD_REQ: "Bad request",
    UNAUTH_REQ: "Unauthorized",
    NOT_FOUND: "Not found",
    UPDATE_FAILED: "Update failed",
    GENERIC_ERROR: "An error occurred",
    INTERNAL_SERVER_ERROR: "Internal server error",
} as const;

export const DatabaseTablePatterns = {
    SEPERATOR: "-",
    USER_PK: "user",
} as const;

export const RegexPatterns = {
    EMAIL_PATTERN: `/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`,
    PHONE_PATTERN: `^[0-9]{11,}$`,
    PARTIAL_EMAIL_PATTERN: `(?=^[^\@])(/@/)`,
    PARTIAL_PHONE_PATTERN: `^[0-9]{1,11}$`,
} as const;

export const Events = {
    USER_CREATED: "user.created",
} as const;

export const Miscs = {
    ERR_STATUS_SEPARATOR: "*",
} as const;

export const AppConfigs = {
    RPC_TIMEOUT: 60000,
} as const;
