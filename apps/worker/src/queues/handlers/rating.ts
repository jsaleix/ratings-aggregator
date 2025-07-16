import { Job } from "bullmq";

const ratingJobsTypeValues = {
    "set-rating:rotten": "set-rating:rotten",
    "set-rating:imdb": "set-rating:imdb",
    "set-rating:letterboxd": "set-rating:letterboxd",
    "set-rating:allocine": "set-rating:allocine",
} as const;

const ratingJobsTypeArr = Object.values(ratingJobsTypeValues);

type RatingJobType =
    (typeof ratingJobsTypeValues)[keyof typeof ratingJobsTypeValues];

type RatingJob = {
    type: RatingJobType;
    payload: {
        movieId: string;
        name: string;
    };
};

export const ratingHandler = async (job: Job<RatingJob>) => {
    const { type, payload: _ } = job.data;

    if (!ratingJobsTypeArr.includes(type)) {
        throw new Error(`❌ Unknown job type: ${type}`);
    }

    switch (type) {
        case ratingJobsTypeValues["set-rating:allocine"]:
            break;
        case ratingJobsTypeValues["set-rating:imdb"]:
            break;
        case ratingJobsTypeValues["set-rating:letterboxd"]:
            break;
        case ratingJobsTypeValues["set-rating:rotten"]:
            break;
    }

    console.log(`Processing job [${job.id}] of type "${type}"`);
};
