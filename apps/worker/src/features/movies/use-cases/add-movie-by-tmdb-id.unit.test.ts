import slugify from "slugify";
import { prismaMock } from "../../../tests/singleton";
import MockMovieRepository from "../repositories/mock-movie.repository";
import TMDBService from "../services/tmdb.service";
import { MovieCreateInput } from "../types/db";
import { TMDBGetMovieType } from "../types/tmdb";
import { AddMovieByTMDBIdUseCase } from "./add-movie-by-tmdb-id";

const existingMovie = {
    id: "1",
    tmdb_id: 12345,
    imdb_id: "tt12345",
    title: "Test Movie",
    original_title: "Test Movie",
    language: "en",
    summary: "This is a test movie.",
    release_date: new Date("2020-01-01"),
    runtime: 120,
    poster_path: "",
    year: 2020,
    budget: 1000000,
    tag_line: "A test movie tagline",
    created_at: new Date(),
    updated_at: new Date(),
} satisfies MovieCreateInput;

describe("Use-cases/AddMovieByTMDBId", () => {
    let tmdbService: TMDBService;
    let movieService: MockMovieRepository;
    let useCase: AddMovieByTMDBIdUseCase;

    beforeEach(() => {
        jest.clearAllMocks();

        tmdbService = jest.mocked(new TMDBService());
        movieService = new MockMovieRepository(prismaMock);
        useCase = new AddMovieByTMDBIdUseCase(tmdbService, movieService);
    });

    describe("execute", () => {
        // it("the movies already exists so it should return it", async () => {
        //     prismaMock.movie.findFirst.mockResolvedValue(existingMovie);
        //     const movieId = existingMovie.tmdbId;
        //     const movieResponse = await useCase.execute(movieId);
        //     expect(movieResponse).toEqual(existingMovie);
        // });

        it("should throw an error if TMDB ID is not provided (because the movie doesn't exist then)", async () => {
            await expect(useCase.execute(undefined as any)).rejects.toThrow();
        });

        it("should add a new movie by ID", async () => {
            const tmdbId = 67890;
            // Mocks TMDB ID return value
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
                original_language: "en",
                imdb_id: "tt123",
            } satisfies TMDBGetMovieType;

            // Mocks getMovieById return value
            tmdbService.getMovieById = jest
                .fn()
                .mockResolvedValue(mockMovieResponse);

            // Mocks mapApiResponseToModel return value
            tmdbService.mapApiResponseToModel = jest.fn().mockReturnValue({
                tmdb_id: tmdbId,
                title: mockMovieResponse.title,
                original_title: mockMovieResponse.original_title,
                summary: mockMovieResponse.overview,
                release_date: new Date(mockMovieResponse.release_date),
                runtime: mockMovieResponse.runtime,
                poster_path: "",
                year: 2021,
                budget: 0,
                tag_line: "",
                language: mockMovieResponse.original_language,
                imdb_id: mockMovieResponse.imdb_id,
            } satisfies Omit<MovieCreateInput, "slug">);

            const slug = `${mockMovieResponse.title.toLowerCase().replace(" ", "-")}-2021`;

            // Mocks repository upsert return value
            prismaMock.movie.upsert.mockResolvedValue({
                ...existingMovie,
                title: mockMovieResponse.title,
                id: "2",
                created_at: new Date(),
                slug,
            } satisfies MovieCreateInput);

            const result = await useCase.execute(tmdbId);
            const payload = {
                tmdb_id: tmdbId,
                title: mockMovieResponse.title,
                original_title: mockMovieResponse.original_title,
                summary: mockMovieResponse.overview,
                release_date: new Date(mockMovieResponse.release_date),
                runtime: mockMovieResponse.runtime,
                poster_path: "",
                year: 2021,
                budget: 0,
                tag_line: "",
                language: mockMovieResponse.original_language,
                imdb_id: mockMovieResponse.imdb_id,
                slug,
            };
            expect(prismaMock.movie.upsert).toHaveBeenCalledWith({
                create: payload,
                update: payload,
                where: { tmdb_id: payload.tmdb_id },
            });

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("title", mockMovieResponse.title);
        });
    });
});
