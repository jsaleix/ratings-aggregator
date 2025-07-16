class ReviewService {
    async addReviews(movieId: string, name: string) {
        console.log(`🟨 Adding review for movie ${name} ${movieId}`);
    }
}

export default new ReviewService();
