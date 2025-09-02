import MovieService from "../../movies/services/movies.service";
import { MovieType } from "../../movies/types/db";
import { RatingCollectorService } from "../services/rating-collector.service";
import { RatingType } from "../types/db";
import { SetMovieRatings } from "./set-movie-ratings";

describe("UseCase SetMovieRatings", () => {
    let movieService: jest.Mocked<MovieService>;
    let ratingCollector: jest.Mocked<RatingCollectorService>;
    let useCase: SetMovieRatings;

    const mockMovie = {
        id: "movie-1",
        title: "Test Movie",
        year: 2023,
        tmdbId: 12345,
        summary: "This is a test movie.",
        release_date: new Date("2020-01-01"),
        runtime: 120,
        poster_path: "",
        budget: 1000000,
        tagLine: "A test movie tagline",
        created_at: new Date(),
        updated_at: new Date(),
        language: "en",
        original_title: "movie-1",
        imdbId: "tt123",
    } satisfies MovieType;

    const mockRatingsAllocine = [
        {
            id: "r1",
            rating_source: "Allociné",
            value: "7",
            rating_unit: "stars",
            sourceUrl: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: "r2",
            rating_source: "Allociné Audience",
            value: "8",
            rating_unit: "stars",
            sourceUrl: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ] satisfies [RatingType, RatingType];

    const mockRatingsRotten = [
        {
            id: "r3",
            rating_source: "Rotten Tomatoes",
            value: "85",
            rating_unit: "percentage",
            sourceUrl: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: "r4",
            rating_source: "Rotten Tomatoes Audience",
            value: "90",
            rating_unit: "percentage",
            sourceUrl: null,
            extra: "",
            movieId: "movie-1",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ] satisfies [RatingType, RatingType];

    const mockRatingIMDB = {
        id: "r5",
        rating_source: "IMDB",
        value: "7.5",
        rating_unit: "points",
        sourceUrl: "https://imdb.com/title/tt1234567",
        extra: "",
        movieId: "movie-1",
        created_at: new Date(),
        updated_at: new Date(),
    } satisfies RatingType;

    beforeEach(() => {
        movieService = {
            getMovieBy: jest.fn(),
        } as any;

        ratingCollector = {
            collectAllocine: jest.fn(),
            collectIMDB: jest.fn(),
            collectRotten: jest.fn(),
        } as any;

        useCase = new SetMovieRatings(movieService, ratingCollector);
    });

    it("should return combined ratings from all collectors", async () => {
        movieService.getMovieBy.mockResolvedValue(mockMovie);

        ratingCollector.collectAllocine.mockResolvedValue(mockRatingsAllocine);
        ratingCollector.collectIMDB.mockResolvedValue(mockRatingIMDB);
        ratingCollector.collectRotten.mockResolvedValue(mockRatingsRotten);

        const results = await useCase.execute(mockMovie.id);

        expect(results).toHaveLength(5);

        expect(movieService.getMovieBy).toHaveBeenCalledWith({
            id: mockMovie.id,
        });

        expect(ratingCollector.collectAllocine).toHaveBeenCalledWith(mockMovie);
        expect(ratingCollector.collectIMDB).toHaveBeenCalledWith(mockMovie);
        expect(ratingCollector.collectRotten).toHaveBeenCalledWith(mockMovie);

        const allIds = results.map((r) => r.id);
        expect(allIds).toEqual(
            expect.arrayContaining(["r1", "r2", "r3", "r4", "r5"])
        );
    });

    it("should throw if movie not found", async () => {
        movieService.getMovieBy.mockResolvedValue(null);

        await expect(useCase.execute("non-existing-id")).rejects.toThrow(
            "Movie with ID non-existing-id not found"
        );
    });
});
