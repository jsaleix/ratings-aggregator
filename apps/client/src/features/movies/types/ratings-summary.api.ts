import { type RatingsSummaryModel } from "./ratings-summary";

export interface ApiRatingsSummaryType {
    id: string;
    content: string;
    updated_at: string;
}

export function mapRatingsSummaryApiToModel(data: ApiRatingsSummaryType) {
    return data as RatingsSummaryModel;
}
