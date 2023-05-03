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

export const Services = {
    USER_SERVICE: "USER_SERVICE",
};

export const Miscs = {
    ERR_STATUS_SEPARATOR: "*",
} as const;

export const AppConfigs = {
    RPC_TIMEOUT: 60000,
} as const;