import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import PageHeader from "../../../../shared/ui/page-header";
import Input from "../../../../shared/ui/input";
import Pagination from "../../../../shared/ui/pagination";
import Button from "../../../../shared/ui/button";
import useMovieFilters from "../../../movies/hooks/use-filters";
import { type MovieModel } from "../../../movies/models/movie";
import MovieModal from "../../components/movies/movie-modal";
import useAdminSearchMoviesV2 from "../../hooks/use-admin-search-movies-v2";
import MoviesTable from "../../components/movies/movies-table";
import { displayMsg } from "../../../../shared/utils/toast";
import ApiAdminRequestsService from "../../services/requests.admin.service";

export default function MoviesPage() {
    const [title, setTitle] = useState("");
    const [debouncedTitle] = useDebounce(title, 500);
    const { filters } = useMovieFilters({
        order: "desc",
        orderBy: "updated_at",
    });
    const { refetch, setCurrentPage, pagination, movies, isFetched } =
        useAdminSearchMoviesV2(filters, debouncedTitle);
    const isEmpty = isFetched && movies.length === 0;
    const isLoading = !isFetched;
    const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);
    const [checkedMoviesTMDBids, setCheckedMoviesTMDBIDIds] = useState<
        number[]
    >([]);
    const onCloseModal = useCallback(() => {
        setSelectedMovie(null);
        refetch();
    }, []);

    const handleCheckMovie = useCallback((movieTMDBId: number) => {
        setCheckedMoviesTMDBIDIds((prev) =>
            prev.includes(movieTMDBId)
                ? prev.filter((id) => id !== movieTMDBId)
                : [...prev, movieTMDBId],
        );
    }, []);

    const handleCheckAll = useCallback(() => {
        setCheckedMoviesTMDBIDIds((prev) =>
            prev.length === 0 ? movies.map((m) => m.tmdbId) : [],
        );
    }, [movies]);

    const handleReloadCheckedMovies = async () => {
        try {
            if (checkedMoviesTMDBids.length === 0) return;
            const res =
                await ApiAdminRequestsService.addMultipleRequests(
                    checkedMoviesTMDBids,
                );
            if (res) displayMsg("Movies added to the queue!", "success");
            setCheckedMoviesTMDBIDIds([]);
        } catch (e) {
            if (e instanceof Error) displayMsg(e.message, "error");
            else displayMsg("An error has occurred", "error");
        }
    };

    useEffect(() => {
        setCheckedMoviesTMDBIDIds([]);
    }, [pagination]);

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title="Movies">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Movie title"
                    />
                    <Button
                        variant={"primary"}
                        disabled={checkedMoviesTMDBids.length === 0}
                        className="w-fit"
                        onClick={handleReloadCheckedMovies}
                    >
                        Reload checked movie
                    </Button>
                </PageHeader>
                {isEmpty && (
                    <p className="text-md italic text-text-secondary">
                        There is no movie
                    </p>
                )}
                {isLoading && <p>Loading...</p>}
                {movies.length > 0 && (
                    <MoviesTable
                        movies={movies}
                        checkedMovies={checkedMoviesTMDBids}
                        onCheckChange={handleCheckMovie}
                        onCheckAll={handleCheckAll}
                        onSelectMovie={setSelectedMovie}
                    />
                )}
                <Pagination data={pagination} onPageChange={setCurrentPage} />
            </div>
            <MovieModal movie={selectedMovie} onClose={onCloseModal} />
        </div>
    );
}
