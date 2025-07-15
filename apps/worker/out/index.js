"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_1 = require("./config/redis");
const { host, port, password } = redis_1.redisConfig;
const connection = new ioredis_1.default({
    host,
    port,
    password,
    maxRetriesPerRequest: null,
});
const handlers = {
    "add-movie": (_a) => __awaiter(void 0, [_a], void 0, function* ({ movieId }) {
        yield addMovieAndReview(movieId);
    }),
};
const worker = new bullmq_1.Worker("main-queue", (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, payload } = job.data;
    const handler = handlers[type];
    if (!handler) {
        throw new Error(`❌ Unknown job type: ${type}`);
    }
    console.log(`🎬 Processing job [${job.id}] of type "${type}"`);
    yield handler(payload);
    console.log(`✅ Job [${job.id}] completed`);
}), {
    connection,
    concurrency: 1,
});
function addMovie(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`🟦 Adding movie ${movieId}`);
    });
}
function addReview(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`🟨 Adding review for movie ${movieId}`);
    });
}
function addMovieAndReview(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`🟪 Adding movie + review for ${movieId}`);
        yield addMovie(movieId);
        yield addReview(movieId);
    });
}
