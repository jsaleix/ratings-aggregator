# Movie Ratings Aggregator Worker

## Stack

| Category | Technologies |
| -------- | ------------ |
| Language | TypeScript |
| Runtime | Node.js |
| Queue | BullMQ + Redis |
| Scraping | Puppeteer |
| Testing | Jest |

## Scripts available

| Command                     | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| `pnpm install`              | Install project dependencies                                        |
| `pnpm run dev`              | Start the worker in development mode using ts-node (no build step)  |
| `pnpm run start`            | Start the worker from the compiled output                           |
| `pnpm run build`            | Compile TypeScript source to JavaScript via tsc                     |
| `pnpm run test`             | Run all tests in the src/ directory                                 |
| `pnpm run test:unit`        | Run unit tests only (files matching `*.unit.test.ts`)               |
| `pnpm run test:integration` | Run integration tests only (files matching `*.integration.test.ts`) (**Requires a running redis instance otherwise it fails**)|
| `pnpm run test:watch`       | Run all tests in watch mode (re-runs on file changes)               |

