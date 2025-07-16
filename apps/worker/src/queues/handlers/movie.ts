import { Job } from "bullmq";

import MovieService from "../../features/movies/services/movies.service";
import TMDBService from "../../features/movies/services/tmdb.service";
import { db } from "../../core/db";

const movieJobsTypeValues = {
    "add-movie:id": "add-movie:id",
    "add-movie:name": "add-movie:name",
} as const;

const movieJobsTypeArr = Object.values(movieJobsTypeValues);

type MovieJobType =
    (typeof movieJobsTypeValues)[keyof typeof movieJobsTypeValues];

type MovieJob = {
    type: MovieJobType;
    payload: {
        movieId?: number;
        name?: string;
    };
};

const tmdbService = new TMDBService();
const movieService = new MovieService(db, tmdbService);

export const movieHandler = async (job: Job<MovieJob>) => {
    const { type, payload } = job.data;

    if (!movieJobsTypeArr.includes(type)) {
        throw new Error(`❌ Unknown job type: ${type}`);
    }

    console.log(`Processing job [${job.id}] of type "${type}"`);

    let res: any = null;

    switch (type) {
        case movieJobsTypeValues["add-movie:id"]:
            if (!payload.movieId)
                throw new Error(`Missing movieId from add-movie:id`);
            res = await movieService.addMovieById(payload.movieId);
            job.returnvalue = res;

            break;
        case movieJobsTypeValues["add-movie:name"]:
            if (!payload.name)
                throw new Error(`Missing name from add-movie:name`);
            res = await movieService.addMovieByName(payload.name);
            job.returnvalue = res;
            break;
    }
};
