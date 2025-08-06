import { Link } from "react-router";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

import MoviePosterItem from "./movie-poster-item";
import apiMoviesService from "../services/api-movies.service";

const settings = {
    dots: false,
    class: "h-55 w-full",
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
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
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 700,
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

export default function LastMoviesAdded() {
    const { data: movies } = useQuery({
        queryKey: ["lastMovies"],
        queryFn: async () => {
            const res = await apiMoviesService.getAll({
                order: "desc",
                orderBy: "created_at",
            });
            return res.data;
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    return (
        <section className="bg-bg-medium w-full">
            <div className="container mx-auto px-8 md:px-0 pb-5">
                <div className="flex flex-col py-5 gap-3 items-center">
                    <div className="w-full flex justify-between">
                        <h2 className="text-white text-xl">
                            Last movies added
                        </h2>
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
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M-8.74228e-08 14L6 8L-6.11959e-07 2L2 -8.74228e-08L10 8L2 16L-8.74228e-08 14Z"
                                        fill="white"
                                    />
                                </svg>
                            </i>
                        </Link>
                    </div>

                    {movies.length === 0 && (
                        <p className="text-slate-800">No movie found</p>
                    )}
                    {movies.length > 0 && (
                        <div className="w-full">
                            <Slider {...settings}>
                                {movies.map((movie) => (
                                    <MoviePosterItem
                                        movie={movie}
                                        key={movie.id}
                                    />
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
