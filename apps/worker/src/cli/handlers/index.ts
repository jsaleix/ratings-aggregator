const PROVIDERS = ["allocine", "imdb", "letterboxd", "rotten"];

export function ratingsCommandHandler(
    name: string,
    provider: string,
    year: number,
) {
    if (!PROVIDERS.includes(provider)) throw new Error("Invalid provider");
    console.log("salut");
}

export function ratingsByImdbIdHandler(imdbId: string, provider: string) {
    if (!PROVIDERS.includes(provider)) throw new Error("Invalid provider");
    console.log("salut");
}
