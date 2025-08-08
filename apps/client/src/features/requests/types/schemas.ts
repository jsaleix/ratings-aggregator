import z from "zod/v4";

export type CreateRequestType = z.infer<typeof createRequestSchema>;

export const createRequestSchema = z.object({
    tmdbId: z.number().min(1),
    title: z.string(),
});
