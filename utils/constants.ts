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
