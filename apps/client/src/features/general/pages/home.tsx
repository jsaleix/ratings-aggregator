import { Link } from "react-router";

import Button from "../../../shared/ui/button";
import { useAuthContext } from "../../../core/auth/provider";
import LastMoviesAdded from "../../movies/components/movie-posters-section/last-movies-added";
import LastMoviesUpdated from "../../movies/components/movie-posters-section/last-movies-updated";
import RandomMovies from "../../movies/components/movie-posters-section/random-movies";

export default function HomePage() {
    const { isConnected } = useAuthContext();

    return (
        <div className="w-full">
            <div className="flex flex-col gap-0">
                <section className="w-full flex md:flex-row items-center gap-5 justify-center bg-black h-[80vh] md:h-[50vh] z-1 overflow-hidden relative">
                    <div className="container mx-auto flex flex-row items-center w-full relative h-full">
                        <div className="flex flex-col w-fit mmd:w-2/4 z-1 items-center md:items-start gap-5">
                            <h2 className="uppercase text-white text-5xl md:text-4xl font-bold text-center md:text-start text-shadow-lg">
                                Gathering ratings across different websites
                            </h2>
                            <p className="text-white text-2xl md:text-xl text-shadow-lg">
                                So you don't have to.
                            </p>
                            {!isConnected && (
                                <Link to={"/auth"} className="">
                                    <Button variant={"primary"}>
                                        Join now (for free)
                                    </Button>
                                </Link>
                            )}
                        </div>
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

                <LastMoviesAdded />
                <hr className="divider" />
                <RandomMovies />
                <hr className="divider" />
                <LastMoviesUpdated />
            </div>
        </div>
    );
}
