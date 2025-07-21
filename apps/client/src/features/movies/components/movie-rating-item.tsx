import type { MovieRatingModel } from "../types/movie-rating";

interface Props {
    rating: MovieRatingModel;
}

export default function MovieRatingItem({ rating }: Props) {
    return (
        <article className="flex w-full justify-between items-center border-b-1 border-bg-light py-3">
            <h3 className="capitalize text-xl">
                {rating.rating_source.replaceAll("_", " ")}
            </h3>
            <h2 className="font-bold text-white text-3xl">{rating.value}</h2>
        </article>
    );
}
