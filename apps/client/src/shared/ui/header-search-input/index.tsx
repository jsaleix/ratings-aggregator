import clsx from "clsx";
import { Link } from "react-router";

interface Props {
    css?: string;
}

export default function HeaderSearchMovieInput({ css }: Props) {
    const containerCss = clsx(
        "w-full bg-bg-medium flex gap-1 rounded-2xl px-3 py-1 border-1 border-transparent hover:border-white cursor-pointer",
        css
    );

    return (
        <Link to="/movies" className={containerCss}>
            <p>I</p>
            <input
                type="text"
                className="bg-transparent w-full pointer-events-none"
                placeholder="Search a movie"
                disabled
            />
        </Link>
    );
}
