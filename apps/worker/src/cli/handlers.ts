import { AllocineProvider } from "../features/ratings/providers/allocine";
import { IMDBProvider } from "../features/ratings/providers/imdb";
import { LetterboxdProvider } from "../features/ratings/providers/letterboxd";
import { RottenProvider } from "../features/ratings/providers/rotten";
import {
    AllocineRatingType,
    ImdbRatingType,
    LetterboxdRatingType,
    RottenRatingType,
    type RatingProviderInterface,
} from "../features/ratings/providers/types";

type RatingType =
    | AllocineRatingType
    | ImdbRatingType
    | LetterboxdRatingType
    | RottenRatingType;

const imdbProvider = new IMDBProvider();

const PROVIDER_MAP: Record<string, RatingProviderInterface<RatingType>> = {
    allocine: new AllocineProvider(),
    imdb: imdbProvider,
    letterboxd: new LetterboxdProvider(),
    rotten: new RottenProvider(),
};

export function ratingsCommandHandler(
    name: string,
    provider: string,
    year: number,
    debug: boolean,
) {
    try {
        const p = PROVIDER_MAP[provider];
        if (!p) throw new Error("Invalid provider");
        console.log(
            `Fetching movie ratings from ${provider} for movie ${name} (${year})`,
        );
        return p.getRatings(name, year, debug);
    } catch (err) {
        console.error(err);
    }
}

export function imdbCommandHandler(imdbId: string, debug: boolean) {
    try {
        return imdbProvider.getRatingsById(imdbId, debug);
    } catch (err) {
        console.error(err);
    }
}

export async function addtoQueueCommandHandler(tmdbId: number) {
    try {
        const { movieQueue } = await import("../queues");

        await movieQueue.add("add-movie", {
            type: "add-movie",
            payload: { tmdbId },
            removeOnComplete: true,
            removeOnFail: true,
        });
    } catch (err) {
        console.error(err);
    }
}
