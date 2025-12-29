import { AI_CONFIG } from "../../../config/ai";
import { logger } from "../../../shared/logger";
import TooManyRequestsError from "../errors/too-many-requests";
import { AIResponseType, AISummaryResponseType } from "../types/ai";

class AIService {
    async sendRequest({
        user,
        system,
    }: {
        user: string;
        system?: string;
    }): Promise<AISummaryResponseType> {
        const data = {
            model: "deepseek/deepseek-r1-0528:free",
            messages: [],
        } as Record<string, any>;

        if (system) {
            data.messages.push({
                role: "system",
                content: system,
            });
        }

        data.messages.push({
            role: "user",
            content: user,
        });

        const res = await fetch(AI_CONFIG.apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${AI_CONFIG.apiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (res.status !== 200) {
            if (res.status === 429) throw new TooManyRequestsError();
            else
                throw new Error(
                    `Failed to fetch AI response: ${res.status} ${res.statusText}`
                );
        }

        const responseData: AIResponseType = await res.json();
        logger.info("summary/aiService/sendRequest() response", {
            payload: responseData,
            tags: ["summary", "aiService"],
            request: data,
            response: [responseData.choices[0], responseData.choices[1]],
        });
        const rawContent = responseData.choices[0].message.content;
        const result = JSON.parse(rawContent) as AISummaryResponseType;
        if (!result.content || !result.score)
            throw new Error(
                "Invalid response type, missing content and/or score"
            );
        return result;
    }
}

export default AIService;
