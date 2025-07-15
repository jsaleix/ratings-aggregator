import { addMovie } from "./services/movies";
import { addReview } from "./services/reviews";

export async function addMovieAndReview(movieId: string): Promise<void> {
    console.log(`🟪 Adding movie + review for ${movieId}`);
    await addMovie(movieId);
    await addReview(movieId);
}
