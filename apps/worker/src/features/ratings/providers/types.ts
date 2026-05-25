export interface RatingProviderInterface<T extends unknown> {
    getRatings(name: string, year: number, debug: boolean): Promise<T>;
}

export interface AllocineRatingType {
    press: string;
    audience: string;
}

export interface ImdbRatingType {
    url: string;
    score: string;
}

export interface LetterboxdRatingType {
    name: string;
    url: string;
    score: string;
}

export interface RottenRatingType {
    name: string;
    url: string;
    criticsRatings: string;
    audienceRatings: string;
}
