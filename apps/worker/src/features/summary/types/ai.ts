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

export type AISummaryResponseType = {
    content: string;
    score: string;
};
