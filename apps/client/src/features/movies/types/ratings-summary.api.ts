import { type RatingsSummaryModel } from "../models/ratings-summary";

export interface ApiRatingsSummaryType {
    id: string;
    content: string;
    score: string;
    score_value: number;
    updated_at: string;
    created_at: string;
    movieId: string;
}

export function mapRatingsSummaryApiToModel(data: ApiRatingsSummaryType) {
    return data as RatingsSummaryModel;
}
