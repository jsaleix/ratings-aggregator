import MovieRatingItem from "../../../../movies/components/movie-rating-item";
import type { MovieRatingModel } from "../../../../movies/types/movie-rating";

interface Props {
    ratings: MovieRatingModel[] | null;
}

export default function RatingsElement({ ratings }: Props) {
    if (!ratings) return <div className="w-full md:w-[50%]"></div>;
    return (
        <div className="flex flex-col w-full md:w-[50%] ">
            {ratings.map((rating) => (
                <MovieRatingItem rating={rating} key={rating.id} />
            ))}
        </div>
    );
}
