import { Injectable } from '@nestjs/common';
import { MoviesService } from 'src/modules/movies/services/movies.service';
import { RequestsService } from 'src/modules/requests/services/requests.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class StatsService {
  constructor(
    private userService: UsersService,
    private moviesService: MoviesService,
    private requestsService: RequestsService,
  ) {}

  async getAll() {
    const [usersStats, moviesStats, requestsStats] = await Promise.all([
      this.userService.getCount(),
      this.moviesService.getCount(),
      this.requestsService.getCount(),
    ]);
    return { users: usersStats, movies: moviesStats, requests: requestsStats };
  }
}
