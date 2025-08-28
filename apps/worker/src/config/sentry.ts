import { config } from "dotenv";

config();

export const SENTRY_CONFIG = {
    dsn: (process.env.SENTRY_DSN as string) ?? undefined,
};
