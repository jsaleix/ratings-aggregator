import { prismaMock } from "../../../tests/singleton";
import MovieService from "../services/movies.service";
import TMDBService from "../services/tmdb.service";
import { MovieCreateInput } from "../types/db";
import { TMDBGetMovieType } from "../types/tmdb";
import { AddMovieByTMDBIdUseCase } from "./add-movie-by-tmdb-id";

const existingMovie = {
    id: "1",
    tmdbId: 12345,
    title: "Test Movie",
    summary: "This is a test movie.",
    release_date: new Date("2020-01-01"),
    runtime: 120,
    poster_path: "",
    year: 2020,
    budget: 1000000,
    tagLine: "A test movie tagline",
    created_at: new Date(),
    updated_at: new Date(),
} satisfies MovieCreateInput;

describe("Use-cases/AddMovieByTMDBId", () => {
    let tmdbService: TMDBService;
    let movieService: MovieService;
    let useCase: AddMovieByTMDBIdUseCase;

    beforeEach(() => {
        jest.clearAllMocks();

        tmdbService = jest.mocked(new TMDBService());
        movieService = new MovieService(prismaMock);
        useCase = new AddMovieByTMDBIdUseCase(tmdbService, movieService);
    });

    describe("execute", () => {
        it("the movies already exists so it should return it", async () => {
            prismaMock.movie.findFirst.mockResolvedValue(existingMovie);
            const movieId = existingMovie.tmdbId;
            const movieResponse = await useCase.execute(movieId);
            expect(movieResponse).toEqual(existingMovie);
        });

        it("should throw an error if TMDB ID is not provided (because the movie doesn't exist then)", async () => {
            await expect(useCase.execute(undefined as any)).rejects.toThrow();
        });


        it("should add a new movie by ID", async () => {
            const tmdbId = 67890;
            const mockMovieResponse = {
                adult: false,
                id: tmdbId,
                title: "New Movie",
                original_title: "New Movie",
                overview: "This is a new movie.",
                genre: [],
                release_date: "2021-01-01",
                runtime: 150,
                poster_path: "/path/to/poster.jpg",
            } satisfies TMDBGetMovieType;

            tmdbService.getMovieById = jest
                .fn()
                .mockResolvedValue(mockMovieResponse);
            tmdbService.mapApiResponseToModel = jest.fn().mockReturnValue({
                tmdbId: tmdbId,
                title: mockMovieResponse.title,
                summary: mockMovieResponse.overview,
                release_date: new Date(mockMovieResponse.release_date),
                runtime: mockMovieResponse.runtime,
                poster_path: "",
                year: 2021,
                budget: 0,
                tagLine: "",
            } satisfies MovieCreateInput);

            prismaMock.movie.create.mockResolvedValue({
                ...existingMovie,
                title: mockMovieResponse.title,
                id: "2",
                created_at: new Date(),
            } satisfies MovieCreateInput);

            const result = await useCase.execute(tmdbId);
            expect(prismaMock.movie.create).toHaveBeenCalledWith({
                data: {
                    tmdbId: tmdbId,
                    title: mockMovieResponse.title,
                    summary: mockMovieResponse.overview,
                    release_date: new Date(mockMovieResponse.release_date),
                    runtime: mockMovieResponse.runtime,
                    poster_path: "",
                    year: 2021,
                    budget: 0,
                    tagLine: "",
                },
            });

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("title", mockMovieResponse.title);
        });
    });
});
