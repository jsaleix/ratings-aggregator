import { type RatingsSummaryModel } from "./ratings-summary";

export interface RatingsSummaryApiResponseType {
    id: string;
    content: string;
    updated_at: string;
}

export function mapRatingsSummaryToModel(data: RatingsSummaryApiResponseType) {
    return data as RatingsSummaryModel;
}
