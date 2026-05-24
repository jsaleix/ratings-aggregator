import { AllocineProvider } from "../../features/ratings/providers/allocine";
import { IMDBProvider } from "../../features/ratings/providers/imdb";
import { LetterboxdProvider } from "../../features/ratings/providers/letterboxd";
import { RottenProvider } from "../../features/ratings/providers/rotten";
import {
    AllocineRatingType,
    ImdbRatingType,
    LetterboxdRatingType,
    RottenRatingType,
    type RatingProviderInterface,
} from "../../features/ratings/providers/types";

// const PROVIDERS = ["allocine", "imdb", "letterboxd", "rotten"];

type RatingType =
    | AllocineRatingType
    | ImdbRatingType
    | LetterboxdRatingType
    | RottenRatingType;

const PROVIDER_MAP: Record<string, RatingProviderInterface<RatingType>> = {
    allocine: new AllocineProvider(),
    imdb: new IMDBProvider(),
    letterboxd: new LetterboxdProvider(),
    rotten: new RottenProvider(),
};

export function ratingsCommandHandler(
    name: string,
    provider: string,
    year: number,
    debug: boolean,
) {
    const p = PROVIDER_MAP[provider];
    if (!p) throw new Error("Invalid provider");
    return p.getRatings(name, year, debug);
}
