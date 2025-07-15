"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisConfig = {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT || "6379", 10),
    password: REDIS_PASSWORD || undefined,
};
exports.redisConfig = redisConfig;
