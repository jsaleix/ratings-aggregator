export interface MovieJobPipelineServiceI {
    setFetching(tmdb_id: number): Promise<void>;
    setRating(tmdb_id: number): Promise<void>;
    setSummarizing(tmdb_id: number): Promise<void>;
    setComplete(tmdb_id: number): Promise<void>;
    setFailed(tmdb_id: number, step: string, reason: string): Promise<void>;
}
