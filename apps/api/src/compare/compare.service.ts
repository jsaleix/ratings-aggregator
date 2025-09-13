import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesService } from 'src/movies/services/movies.service';
import { RatingsService } from 'src/ratings/ratings.service';

@Injectable()
export class CompareService {
  constructor(
    private movieService: MoviesService,
    private ratingsService: RatingsService,
  ) {}

  async compareMovies(movieAId: string, movieBId: string) {
    const [movieA, movieB] = await Promise.all([
      this.movieService.findOne(movieAId),
      this.movieService.findOne(movieBId),
    ]);

    // if (!movieA.movie || !movieB.movie)
    //   throw new NotFoundException(
    //     `movie #${movieAId} and/or #${movieBId} not found`,
    //   );

    const [ratingsA, ratingsB] = await Promise.all([
      this.ratingsService.findForMovie(movieAId),
      this.ratingsService.findForMovie(movieBId),
    ]);
    const ratingsAKeys = ratingsA.map((r) => r.rating_source);
    const ratingsBKeys = ratingsB.map((r) => r.rating_source);

    const commonKeys = ratingsAKeys.filter((key) => ratingsBKeys.includes(key));
    const uniqueAKeys = ratingsAKeys.filter(
      (key) => !ratingsBKeys.includes(key),
    );
    const uniqueBKeys = ratingsBKeys.filter(
      (key) => !ratingsAKeys.includes(key),
    );

    return {
      movies: [
        {
          data: movieA.movie,
          ratings: {
            common: ratingsA.filter((r) =>
              commonKeys.includes(r.rating_source),
            ),
            unique: ratingsA.filter((r) =>
              uniqueAKeys.includes(r.rating_source),
            ),
          },
        },
        {
          data: movieB.movie,
          ratings: {
            common: ratingsB.filter((r) =>
              commonKeys.includes(r.rating_source),
            ),
            unique: ratingsB.filter((r) =>
              uniqueBKeys.includes(r.rating_source),
            ),
          },
        },
      ],
      meta: {
        common: commonKeys,
      },
    };
  }
}
