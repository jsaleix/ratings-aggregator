import { Prisma } from 'generated/prisma/client';

const movieModel: Prisma.MovieSelect = {
  id: true,
  title: true,
  created_at: true,
  tmdb_id: true,
  tag_line: true,
  summary: true,
  runtime: true,
  release_date: true,
  year: true,
  budget: true,
  poster_path: true,
  slug: true,
};

export type MovieType = typeof movieModel;
export type MovieCreateInput = Omit<Prisma.MovieCreateInput, "slug">;
