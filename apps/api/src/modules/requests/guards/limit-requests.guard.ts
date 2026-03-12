import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MovieStatus } from 'generated/prisma/enums';

import { roles } from 'src/core/constants/auth';
import { RequestsQuotaService } from '../services/requests-quota.service';
import { MovieJobPipelineService } from 'src/modules/pipelines/services/movie-job-pipeline.service';

@Injectable()
export class LimitRequestsGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => MovieJobPipelineService))
    private movieJobPipelineService: MovieJobPipelineService,
    private requestsQuotaService: RequestsQuotaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const {
        user,
        body: { tmdbId },
      } = context.switchToHttp().getRequest();
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
      if (!tmdbId || isNaN(tmdbId)) throw new Error('Invalid tmdbId');
      if (user.role === roles.ADMIN) return true;

      const { current, max } =
        await this.requestsQuotaService.getCurrentQuota();

      if (max === null) {
        throw new UnauthorizedException('Max requests limit not set');
      }

      if (current >= max) {
        throw new UnauthorizedException('Max requests limit reached for today');
      }

      const pipelines = await this.movieJobPipelineService.getByTmdbId(tmdbId);
      if (
        pipelines?.status !== undefined &&
        (
          [
            MovieStatus.FETCHING,
            MovieStatus.RATING,
            MovieStatus.SUMMARIZING,
          ] as string[]
        ).includes(pipelines.status)
      )
        throw new UnauthorizedException(
          'This movie is already being processed',
        );
    } catch (e) {
      console.log(e.message);
      if (e instanceof UnauthorizedException) throw e;
      else throw new UnauthorizedException();
    }
    return true;
  }
}
