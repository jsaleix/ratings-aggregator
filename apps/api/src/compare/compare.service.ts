import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesService } from 'src/movies/services/movies.service';
import { RatingsService } from 'src/ratings/ratings.service';
import { SummaryService } from 'src/summary/summary.service';

@Injectable()
export class CompareService {
  constructor(
    private movieService: MoviesService,
    private ratingsService: RatingsService,
    private summaryService: SummaryService,
  ) {}

  async getFullMovie(movieId: string) {
    const [{ movie }, ratings, summary] = await Promise.all([
      this.movieService.findOne(movieId),
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
