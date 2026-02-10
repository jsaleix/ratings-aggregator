import { config } from "dotenv";

config({ quiet: true });

export const SENTRY_CONFIG = {
    dsn: (process.env.SENTRY_DSN as string) ?? undefined,
};
