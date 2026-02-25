import { MovieRepositoryI } from "../../movies/interfaces/repositories";
import { MovieType } from "../../movies/types/db";
import { RatingCollectorService } from "../services/rating-collector.service";
import { RatingType } from "../types/db";
import { SetMovieRatings } from "./set-movie-ratings";

describe("UseCase SetMovieRatings", () => {
    let movieRepository: jest.Mocked<MovieRepositoryI>;
    let ratingCollector: jest.Mocked<RatingCollectorService>;
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
    } satisfies MovieType;

    const mockRatingsAllocine = [
        {
            id: "r1",
            value: "7",
            source_url: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: "r2",
            value: "8",
            source_url: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ] satisfies [RatingType, RatingType];

    const mockRatingsRotten = [
        {
            id: "r3",
            value: "85",
            source_url: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: "r4",
            value: "90",
            source_url: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ] satisfies [RatingType, RatingType];

    const mockRatingIMDB = {
        id: "r5",
        value: "7.5",
        source_url: "https://imdb.com/title/tt1234567",
        extra: "",
        movieId: "movie-1",
        created_at: new Date(),
        updated_at: new Date(),
    } satisfies RatingType;

    const mockRatingLetterboxd = {
        id: "r6",
        value: "4.5",
        source_url: "https://letterboxd.com/film/superman-2025",
        extra: "",
        movieId: "movie-1",
        created_at: new Date(),
        updated_at: new Date(),
    } satisfies RatingType;

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

        useCase = new SetMovieRatings(movieRepository, ratingCollector);
    });

    it("should return combined ratings from all collectors", async () => {
        movieRepository.getMovieBy.mockResolvedValue(mockMovieFromDB);

        ratingCollector.collectAllocine.mockResolvedValue(mockRatingsAllocine);
        ratingCollector.collectIMDB.mockResolvedValue(mockRatingIMDB);
        ratingCollector.collectRotten.mockResolvedValue(mockRatingsRotten);
        ratingCollector.collectLetterboxd.mockResolvedValue(
            mockRatingLetterboxd,
        );

        const results = await useCase.execute(mockMovieFromDB.id);

        expect(results).toHaveLength(6);

        expect(movieRepository.getMovieBy).toHaveBeenCalledWith({
            id: mockMovieFromDB.id,
        });

        expect(ratingCollector.collectAllocine).toHaveBeenCalledWith(mockMovieFromDB);
        expect(ratingCollector.collectIMDB).toHaveBeenCalledWith(mockMovieFromDB);
        expect(ratingCollector.collectRotten).toHaveBeenCalledWith(mockMovieFromDB);

        const allIds = results.map((r) => r.id);
        expect(allIds).toEqual(
            expect.arrayContaining(["r1", "r2", "r3", "r4", "r5", "r6"]),
        );
    });

    it("should throw if movie not found", async () => {
        movieRepository.getMovieBy.mockResolvedValue(null);

        await expect(useCase.execute("non-existing-id")).rejects.toThrow(
            "Movie with ID non-existing-id not found",
        );
    });
});
