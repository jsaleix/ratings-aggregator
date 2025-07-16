import { Prisma } from "../../../../generated/prisma";
import { prismaMock } from "../../../tests/singleton";
import MovieService from "./movies.service";
import TMDBService from "./tmdb.service";

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
    createdAt: new Date(),
} satisfies Prisma.MovieCreateInput;

describe("MovieService", () => {
    let tmdbService: TMDBService;
    let movieService: MovieService;

    beforeEach(() => {
        jest.clearAllMocks();

        tmdbService = jest.mocked(new TMDBService());
        movieService = new MovieService(prismaMock, tmdbService);
    });

    describe("addMovieById", () => {
        it("the movies already exists so it should return it", async () => {
            prismaMock.movie.findFirst.mockResolvedValue(existingMovie);
            const movieId = existingMovie.tmdbId;
            const movieResponse = await movieService.addMovieById(movieId);
            expect(movieResponse).toEqual(existingMovie);
        });

        it("should add a new movie by ID", async () => {
            const tmdbId = 67890;
            const mockMovieResponse = {
                id: tmdbId,
                title: "New Movie",
                overview: "This is a new movie.",
                release_date: "2021-01-01",
                runtime: 150,
            };

            tmdbService.getMovie = jest
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
            });

            prismaMock.movie.create.mockResolvedValue({
                ...existingMovie,
                title: mockMovieResponse.title,
                id: "2",
                createdAt: new Date(),
            });

            const result = await movieService.addMovieById(tmdbId);
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

    describe("addMovieByName", () => {
        it("should add a new movie by name", async () => {
            const movieName = "Test Movie";
            const mockMovieResponse = [
                {
                    id: 12345,
                    title: movieName,
                    overview: "This is a test movie.",
                    release_date: "2020-01-01",
                    runtime: 120,
                },
            ];

            tmdbService.findMovie = jest
                .fn()
                .mockResolvedValue(mockMovieResponse);
            tmdbService.mapApiResponseToModel = jest.fn().mockReturnValue({
                tmdbId: 12345,
                title: movieName,
                summary: mockMovieResponse[0].overview,
                release_date: new Date(mockMovieResponse[0].release_date),
                runtime: mockMovieResponse[0].runtime,
                poster_path: "",
                year: 2020,
                budget: 0,
                tagLine: "",
            });

            prismaMock.movie.create.mockResolvedValue({
                ...existingMovie,
                title: movieName,
                id: "3",
                createdAt: new Date(),
            });

            const result = await movieService.addMovieByName(movieName);
            expect(prismaMock.movie.create).toHaveBeenCalledWith({
                data: {
                    tmdbId: 12345,
                    title: movieName,
                    summary: mockMovieResponse[0].overview,
                    release_date: new Date(mockMovieResponse[0].release_date),
                    runtime: mockMovieResponse[0].runtime,
                    poster_path: "",
                    year: 2020,
                    budget: 0,
                    tagLine: "",
                },
            });

            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("title", movieName);
        });

        it("should return undefined if no movies found", async () => {
            const movieName = "Nonexistent Movie";
            tmdbService.findMovie = jest.fn().mockResolvedValue([]);
            const result = await movieService.addMovieByName(movieName);
            expect(result).toBeUndefined();
        });
    });
});
