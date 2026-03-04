import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import MoviesSlider from "./movies-slider";
import MovieTopItem from "../movie-top-item";
import apiMoviesService from "../../services/api-movies.service";
import type { Settings } from "react-slick";

const sliderConfig: Settings = {
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 2,
    initialSlide: 0,

    responsive: [
        {
            breakpoint: 2048,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                initialSlide: 2,
            },
        },
    ],
};

export default function TopMovies() {
    const { data: movies } = useQuery({
        queryKey: ["top"],
        queryFn: async () => {
            const res = await apiMoviesService.getTop();
            return res;
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    if (movies.length === 0) return <></>;
    return (
        <section className="bg-slate-900 w-full">
            <div className="container mx-auto px-8 md:px-0 pb-5">
                <div className="flex flex-col py-5 gap-3 items-center">
                    <div className="w-full flex justify-between">
                        <h2 className="text-white text-xl">Top Movies</h2>
                        <Link
                            to="/movies"
                            className="text-white font-bold hover:underline flex items-center gap-3"
                        >
                            See all
                            <i>
                                <svg
                                    width="10"
                                    height="16"
                                    viewBox="0 0 10 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M-8.74228e-08 14L6 8L-6.11959e-07 2L2 -8.74228e-08L10 8L2 16L-8.74228e-08 14Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                        </Link>
                    </div>
                    {movies.length > 0 && (
                        <div className="block w-full">
                            <MoviesSlider extraSettings={sliderConfig}>
                                {movies.map((movie, index) => (
                                    <MovieTopItem
                                        index={index + 1}
                                        movie={movie}
                                        key={movie.id}
                                    />
                                ))}
                            </MoviesSlider>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
