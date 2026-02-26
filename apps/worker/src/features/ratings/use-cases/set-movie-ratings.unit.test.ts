import { MovieRepositoryI } from "../../movies/interfaces/repositories";
import { MovieType } from "../../movies/types/db";
import { RatingRepositoryI } from "../interfaces/repositories";
import { RatingCollectorServiceI } from "../interfaces/services";
import { RatingCollectorResult } from "../types/rating";
import { SetMovieRatings } from "./set-movie-ratings";

describe("UseCase SetMovieRatings", () => {
    let movieRepository: jest.Mocked<MovieRepositoryI>;
    let ratingCollector: jest.Mocked<RatingCollectorServiceI>;
    let ratingRepository: jest.Mocked<RatingRepositoryI>;
    let useCase: SetMovieRatings;

    const mockMovieFromDB = {
        id: "movie-1",
        title: "Test Movie",
        year: 2023,
        tmdb_id: 12345,
        summary: "This is a test movie.",
        release_date: new Date("2020-01-01"),
        runtime: 120,
        poster_path: "",
        budget: 1000000,
        tag_line: "A test movie tagline",
        created_at: new Date(),
        updated_at: new Date(),
        language: "en",
        original_title: "movie-1",
        imdb_id: "tt123",
        slug: "test-movie-1-2023",
        Genre: [],
    } satisfies MovieType;

    const mockRatingsAllocine = [
        {
            value: "7",
            source_url: undefined,
            extra: "",
            movieId: "movie-1",
            rating_source_code: "allocine",
        },
        {
            value: "8",
            source_url: undefined,
            extra: "",
            movieId: "movie-1",
            rating_source_code: "allocine",
        },
    ] satisfies [RatingCollectorResult, RatingCollectorResult];

    const mockRatingsRotten = [
        {
            value: "85",
            source_url: undefined,
            extra: "",
            movieId: "movie-1",
            rating_source_code: "rotten",
        },
        {
            value: "90",
            source_url: undefined,
            extra: "",
            movieId: "movie-1",
            rating_source_code: "rotten",
        },
    ] satisfies [RatingCollectorResult, RatingCollectorResult];

    const mockRatingIMDB = {
        value: "7.5",
        source_url: "https://imdb.com/title/tt1234567",
        extra: "",
        movieId: "movie-1",
        rating_source_code: "imdb",
    } satisfies RatingCollectorResult;

    const mockRatingLetterboxd = {
        value: "4.5",
        source_url: "https://letterboxd.com/film/superman-2025",
        extra: "",
        movieId: "movie-1",
        rating_source_code: "letterboxd",
    } satisfies RatingCollectorResult;

    beforeEach(() => {
        movieRepository = {
            getMovieBy: jest.fn(),
        } as any;

        ratingCollector = {
            collectAllocine: jest.fn(),
            collectIMDB: jest.fn(),
            collectRotten: jest.fn(),
            collectLetterboxd: jest.fn(),
        } as any;

        ratingRepository = {
            addOrUpdate: jest.fn(),
            getRatingsByMovieId: jest.fn(),
            setAllForMovie: jest.fn(),
        };

        useCase = new SetMovieRatings(
            movieRepository,
            ratingCollector,
            ratingRepository,
        );
    });

    it("should return combined ratings from all collectors", async () => {
        movieRepository.getMovieBy.mockResolvedValue(mockMovieFromDB);

        ratingCollector.collectAllocine.mockResolvedValue(mockRatingsAllocine);
        ratingCollector.collectIMDB.mockResolvedValue(mockRatingIMDB);
        ratingCollector.collectRotten.mockResolvedValue(mockRatingsRotten);
        ratingCollector.collectLetterboxd.mockResolvedValue(
            mockRatingLetterboxd,
        );

        const combinedResults = [
            ...mockRatingsAllocine.map((r) => ({
                ...r,
                Rating_Source: { code: r.rating_source_code },
            })),
            ...mockRatingsRotten.map((r) => ({
                ...r,
                Rating_Source: { code: r.rating_source_code },
            })),
            {
                ...mockRatingIMDB,
                Rating_Source: { code: mockRatingIMDB.rating_source_code },
            },
            {
                ...mockRatingLetterboxd,
                Rating_Source: {
                    code: mockRatingLetterboxd.rating_source_code,
                },
            },
        ];

        ratingRepository.setAllForMovie.mockResolvedValue(
            combinedResults as any,
        );

        const results = await useCase.execute(mockMovieFromDB.id);

        expect(results).toHaveLength(6);

        expect(movieRepository.getMovieBy).toHaveBeenCalledWith({
            id: mockMovieFromDB.id,
        });

        expect(ratingCollector.collectAllocine).toHaveBeenCalledWith(
            mockMovieFromDB,
        );
        expect(ratingCollector.collectIMDB).toHaveBeenCalledWith(
            mockMovieFromDB,
        );
        expect(ratingCollector.collectRotten).toHaveBeenCalledWith(
            mockMovieFromDB,
        );

        const allSources = results.map((r) => r.Rating_Source.code);
        expect(allSources).toEqual(
            expect.arrayContaining([
                "allocine",
                "rotten",
                "imdb",
                "letterboxd",
            ]),
        );
    });

    it("should throw if movie not found", async () => {
        movieRepository.getMovieBy.mockResolvedValue(null);

        await expect(useCase.execute("non-existing-id")).rejects.toThrow(
            "Movie with ID non-existing-id not found",
        );
    });
});
