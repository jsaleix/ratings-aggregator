import { RatingUnit } from "../../../../generated/prisma";

export type RatingAttributesType = {
    movieId: string;
    value: string;
    rating_source?: string;
    rating_unit?: RatingUnit;
    source_url?: string;
    rating_source_id?: string
};
