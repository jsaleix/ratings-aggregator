import { Link } from "react-router";

import Button from "../../../shared/ui/button";
import { useAuthContext } from "../../../core/auth/provider";
import LastMoviesAdded from "../../movies/components/movie-posters-section/last-movies-added";
import LastMoviesUpdated from "../../movies/components/movie-posters-section/last-movies-updated";
import RandomMovies from "../../movies/components/movie-posters-section/random-movies";
import HeroRatings from "../components/hero-ratings";
import TopMovies from "../../movies/components/movie-posters-section/top-movies";

export default function HomePage() {
    const { isConnected } = useAuthContext();

    return (
        <div className="w-full">
            <div className="flex flex-col gap-0">
                <section className="w-full flex md:flex-row items-center gap-5 justify-center bg-black h-[80vh] md:h-[60vh] z-1 overflow-hidden relative">
                    <div className="z-1 container mx-auto flex flex-row gap-10 items-center w-full relative h-full">
                        <div className="flex flex-col w-fit z-1 items-center md:items-start gap-5 p-5 lg:p-0">
                            <h2 className="uppercase text-white text-4xl font-bold text-center md:text-start text-shadow-lg">
                                Your all-in-one
                                <br />
                                hub for movie ratings
                            </h2>
                            <p className="text-white text-2xl md:text-xl text-shadow-lg font-light md:text-start text-center">
                                See how films score across
                                <br />
                                IMDb, Metacritic, and more — instantly.
                            </p>
                            {!isConnected && (
                                <Link to={"/auth"} className="">
                                    <Button variant={"primary"} size={"large"}>
                                        Join now (for free)
                                    </Button>
                                </Link>
                            )}
                        </div>
                        <HeroRatings className="hidden md:block md:scale-55 lg:scale-65 2xl:scale-90 h-fit" />
                    </div>
                    <div
                        className="
                            bg-amber-800
                            top-0 left-0 w-full h-full overflow-hidden absolute 
                            bg-[url('/assets/images/home/apocalypse.webp')]
                            bg-cover bg-bottom
                        "
                    ></div>
                </section>

                <TopMovies />
                <hr className="divider" />
                <LastMoviesAdded />
                <hr className="divider" />
                <RandomMovies />
                <hr className="divider" />
                <LastMoviesUpdated />
            </div>
        </div>
    );
}
