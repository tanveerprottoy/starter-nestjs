export const Constants = {
    API: "api",
    API_VERSION_1: "1",
    UPDATE_FAILED: "Update failed",
    GENERIC_ERROR: "An error occurred",
} as const;

export const Configs = {
    API_TIMEOUT: 300000,
    SALT_ROUNDS: 10,
} as const;

export const QueueConstants = {
    PROCESS_JOB: "process",
} as const;

export const Miscs = {
    ERR_STATUS_SEPARATOR: "*",
} as const;

export const Services = {
    USER_SERVICE: "USER_SERVICE",
    CHAT_SERVICE: "CHAT_SERVICE",
};

export const AppConfigs = {
    API_TIMEOUT: 45000,
    RPC_TIMEOUT: 45000,
    MAX_UPLOAD_FILE_COUNT: 10,
    MAX_FILE_SIZE: 1024 * 1024 * 50
} as const;
