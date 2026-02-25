import { AISummaryResponseType } from "../types/ai";
import { CalcScoreRatingItem } from "../types/score";

export interface ScoreServiceI {
    calcScore(ratings: CalcScoreRatingItem[]): number;
    getScore(rating: CalcScoreRatingItem): number | undefined;
}

export interface AiServiceI {
    sendRequest({
        user,
        system,
    }: {
        user: string;
        system: string;
    }): Promise<AISummaryResponseType>;
}
