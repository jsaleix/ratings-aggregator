import { Link } from "react-router";
import Button from "../../../shared/ui/button";
import LastMoviesAdded from "../../movies/components/last-movies-added";

const imgIdx = Math.floor(Math.random() * 3) + 1;

export default function HomePage() {
    const image = `assets/images/home/${imgIdx}.webp`;

    return (
        <div className="w-full">
            <div className="flex flex-col gap-0">
                <section className="w-full flex flex-col md:flex-row items-center gap-5 justify-center bg-black h-[80vh] md:h-auto z-1">
                    <div className="flex flex-col w-full md:w-2/4 md:ml-40 gap-3 p-5 md:p-0 z-1 items-center md:items-start">
                        <h2 className="uppercase text-white  text-4xl md:text-3xl font-bold text-center md:text-start">
                            Gathering ratings across different websites
                        </h2>
                        <p className="text-white text-2xl md:text-xl">
                            So you don't have to.
                        </p>
                        <Link to={"/auth"} className="w-2/3">
                            <Button variant={"primary"}>
                                Join now (for free)
                            </Button>
                        </Link>
                    </div>
                    <div className="h-[80vh] md:max-h-[50vh] overflow-hidden md:relative absolute opacity-30 md:opacity-100">
                        <img
                            className="mask-radial-[100%_100%] mask-radial-from-75% md:mask-radial-at-right w-full h-full object-cover"
                            src={image}
                        />
                    </div>
                </section>

                <LastMoviesAdded maxResults={5}/>
            </div>
        </div>
    );
}
