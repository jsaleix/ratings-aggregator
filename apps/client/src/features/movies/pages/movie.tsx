import { useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import apiMoviesService from "../services/api-movies.service";
import apiRatingsService from "../services/api-ratings.service";
import { BASE_POSTER_URL } from "../../../core/config/misc";
import MovieRatingItem from "../components/movie-rating-item";

export default function MoviePage() {
    let { id } = useParams();
    const { data: movie, isFetching: isMovieFetching } = useQuery({
        queryKey: ["getMovie", id],
        queryFn: async () => {
            if (!id) throw new Error("missing id");
            return apiMoviesService.getById(id);
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });
    const { data: ratings } = useQuery({
        queryKey: ["getMovieRatings", id],
        queryFn: async () => {
            if (!id) throw new Error("missing id");
            return apiRatingsService.getMovieRatings(id);
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const posterUrl = useMemo(
        () => (movie ? BASE_POSTER_URL + movie.poster_path : ""),
        [movie]
    );

    if (isMovieFetching || !movie?.id) return <p>Loading...</p>;

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <header className="flex flex-col w-full md:flex-row gap-5 justify-center">
                    <div className="hidden md:flex h-auto md:w-65 overflow-hidden aspect-[9/16]">
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-contain select-none pointer-events-none"
                        />
                    </div>
                    <div
                        className="md:hidden bg-top-left bg-size-[100vw] h-80 bg-fixed bg-no-repeat"
                        style={{ backgroundImage: `url(${posterUrl})` }}
                    ></div>
                    <div className="flex flex-col gap-3 px-5">
                        <h1 className="text-3xl font-bold text-white md:max-w-90">
                            {movie.title}
                        </h1>
                        <h2 className="text-xl text-text-secondary">
                            {movie.year}
                        </h2>
                        {movie.tagLine && (
                            <p className="md:max-w-80 font-light text-white md:text-md text-xl">
                                {movie.tagLine}
                            </p>
                        )}
                        <p className="md:max-w-90 font-light text-white md:text-md text-lg">
                            {movie.summary}
                        </p>
                        <div className="flex flex-col gap-2">
                            <p className="text-text-secondary">
                                Budget:{" "}
                                <span className="text-white">
                                    ${movie.budget.toLocaleString()}
                                </span>
                            </p>
                            <p className="text-text-secondary">
                                Runtime:{" "}
                                <span className="text-white">
                                    {movie.runtime.toLocaleString()} minutes
                                </span>
                            </p>
                            {movie.release_date !== "" && (
                                <p className="text-text-secondary">
                                    Release date:{" "}
                                    <span className="text-white">
                                        {new Date(
                                            movie.release_date
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </header>
                <hr className="w-full border-bg-light" />
                <div className="flex flex-col gap-3 w-full md:px-0 px-5">
                    <div className="w-full flex justify-between">
                        <h1 className="text-xl font-bold uppercase text-white">
                            <span className="text-orange-700">R</span>atings
                        </h1>
                        <p className="text-text-secondary">
                            Status:{" "}
                            <span className="uppercase font-bold text-white">
                                {movie.ratings_status}
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col">
                        {ratings.length === 0 && <p>No rating</p>}
                        {ratings.length > 0 && (
                            <ul className="flex flex-col md:w-[100%]">
                                {ratings?.map((rating) => (
                                    <MovieRatingItem
                                        rating={rating}
                                        key={rating.id}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
