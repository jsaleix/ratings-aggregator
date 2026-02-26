import { prismaMock } from "../../../tests/singleton";
import { GenreRepositoryI } from "../interfaces/repositories";
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
    slug: "test-movie-2020",
} satisfies MovieCreateInput;

describe("Use-cases/AddMovieByTMDBId", () => {
    let genreRepository: GenreRepositoryI;
    let tmdbService: TMDBService;
    let movieService: MockMovieRepository;
    let useCase: AddMovieByTMDBIdUseCase;

    beforeEach(() => {
        jest.clearAllMocks();

        genreRepository = {
            createOrUpdateGenre: jest.fn(),
        } as GenreRepositoryI;
        tmdbService = {
            getMovieById: jest.fn(),
            getPopulars: jest.fn(),
            findMovie: jest.fn(),
            mapApiGenreResponseToModel: jest.fn(),
            mapApiResponseToModel: jest.fn(),
        } as TMDBService;
        movieService = new MockMovieRepository(prismaMock);
        useCase = new AddMovieByTMDBIdUseCase(
            tmdbService,
            movieService,
            genreRepository,
        );
    });

    describe("execute", () => {
        it("should throw an error if movie not appropriate", async () => {
            const mockTMDBResponse = {
                adult: true,
                id: 67890,
                title: "New Movie",
                original_title: "New Movie",
                overview: "This is a new movie.",
                genres: [],
                release_date: "2021-01-01",
                runtime: 150,
                poster_path: "/path/to/poster.jpg",
                original_language: "en",
                imdb_id: "tt123",
            } satisfies TMDBGetMovieType;
            tmdbService.getMovieById = jest
                .fn()
                .mockResolvedValue(mockTMDBResponse);
            await expect(useCase.execute(67890)).rejects.toThrow(
                "Movie is marked as adult content and cannot be added.",
            );
        });

        it("should add a new movie by ID", async () => {
            const tmdbId = 67890;
            // Mocks TMDB ID return value
            const mockTMDBResponse = {
                adult: false,
                id: tmdbId,
                title: "New Movie",
                original_title: "New Movie",
                overview: "This is a new movie.",
                genres: [],
                release_date: "2021-01-01",
                runtime: 150,
                poster_path: "/path/to/poster.jpg",
                original_language: "en",
                imdb_id: "tt123",
            } satisfies TMDBGetMovieType;

            const tmdbServiceMapMovieModelMockResponse = {
                tmdb_id: tmdbId,
                title: mockTMDBResponse.title,
                original_title: mockTMDBResponse.original_title,
                summary: mockTMDBResponse.overview,
                release_date: new Date(mockTMDBResponse.release_date),
                runtime: mockTMDBResponse.runtime,
                poster_path: "",
                year: 2021,
                budget: 0,
                tag_line: "",
                language: mockTMDBResponse.original_language,
                imdb_id: mockTMDBResponse.imdb_id,
            } satisfies Omit<MovieCreateInput, "slug">;

            const slug = `${mockTMDBResponse.title.toLowerCase().replace(" ", "-")}-2021`;

            const movieRepositoryMockResponse = {
                ...existingMovie,
                title: mockTMDBResponse.title,
                id: "2",
                created_at: new Date(),
                slug,
            } satisfies MovieCreateInput;

            const expectedReceivedParams = {
                tmdb_id: tmdbId,
                title: mockTMDBResponse.title,
                original_title: mockTMDBResponse.original_title,
                summary: mockTMDBResponse.overview,
                release_date: new Date(mockTMDBResponse.release_date),
                runtime: mockTMDBResponse.runtime,
                poster_path: "",
                year: 2021,
                budget: 0,
                tag_line: "",
                language: mockTMDBResponse.original_language,
                imdb_id: mockTMDBResponse.imdb_id,
                slug,
            };

            tmdbService.getMovieById = jest
                .fn()
                .mockResolvedValue(mockTMDBResponse);
            tmdbService.mapApiResponseToModel = jest
                .fn()
                .mockReturnValue(tmdbServiceMapMovieModelMockResponse);
            tmdbService.mapApiGenreResponseToModel = jest
                .fn()
                .mockReturnValue([]);
            movieService.createOrUpdate = jest
                .fn()
                .mockReturnValue(movieRepositoryMockResponse);
            genreRepository.createOrUpdateGenre = jest.fn().mockReturnValue([]);

            const useCaseResult = await useCase.execute(tmdbId);

            expect(tmdbService.mapApiResponseToModel).toHaveBeenCalled();
            expect(tmdbService.mapApiGenreResponseToModel).toHaveBeenCalled();

            expect(movieService.createOrUpdate).toHaveBeenCalledWith(
                expectedReceivedParams,
                [],
            );
            expect(useCaseResult).toHaveProperty("id");
            expect(useCaseResult).toHaveProperty(
                "title",
                mockTMDBResponse.title,
            );
        });
    });
});
