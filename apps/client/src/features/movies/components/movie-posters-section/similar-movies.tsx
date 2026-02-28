import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import apiMoviesService from "../../services/api-movies.service";
import MoviePosterItem from "../movie-poster-item";
import MoviesSlider from "./movies-slider";

interface Props {
    slug: string;
}
export default function SimilarMovies({ slug }: Props) {
    const { data: movies } = useQuery({
        queryKey: ["related", slug],
        queryFn: async () => {
            const res = await apiMoviesService.getRelated(slug);
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
                        <h2 className="text-white text-xl">Similar</h2>
                        <Link
                            to="/movies?orderBy=created_at&order=desc"
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
                        <div className="w-full">
                            <MoviesSlider>
                                {movies.map((movie) => (
                                    <MoviePosterItem
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
