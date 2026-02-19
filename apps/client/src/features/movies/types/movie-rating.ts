export interface MovieRatingModel {
    id: string;
    movieId: string;
    value: string;
    extra: string;
    created_at: string;
    updated_at: string;
    source_url: null | string;
    rating_source?: string;
    rating_unit?: string;
    Rating_Source: {
        id: string
        code: string;
        name: string;
        rating_unit: string;
        url: string;
        country_code: string;
    };
}
