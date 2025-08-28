import Sentry from "@sentry/node";
import { SENTRY_CONFIG } from "../config/sentry";

Sentry.init({
    dsn: SENTRY_CONFIG.dsn,
    sendDefaultPii: true,
    integrations: [
        // send console.log, console.warn, and console.error calls as logs to Sentry
        // Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
    ],
    enableLogs: true,
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

console.log(SENTRY_CONFIG.dsn);
