import {
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class SummaryService {
  constructor(private prisma: PrismaService) {}

  async findOneByMovieId(id: string) {
    return await this.prisma.movie_Ratings_Summary.findFirst({
      where: { movieId: id },
    });
  }

  async remove(id: string) {
    const res = await this.prisma.movie_Ratings_Summary.delete({
      where: { id },
    });
    if (!res) {
      throw new Error('Failed to remove summary');
    }
    return res;
  }

  async refresh(_: string) {
    throw new NotImplementedException();
  }
}
