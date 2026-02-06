import z from 'zod/v4';

// const redisSchema = z.object({
//   redis_host: z.string(),
//   redis_port: z.string().transform((v) => +v),
//   redis_password: z.string().optional(),
// });

const envSchema = z.object({
  tmdb_token: z.string(),
  jwt_secret: z.string(),
  NODE_ENV: z.string().optional(),
});

export type EnvType = z.infer<typeof envSchema>;

export default () => {
  const env = envSchema.parse({
    tmdb_token: process.env.TMDB_TOKEN,
    jwt_secret: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  });

  return { ...env } as EnvType;
};
