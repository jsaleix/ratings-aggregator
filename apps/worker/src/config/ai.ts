import { config } from "dotenv";

config();

if (!process.env.OPEN_ROUTER_API_KEY)
    throw new Error("Missing process.env.OPEN_ROUTER_API_KEY");

export const AI_CONFIG = {
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    apiUrl: "https://openrouter.ai/api/v1/chat/completions",
};
