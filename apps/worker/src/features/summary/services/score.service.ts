import { RATING_UNITS } from "../../../config/ratings";
import { ScoreServiceI } from "../interfaces/services";
import { CalcScoreRatingItem } from "../types/score";

export class ScoreService implements ScoreServiceI {
    private clamp(value: number, min: number = 0, max: number = 100): number {
        return Math.max(min, Math.min(max, value));
    }

    private normalizeValue(value: string): number {
        const normalized = value.toString().trim().replace(",", ".");
        return parseFloat(normalized);
    }

    calcScore(ratings: CalcScoreRatingItem[]) {
        const scores = ratings
            .filter((rating) => !isNaN(this.normalizeValue(rating.value)))
            .map((rating) => this.getScore(rating))
            .filter((score) => score !== undefined);

        if (scores.length === 0) {
            return 0;
        }

        const score =
            scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
        return Math.round(this.clamp(score));
    }

    getScore(rating: CalcScoreRatingItem): number | undefined {
        const value = this.normalizeValue(rating.value);
        let score: number;

        switch (rating.Rating_Source.rating_unit) {
            case RATING_UNITS.PERCENTAGE:
                score = value;
                break;
            case RATING_UNITS.POINTS:
                score = (value / 10) * 100;
                break;
            case RATING_UNITS.STARS:
                score = (value / 5) * 100;
                break;
            default:
                return undefined;
        }

        return this.clamp(score);
    }
}
