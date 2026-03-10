import { Controller, Param, Sse } from '@nestjs/common';
import { interval, switchMap } from 'rxjs';

import { Public } from 'src/auth/decorators/public.decorator';
import { MovieJobPipelineService } from './services/movie-job-pipeline.service';

@Controller('pipelines')
export class PipelineController {
  constructor(
    private readonly movieJobPipelineService: MovieJobPipelineService,
  ) {}

  @Sse('/movies')
  @Public()
  async all() {
    return interval(1500).pipe(
      switchMap(async (_) => ({
        type: 'update',
        data: { jobs: await this.movieJobPipelineService.getAllRunning() },
      })),
    );
  }

  @Sse('/movies/:slug')
  async moviesPipeline(@Param('slug') slug: string) {
    return interval(1500).pipe(
      switchMap(async (_) => ({
        type: 'update',
        data: { jobs: await this.movieJobPipelineService.getSpecific(slug) },
      })),
    );
  }
}
