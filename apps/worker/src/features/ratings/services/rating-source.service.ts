import { RatingSourceRepositoryI } from "../interfaces/repositories";
import { RatingSourceServiceI } from "../interfaces/services";

export class RatingSourceService implements RatingSourceServiceI {
    private ratingSourceCache: Map<string, string> | null = null;
    private ratingSourceCacheExpiry: number | null = null;
    private readonly CACHE_TTL_MS = 60 * 60 * 1000; // 1h

    constructor(private ratingSourceRepository: RatingSourceRepositoryI) {}

    async getRatingSourceId(code: string): Promise<string> {
        const now = Date.now();
        if (
            !this.ratingSourceCache ||
            !this.ratingSourceCacheExpiry ||
            now > this.ratingSourceCacheExpiry
        ) {
            const sources = await this.ratingSourceRepository.findAll();
            this.ratingSourceCache = new Map(
                sources.map((s) => [s.code, s.id]),
            );
            this.ratingSourceCacheExpiry = now + this.CACHE_TTL_MS;
        }
        const id = this.ratingSourceCache.get(code);
        if (!id) throw new Error(`Rating source "${code}" not found`);
        return id;
    }
}
