import clsx from "clsx";
import { Link } from "react-router";
import MagnifyingGlass from "../icons/magnifying-glass";

interface Props {
    css?: string;
}

export default function HeaderSearchMovieInput({ css }: Props) {
    const containerCss = clsx(
        "w-full flex items-center bg-bg-medium flex gap-1 rounded-2xl px-3 py-1 border-1 border-transparent hover:border-utils-orange-light cursor-pointer group duration-150",
        css
    );

    return (
        <Link to="/movies" className={containerCss}>
            <MagnifyingGlass />
            <input
                type="text"
                className="bg-transparent w-full pointer-events-none"
                placeholder="Search a movie"
                disabled
            />
        </Link>
    );
}
