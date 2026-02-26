import type { GenreModel } from "../../models/movie";
import GenreLabelItem from "../genre-label-item";
import { twMerge } from "tailwind-merge";

interface Props {
    genres: GenreModel[];
    style?: string;
    id?: string;
    labelSize?: "small" | "medium" | "large";
}

export default function GenresLabelsPart({
    genres,
    style,
    id,
    labelSize = "medium",
}: Props) {
    const css = twMerge("flex flex-row gap-1 flex-wrap", style);

    return (
        <div id={id} className={css}>
            {genres.map((item) => (
                <GenreLabelItem key={item.id} genre={item} size={labelSize} />
            ))}
        </div>
    );
}
