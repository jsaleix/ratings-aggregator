import { Controller, Param, Sse } from '@nestjs/common';
import { interval, switchMap } from 'rxjs';

import { Public } from 'src/auth/decorators/public.decorator';
import { MovieJobPipelineService } from './services/movie-job-pipeline.service';
import { RequestsService } from 'src/requests/services/requests.service';

@Controller('pipelines')
export class PipelineController {
  constructor(
    private readonly movieJobPipelineService: MovieJobPipelineService,
    private readonly requestsService: RequestsService,
  ) {}

  @Sse('/movies')
  @Public()
  async all() {
    return interval(2000).pipe(
      switchMap(async (_) => ({
        type: 'update',
        data: {
          jobs: await this.movieJobPipelineService.getAllRunning(),
          requests: await this.requestsService.getAllPending(),
        },
      })),
    );
  }

  @Sse('/movies/:slug')
  async moviesPipeline(@Param('slug') slug: string) {
    return interval(2000).pipe(
      switchMap(async (_) => ({
        type: 'update',
        data: { job: await this.movieJobPipelineService.getSpecific(slug) },
      })),
    );
  }
}
