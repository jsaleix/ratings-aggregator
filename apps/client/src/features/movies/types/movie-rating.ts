export interface MovieRatingModel {
    id: string;
    movieId: string;
    rating_source: string;
    value: string;
    rating_unit: string;
    extra: string;
    created_at: string;
    updated_at: string;
    sourceUrl: null | string;
}
