import { Injectable } from '@nestjs/common';
import { SearchMovieQueryDto } from '../dto/search-movie-query.dto';
import { ConfigService } from '@nestjs/config';
import { TMDBGetMovieType } from '../types/tmdb';
import { EnvType } from 'src/core/configuration';

@Injectable()
export class TMDBService {
  private headers: Record<string, string>;

  constructor(configService: ConfigService<EnvType>) {
    const token = configService.get('tmdb_token');
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  async getMovieById(movieId: number): Promise<TMDBGetMovieType> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { ...this.headers },
    });
    if (!res.ok) throw new Error();
    return res.json();
  }

  private async findMovie(
    name: string,
    year?: number,
  ): Promise<TMDBGetMovieType[]> {
    let url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
    if (year) url += `&year=${year}`;

    const raw = await fetch(url, {
      method: 'GET',
      headers: { ...this.headers },
    });
    if (!raw.ok) throw new Error();
    const res = await raw.json();
    if (!res?.results || !Array.isArray(res.results)) throw new Error();
    return res.results as TMDBGetMovieType[];
  }

  async searchByName(query: SearchMovieQueryDto) {
    const { title, year } = query;
    return await this.findMovie(title, year);
  }
}
