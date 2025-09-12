import { useCallback, useState } from "react";

import Button from "../../../../shared/ui/button";
import { type MovieModel } from "../../../movies/types/movie";
import SingleMediaSelector from "../single-media-selector";
import apiMoviesService from "../../../movies/services/api-movies.service";

interface Props {
    compareFn: (mediaAId: string, mediaBId: string) => void;
}

export default function MediaSelector({ compareFn }: Props) {
    const [selectedA, setSelectedA] = useState<MovieModel | null>(null);
    const [selectedB, setSelectedB] = useState<MovieModel | null>(null);
    const disableSubmitBtn = !(selectedA && selectedB);

    const searchFn = useCallback(async (title: string) => {
        return (await apiMoviesService.search({ title })).data;
    }, []);

    return (
        <div className="flex flex-col" data-testid="media-selector">
            <div data-testid="movie-a">
                <SingleMediaSelector
                    searchFn={searchFn}
                    onSelect={(movie: MovieModel) => setSelectedA(movie)}
                />
                {selectedA && <p>{selectedA.title}</p>}
            </div>
            <div data-testid="movie-b">
                <SingleMediaSelector
                    searchFn={searchFn}
                    onSelect={(movie: MovieModel) => setSelectedB(movie)}
                />
                {selectedB && <p>{selectedB.title}</p>}
            </div>
            <Button
                variant={"primary"}
                data-testid="compare-btn"
                disabled={disableSubmitBtn}
                onClick={() =>
                    !disableSubmitBtn && compareFn(selectedA.id, selectedB.id)
                }
            >
                Compare {disableSubmitBtn ? "no" : "ok"}
            </Button>
        </div>
    );
}
