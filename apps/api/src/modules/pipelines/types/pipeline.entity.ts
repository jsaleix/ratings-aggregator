import { Prisma } from 'generated/prisma/client';
import { movieSelect } from 'src/modules/movies/entities/movie.entity';

export const movieJobPipelineSelect = {
  id: true,
  tmdb_id: true,
  status: true,
  movie: {
    select: movieSelect,
  },
} satisfies Prisma.Movie_Job_PipelineSelect;

export type MovieJobPipelineType = Prisma.Movie_Job_PipelineGetPayload<{
  select: typeof movieJobPipelineSelect;
}>;
