import { Link } from "react-router";
import Button from "../../../shared/ui/button";
import LastMoviesAdded from "../../movies/components/last-movies-added";
import { useAuthContext } from "../../../core/auth/provider";
import LastMoviesUpdated from "../../movies/components/last-movies-updated";

const MAX = 3;
const img1 = Math.floor(Math.random() * 3) + 1;
const img2 = img1 === MAX ? 1 : img1 + 1;

export default function HomePage() {
    const { isConnected } = useAuthContext();
    const imageA = `assets/images/home/${img1}.webp`;
    const imageB = `assets/images/home/${img2}.webp`;

    return (
        <div className="w-full">
            <div className="flex flex-col gap-0">
                <section className="w-full flex  md:flex-row items-center gap-5 justify-center bg-black h-[80vh] md:h-[50vh] z-1 overflow-hidden">
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

                        <div className="md:w-3/4 h-[80vh] md:max-h-[50vh] overflow-hidden md:relative absolute opacity-70 md:opacity-100">
                            <img
                                className="mask-radial-[100%_100%] mask-radial-from-75% md:mask-x-from-50% md:mask-x-to-90% w-full h-full object-cover pointer-events-none drag-none select-none"
                                src={imageA}
                            />
                        </div>

                        <div className="top-0 left-0 w-[30vw] h-[80vh] overflow-hidden absolute opacity-70 md:opacity-100 hidden md:block">
                            <img
                                className="mask-radial-[100%_100%] mask-radial-from-75% md:mask-x-from-50% md:mask-x-to-90% w-full h-full object-cover pointer-events-none drag-none select-none"
                                src={imageB}
                            />
                        </div>
                    </div>
                </section>

                <LastMoviesAdded />
                <hr className="divider" />
                <LastMoviesUpdated />
            </div>
        </div>
    );
}
