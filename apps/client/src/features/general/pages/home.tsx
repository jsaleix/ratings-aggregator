import { Link } from "react-router";
import Button from "../../../shared/ui/button";
import LastMoviesAdded from "../../movies/components/last-movies-added";

const imgIdx = Math.floor(Math.random() * 3) + 1;

export default function HomePage() {
    const image = `assets/images/home/${imgIdx}.webp`;

    return (
        <div className="w-full">
            <div className="flex flex-col gap-0">
                <section className="w-full flex  md:flex-row items-center gap-5 justify-center bg-black h-[80vh] md:h-auto z-1">
                    <div className="container mx-auto flex flex-row items-center w-full">
                        <div className="flex flex-col w-fit mmd:w-2/4 z-1 items-center md:items-start gap-5">
                            <h2 className="uppercase text-white text-5xl md:text-4xl font-bold text-center md:text-start text-shadow-lg">
                                Gathering ratings across different websites
                            </h2>
                            <p className="text-white text-2xl md:text-xl text-shadow-lg">
                                So you don't have to.
                            </p>
                            <Link to={"/auth"} className="">
                                <Button variant={"primary"}>
                                    Join now (for free)
                                </Button>
                            </Link>
                        </div>

                        <div className="md:w-3/4 h-[80vh] md:max-h-[50vh] overflow-hidden md:relative absolute opacity-70 md:opacity-100">
                            <img
                                className="mask-radial-[100%_100%] mask-radial-from-75% md:mask-x-from-60% md:mask-x-to-90% w-full h-full object-cover pointer-events-none drag-none select-none"
                                src={image}
                            />
                        </div>
                    </div>
                </section>

                <LastMoviesAdded />
            </div>
        </div>
    );
}
