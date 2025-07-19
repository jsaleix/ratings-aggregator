import z from 'zod/v4';

const redisSchema = z.object({
  redis_host: z.string(),
  redis_port: z.string().transform((v) => +v),
  redis_password: z.string().optional(),
});

const tmdbSchema = z.object({
  tmdb_token: z.string(),
});

export type EnvType = z.infer<typeof redisSchema> & z.infer<typeof tmdbSchema>;

export default () => {
  const redisConfig = redisSchema.parse({
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    redis_password: process.env.REDIS_PASSWORD,
  });

  const tmdbConfig = tmdbSchema.parse({
    tmdb_token: process.env.TMDB_TOKEN,
  });

  return { ...redisConfig, ...tmdbConfig } as EnvType;
};
