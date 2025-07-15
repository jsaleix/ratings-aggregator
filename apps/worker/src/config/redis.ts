import z from "zod/v4";
import { config } from "dotenv";

config();

const redisConfigSchema = z.object({
    host: z.string(),
    port: z.string().transform((v) => +v),
    password: z.string().optional(),
});

export const redisConfig = redisConfigSchema.parse({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
