import { Prisma } from 'generated/prisma/client';

export const movieSelect = {
  id: true,
  title: true,
  created_at: true,
  updated_at: true,
  tmdb_id: true,
  tag_line: true,
  summary: true,
  runtime: true,
  release_date: true,
  year: true,
  budget: true,
  poster_path: true,
  language: true,
  original_title: true,
  imdb_id: true,
  slug: true,
  Genre: true,
} satisfies Prisma.MovieSelect;

export type MovieType = Prisma.MovieGetPayload<{
  select: typeof movieSelect;
}>;
export type MovieCreateInput = Omit<Prisma.MovieCreateInput, 'slug'>;
