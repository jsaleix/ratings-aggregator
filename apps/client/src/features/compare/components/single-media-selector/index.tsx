import { useQuery } from "@tanstack/react-query";
import Input from "../../../../shared/ui/input";
import { useCallback, useState } from "react";
import { type MovieModel } from "../../../movies/types/movie";
import { useDebounce } from "use-debounce";

interface Props {
    searchFn: (query: string) => Promise<MovieModel[]>;
    onSelect: (movie: MovieModel) => void;
}

export default function SingleMediaSelector({ searchFn, onSelect }: Props) {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 500);

    const { data: results } = useQuery({
        queryKey: ["media-search", debouncedQuery],
        queryFn: () => searchFn(query),
        initialData: [],
        enabled: !!debouncedQuery,
    });

    const selectMovie = useCallback((movie: MovieModel) => {
        setQuery("");
        onSelect(movie);
    }, []);

    return (
        <div className="flex flex-col" data-testid="single-media-selector">
            <Input
                placeholder="Movie name"
                data-testid="media-selector-input"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            {results.length > 0 && (
                <ResultsList items={results} onSelect={selectMovie} />
            )}
        </div>
    );
}

interface ResultsListProps {
    items: MovieModel[];
    onSelect?: (movie: MovieModel) => void;
}

function ResultsList({ items, onSelect }: ResultsListProps) {
    return (
        <div data-testid={"results-list"}>
            <ul>
                {items.map((movie) => (
                    <li key={movie.id} onClick={() => onSelect?.(movie)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
