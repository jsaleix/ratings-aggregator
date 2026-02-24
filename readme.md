# Movie Ratings Aggregator

## Stack

| 🖥️ Frontend | ⚙️ Backend | 🚀 Infrastructure |
|---|---|---|
| TypeScript | TypeScript | Docker |
| React + Vite | NestJS | Coolify |
| TailwindCSS | Prisma | GitHub Actions |
| TanStack Query & Form | PostgreSQL | Husky |
| Zod | Redis | |
| Motion | BullMQ | |
| React Slick | Puppeteer | |
| Storybook | Swagger | |
| Vitest + Testing Library | Jest | |
| | Zod | |

## Getting Started

Install dependencies and set up environment variables at the root of the project:
```bash
pnpm install
cp apps/client/.env.example apps/client/.env
cp apps/api/.env.example apps/api/.env
cp apps/worker/.env.example apps/worker/.env
```

Then provide a valid **TMDB** API key in the `TMDB_TOKEN` field of both `apps/api/.env` and `apps/worker/.env`.
You also need to provide an **OPEN_ROUTER_API_KEY** API key in the worker in order to generate summaries.

Finally, start the project:
```bash
docker compose up -d --build
```

After that, you need to do the following steps:
```bash
docker compose exec api npx prisma migrate dev
docker compose exec api npm run db:seed
# or if running locally, in apps/api/
pnpm prisma migrate dev
pnpm run db:seed
```

## Documentation

| | |
|---|---|
| 📖 API | [`http://localhost:3000/documentation`](http://localhost:3000/documentation) |
| 🧩 Storybook | Run `pnpm run storybook` in `/apps/client` |

## Tests

| App | Command | Notes |
|---|---|---|
| Frontend | `pnpm run test` | |
| API | `pnpm run test` | |
| Worker | `pnpm run test:unit` | Unit tests only |
| Worker | `pnpm run test` | Requires a running Redis instance |