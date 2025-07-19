if (!process.env.TMDB_TOKEN_READING)
  throw new Error('Missing process.env.TMDB_TOKEN');

export const TMDB_TOKEN = process.env.TMDB_TOKEN_READING as string;
