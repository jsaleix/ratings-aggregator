"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const v4_1 = __importDefault(require("zod/v4"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const redisConfigSchema = v4_1.default.object({
    host: v4_1.default.string(),
    port: v4_1.default.string().transform((v) => +v),
    password: v4_1.default.string().optional(),
});
exports.redisConfig = redisConfigSchema.parse({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
