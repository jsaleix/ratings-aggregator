export type CreateRatingAttributesType = {
    movieId: string;
    value: string;
    source_url?: string;
    rating_source_id: string;
};

export type RatingCollectorResult = {
    movieId: string;
    value: string;
    rating_source_code: string;
    extra?: string;
    source_url?: string;
};
