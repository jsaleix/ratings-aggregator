import {
    logger as loggerSentry,
    captureException as captureExceptionSentry,
} from "@sentry/node";
import { SENTRY_CONFIG } from "../../config/sentry";

type ArgsTypes = Array<Record<any, unknown>>;

interface LoggerInterface {
    info(message: string, ...args: ArgsTypes): void;
    log(message: string, ...args: ArgsTypes): void;
    warn(message: string, ...args: ArgsTypes): void;
    error(message: string, ...args: ArgsTypes): void;
    captureException(exception: unknown): void;
}

class SentryLogger implements LoggerInterface {
    info(message: string, ...args: ArgsTypes) {
        loggerSentry.info(message, { ...args });
    }

    log(message: string, ...args: ArgsTypes) {
        loggerSentry.info(message, { ...args });
    }

    warn(message: string, ...args: ArgsTypes) {
        loggerSentry.warn(message, { ...args });
    }

    error(message: string, ...args: ArgsTypes) {
        loggerSentry.error(message, { ...args });
    }

    captureException(exception: unknown): void {
        captureExceptionSentry(exception);
    }
}

class ConsoleLogger implements LoggerInterface {
    info(message: string, ...args: ArgsTypes) {
        console.log(message, ...args);
    }

    log(message: string, ...args: ArgsTypes) {
        console.log(message, ...args);
    }

    warn(message: string, ...args: ArgsTypes) {
        console.warn(message, ...args);
    }

    error(message: string, ...args: ArgsTypes) {
        console.error(message, ...args);
    }

    captureException(exception: unknown): void {
        console.error(exception);
    }
}

export class LoggerFactory {
    static getLogger() {
        if (SENTRY_CONFIG.dsn) return new SentryLogger();
        return new ConsoleLogger();
    }
}

export const logger = LoggerFactory.getLogger();
