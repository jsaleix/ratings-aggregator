import { useCallback } from "react";

import SingleMediaSelector from "../single-media-selector";
import apiMoviesService from "../../../movies/services/api-movies.service";

interface Props {
    onSelectA: (movieId: string) => void;
    onSelectB: (movieId: string) => void;
}

export default function MediaSelector({ onSelectA, onSelectB }: Props) {
    // const [selectedA, setSelectedA] = useState<MovieModel | null>(null);
    // const [selectedB, setSelectedB] = useState<MovieModel | null>(null);

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
                {/* {selectedA && (
                    <div className="flex gap-3 items-center">
                        <p>{selectedA.title}</p>
                        <button
                            className="cursor-pointer hover:opacity-85 duration-150"
                            data-testid="media-selector-remove"
                            onClick={() => setSelectedA(null)}
                        >
                            <RemoveIcon className="fill-red-500" />
                        </button>
                    </div>
                )} */}
            </div>
            <div data-testid="movie-b" className="flex flex-col gap-3">
                <SingleMediaSelector
                    searchFn={searchFn}
                    onSelect={({ id }) => onSelectB(id)}
                />
                {/* {selectedB && (
                    <div className="flex gap-3 items-center">
                        <p>{selectedB.title}</p>
                        <button
                            className="cursor-pointer hover:opacity-85 duration-150"
                            data-testid="media-selector-remove"
                            onClick={() => setSelectedB(null)}
                        >
                            <RemoveIcon className="fill-red-500" />
                        </button>
                    </div>
                )} */}
            </div>
            {/* <Button
                variant={"primary"}
                data-testid="compare-btn"
                disabled={disableSubmitBtn}
                onClick={() =>
                    !disableSubmitBtn && compareFn(selectedA.id, selectedB.id)
                }
            >
                Compare {disableSubmitBtn ? "no" : "ok"}
            </Button> */}
        </div>
    );
}
