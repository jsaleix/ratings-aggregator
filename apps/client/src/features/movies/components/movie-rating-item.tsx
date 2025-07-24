import type { MovieRatingModel } from "../types/movie-rating";

interface Props {
    rating: MovieRatingModel;
}

export default function MovieRatingItem({ rating }: Props) {
    return (
        <article className="flex w-full justify-between items-center border-b-1 border-bg-light py-3">
            <div className="flex flex-col">
                <h3 className="capitalize text-xl text-white">
                    {rating.rating_source.replaceAll("_", " ")}
                </h3>
                {rating.updated_at && (
                    <p className="font-light text-sm text-text-se">
                        Last update:{" "}
                        <b>{new Date(rating.updated_at).toLocaleString()}</b>
                    </p>
                )}
            </div>
            <h2 className="font-bold text-white text-3xl">{rating.value}</h2>
        </article>
    );
}
