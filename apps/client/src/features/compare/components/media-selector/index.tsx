import { useCallback } from "react";

import SingleMediaSelector from "../single-media-selector";
import apiMoviesService from "../../../movies/services/api-movies.service";

interface Props {
    onSelectA: (movieId: string) => void;
    onSelectB: (movieId: string) => void;
}

export default function MediaSelector({ onSelectA, onSelectB }: Props) {
    const searchFn = useCallback(async (title: string) => {
        return (await apiMoviesService.search({ title })).data;
    }, []);

    return (
        <div className="flex flex-col gap-5" data-testid="media-selector">
            <div data-testid="movie-a" className="flex flex-col gap-3">
                <SingleMediaSelector
                    searchFn={searchFn}
                    onSelect={({ id }) => onSelectA(id)}
                />
            </div>
            <div data-testid="movie-b" className="flex flex-col gap-3">
                <SingleMediaSelector
                    searchFn={searchFn}
                    onSelect={({ id }) => onSelectB(id)}
                />
            </div>
        </div>
    );
}
