import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { motion } from "motion/react";

import apiMoviesService from "../services/api-movies.service";
import apiRatingsService from "../services/api-ratings.service";
import apiSummaryService from "../services/api-summary.service";
import { BASE_POSTER_URL } from "../../../core/config/misc";
import { useAuthContext } from "../../../core/auth/provider";
import { setPageTitle } from "../../../shared/utils/page";
import Button from "../../../shared/ui/button";

import MoviePageSkeleton from "../components/movie-page-skeleton";
import MovieSummaryItem from "../components/movie-summary-item";
import LastMoviesAdded from "../components/movie-posters-section/last-movies-added";
import LastMoviesUpdated from "../components/movie-posters-section/last-movies-updated";
import CompareBtn from "../components/compare-btn";
import RatingListPart from "../components/rating-list-part";

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

    const lastUpdatedStr = useMemo(() => {
        if (!movie) return "";
        const date = new Date(movie.updated_at);
        if (isNaN(date.getTime())) return "Unknown date";
        return formatDistanceToNow(date, { addSuffix: true });
    }, [movie]);

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
                    <div className="hidden md:flex overflow-hidden aspect-[9/16] w-[300px] h-[450px]">
                        <img
                            width={300}
                            height={450}
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
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold text-white md:max-w-90">
                                {movie.title}
                            </h1>
                            <h3
                                className="italic text-2xl text-text-secondary"
                                title="original title"
                            >
                                / {movie.original_title}
                            </h3>
                        </div>
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
                            {movie.budget !== -1 && (
                                <p className="text-text-secondary">
                                    Budget:{" "}
                                    <span className="bg-secondary px-1 text-black w-fit select-none font-bold">
                                        ${movie.budget.toLocaleString()}
                                    </span>
                                </p>
                            )}
                            <p className="text-text-secondary">
                                TMDB ID:{" "}
                                <code className="bg-secondary px-1 text-black w-fit">
                                    {movie.tmdbId}
                                </code>
                            </p>
                            <CompareBtn movieId={id!} />
                        </div>
                    </div>
                </header>
                <span className={"w-full h-[10px] bg-bg-light"} />
                <div className="flex flex-col gap-3 w-full md:px-0 px-5">
                    <div className="w-full flex justify-between">
                        <h1 className="text-xl font-bold uppercase text-white">
                            <span className="text-secondary">R</span>atings
                        </h1>
                        <p>Updated {lastUpdatedStr}</p>
                    </div>
                    {isConnected ? (
                        <>
                            <RatingListPart ratings={ratings} />
                            {ratingsSummary && (
                                <motion.div
                                    initial={"hidden"}
                                    whileInView={"visible"}
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: -20,
                                        },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.5,
                                                delay: 0.2,
                                            },
                                        },
                                    }}
                                >
                                    <MovieSummaryItem data={ratingsSummary} />
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center gap-3">
                            <p>You must be authenticated to see the ratings</p>
                            <Link
                                to={`/auth`}
                                state={{
                                    redirect: `/movies/${movie.id}`,
                                }}
                            >
                                <Button variant="primary">Login</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <LastMoviesAdded />
            <hr className="divider" />
            <LastMoviesUpdated />
        </div>
    );
}
