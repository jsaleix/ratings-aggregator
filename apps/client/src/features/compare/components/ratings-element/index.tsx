import MovieRatingItem from "../../../movies/components/movie-rating-item";
import type { MovieRatingModel } from "../../../movies/types/movie-rating";

interface Props {
    ratings: MovieRatingModel[];
}

export default function RatingsElement({ ratings }: Props) {
    return (
        <div className="flex flex-col w-[50%]">
            {ratings.map((rating) => (
                <MovieRatingItem rating={rating} key={rating.id} />
            ))}
        </div>
    );
}
