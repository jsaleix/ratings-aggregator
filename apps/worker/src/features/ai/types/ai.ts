export type AIResponseType = {
    id: string;
    provider: string;
    model: string;
    choices: {
        message: {
            role: string;
            content: string;
        };
    }[];
};
