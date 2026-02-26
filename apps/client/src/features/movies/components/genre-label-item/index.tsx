import clsx from "clsx";
import type { GenreModel } from "../../models/movie";

interface Props {
    genre: GenreModel;
    size?: "medium" | "large" | "small";
}

const sizeStyles = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-3 py-1",
    large: "text-base px-4 py-1.5",
};

export default function GenreLabelItem({ genre, size = "medium" }: Props) {
    const style = clsx(
        "rounded-sm font-bold bg-utils-yellow text-black text-center w-fit shadow-lg cursor-default select-none",
        // "bg-gradient-to-r from-slate-200 to-blue-200",
        sizeStyles[size],
    );
    return <article className={style}>{genre.name}</article>;
}
