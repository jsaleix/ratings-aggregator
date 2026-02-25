import { RatingUnit } from 'generated/prisma/enums';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DynamicConfigService } from 'src/dynamic-config/dynamic-config.service';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function ratingSources() {
  const RATING_SOURCES = {
    ROTTEN_TOMATOES: 'rotten_tomatoes',
    ROTTEN_TOMATOES_AUDIENCE: 'rotten_tomatoes_audience',
    LETTERBOXD: 'letterboxd',
    ALLOCINE_PRESS: 'allocine_press',
    ALLOCINE_AUDIENCE: 'allocine_audience',
    IMDB: 'imdb',
  } as const;
  const RATING_UNITS = {
    PERCENTAGE: 'percentage',
    STARS: 'stars', // Out of 5
    POINTS: 'points', // Out of 10
  } as const;

  const sources = [
    {
      code: RATING_SOURCES.ROTTEN_TOMATOES,
      name: 'Rotten Tomatoes (Critics)',
      country_code: 'US',
      rating_unit: RATING_UNITS.PERCENTAGE as RatingUnit,
      url: 'https://www.rottentomatoes.com',
    },
    {
      code: RATING_SOURCES.ROTTEN_TOMATOES_AUDIENCE,
      name: 'Rotten Tomatoes (Audience)',
      country_code: 'US',
      rating_unit: RATING_UNITS.PERCENTAGE as RatingUnit,
      url: 'https://www.rottentomatoes.com',
    },
    {
      code: RATING_SOURCES.LETTERBOXD,
      name: 'Letterboxd',
      country_code: 'US',
      rating_unit: RATING_UNITS.STARS as RatingUnit,
      url: 'https://letterboxd.com',
    },
    {
      code: RATING_SOURCES.ALLOCINE_PRESS,
      name: 'AlloCiné (Press)',
      country_code: 'FR',
      rating_unit: RATING_UNITS.STARS as RatingUnit,
      url: 'https://www.allocine.fr',
    },
    {
      code: RATING_SOURCES.ALLOCINE_AUDIENCE,
      name: 'AlloCiné (Audience)',
      country_code: 'FR',
      rating_unit: RATING_UNITS.STARS as RatingUnit,
      url: 'https://www.allocine.fr',
    },
    {
      code: RATING_SOURCES.IMDB,
      name: 'IMDb',
      country_code: 'US',
      rating_unit: RATING_UNITS.POINTS as RatingUnit,
      url: 'https://www.imdb.com',
    },
  ];

  try {
    for (const source of sources) {
      await prisma.rating_Source.upsert({
        where: { code: source.code },
        update: {},
        create: source,
      });
    }
    console.log('✅ Rating sources seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding rating sources:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function seedConfig() {
  await prisma.app_Config
    .create({
      data: {
        key: DynamicConfigService.MAX_REQUESTS_KEY,
        value: '50',
      },
    })
    .catch((e) => console.error('Error seeding AppConfig:', e));
}

// async function tmpMapExistingData() {
//   const sources = await prisma.rating_Source.findMany({
//     select: { id: true, code: true },
//   });

//   const sourceMap = new Map<string, string>();
//   for (const s of sources) {
//     sourceMap.set(s.code, s.id);
//   }

//   const ratings = await prisma.movie_Rating.findMany({
//     select: { id: true, rating_source_id: true },
//   });

//   const updates = ratings
//     .filter((r) => !r.rating_source_id && sourceMap.has(r.rating_source as string))
//     .map((r) =>
//       prisma.movie_Rating.update({
//         where: { id: r.id },
//         data: {
//           rating_source_id: sourceMap.get(r.rating_source as string)!,
//         },
//       }),
//     );

//   if (updates.length > 0) {
//     await prisma.$transaction(updates);
//   }

//   console.log(`✅ Backfilled ${updates.length} Movie_Rating rows`);
// }

async function main() {
  await ratingSources();
  await seedConfig();
  // await tmpMapExistingData();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
