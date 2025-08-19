import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import apiMoviesService from "../services/api-movies.service";
import apiRatingsService from "../services/api-ratings.service";
import apiSummaryService from "../services/api-summary.service";
import { BASE_POSTER_URL } from "../../../core/config/misc";
import { useAuthContext } from "../../../core/auth/provider";
import { setPageTitle } from "../../../shared/utils/page";
import MovieRatingItem from "../components/movie-rating-item";
import LastMoviesAdded from "../components/last-movies-added";
import MoviePageSkeleton from "../components/movie-page-skeleton";

export default function MoviePage() {
    const { isConnected } = useAuthContext();
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
            if (!isConnected) throw new Error("Not authenticated");
            if (!id) throw new Error("missing id");
            return apiRatingsService.getMovieRatings(id);
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const { data: ratingsSummary } = useQuery({
        queryKey: ["getMovieRatingsSummary", id],
        queryFn: async () => {
            if (!isConnected) throw new Error("Not authenticated");
            if (!id) throw new Error("missing id");
            return apiSummaryService.getMovieRatingSummary(id);
        },
        initialData: undefined,
        refetchOnWindowFocus: false,
    });

    const posterUrl = useMemo(
        () => (movie ? BASE_POSTER_URL + movie.poster_path : ""),
        [movie]
    );

    useEffect(() => {
        if (movie) setPageTitle(movie.title);
    }, [movie]);

    if (isMovieFetching || !movie?.id) return <MoviePageSkeleton />;

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <header className="flex flex-col w-full md:flex-row gap-5 justify-center">
                    <div className="hidden md:flex h-auto md:w-75 overflow-hidden aspect-[9/16]">
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
                    <div className="flex flex-col gap-3 px-5 md:px-0">
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
                            <p className="text-text-secondary">
                                TMDB ID:{" "}
                                <span className="text-white">
                                    {movie.tmdbId}
                                </span>
                            </p>
                        </div>
                    </div>
                </header>
                <hr className="w-full border-bg-light" />
                <div className="flex flex-col gap-3 w-full md:px-0 px-5">
                    <div className="w-full flex justify-between">
                        <h1 className="text-xl font-bold uppercase text-white">
                            <span className="text-secondary">R</span>atings
                        </h1>
                    </div>
                    <div className="flex flex-col">
                        {isConnected ? (
                            <>
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
                            </>
                        ) : (
                            <p>You must be authenticated to see the ratings</p>
                        )}
                    </div>
                    {isConnected && ratingsSummary && (
                        <div className="w-full xl:w-1/3 h-fit bg-bg-medium p-5 rounded-xl shadow-md flex flex-col gap-1">
                            <h2 className="uppercase text-primary font-bold">
                                Synthesis
                            </h2>
                            <p className="text-white">
                                {ratingsSummary.content}
                            </p>
                            <p className="text-text-secondary font-light text-sm">
                                <span>Last update: </span>
                                {new Date(
                                    ratingsSummary.updated_at
                                ).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <LastMoviesAdded />
        </div>
    );
}
