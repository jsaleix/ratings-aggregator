import { Controller, Param, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { interval, switchMap } from 'rxjs';

import { Public } from 'src/modules/auth/decorators/public.decorator';
import { MovieJobPipelineService } from 'src/modules/pipelines/services/movie-job-pipeline.service';
import { RequestsService } from 'src/modules/requests/services/requests.service';

@ApiTags('SSE')
@Controller('sse')
export class SSEController {
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
