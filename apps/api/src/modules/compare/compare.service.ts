import { Injectable } from '@nestjs/common';
import { MoviesService } from 'src/modules/movies/services/movies.service';
import { RatingsService } from 'src/modules/ratings/ratings.service';
import { SummaryService } from 'src/modules/summary/summary.service';

@Injectable()
export class CompareService {
  constructor(
    private movieService: MoviesService,
    private ratingsService: RatingsService,
    private summaryService: SummaryService,
  ) {}

  async getFullMovie(movieId: string) {
    const [{ movie }, ratings, summary] = await Promise.all([
      this.movieService.findOneById(movieId),
      this.ratingsService.findForMovie(movieId),
      this.summaryService.findOneByMovieId(movieId),
    ]);

    return {
      data: movie,
      ratings,
      summary,
    };
  }
}
