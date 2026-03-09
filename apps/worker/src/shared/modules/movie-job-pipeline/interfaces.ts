export interface MovieJobPipelineServiceI {
    setFetching(movieId: string): Promise<void>;
    setRating(movieId: string): Promise<void>;
    setSummarizing(movieId: string): Promise<void>;
    setComplete(movieId: string): Promise<void>;
    setFailed(movieId: string, step: string, reason: string): Promise<void>;
}
