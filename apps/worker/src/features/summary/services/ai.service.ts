import { AI_CONFIG } from "../../../config/ai";
import { AIResponseType } from "../types/ai";

class AIService {
    async sendRequest({
        user,
        system,
    }: {
        user: string;
        system?: string;
    }): Promise<string> {
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
            throw new Error("Failed to fetch AI response");
        }

        const responseData: AIResponseType = await res.json();
        return responseData.choices[0].message.content;
    }
}

export default AIService;
