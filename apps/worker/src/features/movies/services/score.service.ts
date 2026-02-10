import { RatingType } from "../../ratings/types/db";
import { RATING_UNITS } from "../../../config/ratings";

export type CalcScoreRatingItem = Pick<RatingType, "value" | "rating_unit">;

export class ScoreService {
    static calcScore(ratings: CalcScoreRatingItem[]) {
        const scores = ratings
            .filter((rating) => !isNaN(+rating.value))
            .map((rating) => this.getScore(rating))
            .filter((score) => score !== undefined);

        const score =
            scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
        return Math.round(score);
    }

    static getScore(rating: CalcScoreRatingItem) {
        const value = +rating.value;
        switch (rating.rating_unit) {
            case RATING_UNITS.PERCENTAGE:
                return value;
            case RATING_UNITS.POINTS:
                return value * 10;
            case RATING_UNITS.STARS:
                return value * 20;
            default:
                return undefined;
        }
    }
}
