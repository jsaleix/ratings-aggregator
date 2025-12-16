import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "../../../../shared/ui/button";
import Input from "../../../../shared/ui/input";
import { type CreateRequestType } from "../../types/schemas";
import apiMoviesService from "../../../movies/services/api-movies.service";
import TMDBMovieItem from "../tmdb-movie-item";

interface Props {
    label: string;
    action?: (data: CreateRequestType) => any;
}

export default function RequestPremiumForm({ label, action }: Props) {
    const [title, setTitle] = useState("");
    const [movieSelected, setMovieSelected] = useState<{
        id: number;
        title: string;
    } | null>(null);

    const { data, refetch, isLoading, isFetching, isFetched } = useQuery({
        queryKey: ["search-movie-by-title", title],
        queryFn: async () => {
            const response = await apiMoviesService.searchByTMDBID(title);
            return response;
        },
        refetchOnWindowFocus: false,
        enabled: false,
        initialData: [],
    });

    const handleSubmit = async () => {
        if (!movieSelected) return;

        const requestData: CreateRequestType = {
            tmdbId: movieSelected.id,
            // title: movieSelected.title,
        };

        if (action) {
            await action(requestData);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-3 w-full">
                <form
                    className="flex flex-col gap-1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        refetch();
                    }}
                >
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant={"default"}
                        placeholder="Search by title of the movie"
                    />
                    {isFetched && !isFetching && data?.length === 0 && (
                        <span className={"text-md text-text-secondary"}>
                            No results found
                        </span>
                    )}
                    {isLoading && <p>Loading...</p>}
                    {data.length > 0 && (
                        <div className="max-h-85 overflow-y-auto flex flex-col gap-2">
                            {data?.map((tmdbMovie) => (
                                <TMDBMovieItem
                                    selected={
                                        movieSelected?.id === tmdbMovie.id
                                    }
                                    onClick={() =>
                                        setMovieSelected({
                                            id: tmdbMovie.id,
                                            title: tmdbMovie.title,
                                        })
                                    }
                                    data={tmdbMovie}
                                    key={tmdbMovie.id}
                                />
                            ))}
                        </div>
                    )}
                </form>

                <Button
                    disabled={!movieSelected}
                    variant={"primary"}
                    type="submit"
                    onClick={handleSubmit}
                >
                    {label}
                </Button>
            </div>
        </>
    );
}
