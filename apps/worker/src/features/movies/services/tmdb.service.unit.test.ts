import TMDBService from "./tmdb.service";

describe("TMDBService", () => {
    let tmdbService: TMDBService;

    beforeEach(() => {
        tmdbService = new TMDBService();
    });

    // Mock fetch globally
    beforeAll(() => {
        global.fetch = jest.fn();
    });

    describe("getMovie", () => {
        it("should fetch movie details by ID", async () => {
            const mockMovie = {
                id: 550,
                title: "Fight Club",
                overview: "A movie about an underground fight club.",
                release_date: "1999-10-15",
                runtime: 139,
            };
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockMovie,
            });
            const movieId = 550; // Example movie ID
            const movie = await tmdbService.getMovieById(movieId);
            expect(movie).toHaveProperty("id", movieId);
            expect(movie).toHaveProperty("title");
        });

        it("should throw an error if the fetch fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
            });
            await expect(tmdbService.getMovieById(550)).rejects.toThrow();
        });
    });

    describe("getPopulars", () => {
        it("should fetch popular movies", async () => {
            const mockMovies = [
                { id: 1, title: "Movie 1" },
                { id: 2, title: "Movie 2" },
            ];
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => ({ results: mockMovies }),
            });
            const movies = await tmdbService.getPopulars();
            expect(movies).toHaveLength(2);
            expect(movies[0]).toHaveProperty("id");
        });

        it("should throw an error if the fetch fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => ({ results: { a: 1 } }),
            });
            await expect(tmdbService.getPopulars()).rejects.toThrow();
        });
    });
    describe("findMovie", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        beforeEach(() => {
            (global.fetch as jest.Mock).mockClear();
        });

        it("should returns a list of movies matching the search criteria", async () => {
            const mockMovies = [
                { id: 1, title: "Inception" },
                { id: 2, title: "Interstellar" },
            ];
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => ({ results: mockMovies }),
            });
            const movies = await tmdbService.findMovie("Inception");
            expect(movies).toHaveLength(2);
            expect(movies[0]).toHaveProperty("title", "Inception");
        });

        it("should throw an error if the fetch fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
            });
            await expect(tmdbService.findMovie("Inception")).rejects.toThrow();
        });

        it("should return an empty array if no movies are found", async () => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => ({ results: [] }),
            });
            const movies = await tmdbService.findMovie("Nonexistent Movie");
            expect(movies).toHaveLength(0);
        });

        it("should include the year in the url", async () => {
            const year = 2020;
            await tmdbService.findMovie("Movie", year);
            const urlReceived = (global.fetch as jest.Mock).mock.calls[0][0];
            expect(urlReceived).toContain(`year=${year}`);
        });
    });
});
