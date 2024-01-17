const moviesData = require('../config/moviesData.json');
const { PrismaClient } = require('@prisma/client');

const seedDatabase = async () => {
  const prisma = new PrismaClient();

  try {
    await prisma.$queryRaw`DELETE FROM Voorstelling`;
    await prisma.$queryRaw`DELETE FROM Zaal`;
    await prisma.$queryRaw`DELETE FROM Film`;
    await prisma.$queryRaw`DELETE FROM Genre`;
    await prisma.$queryRaw`DELETE FROM Cast`;

    for (const movieData of Object.values(moviesData)) {
      const genres = await Promise.all(
        movieData.genres.map(async (genreName) => {
          return prisma.genre.upsert({
            where: { naam: genreName },
            update: {},
            create: { naam: genreName },
          });
        })
      );

      const castNames = movieData.cast.map((castName) => castName.trim());
      const cast = await Promise.all(
        castNames.map(async (castName) => {
          return prisma.cast.upsert({
            where: { naam: castName },
            update: {},
            create: { naam: castName },
          });
        })
      );

      const film = await prisma.film.create({
        data: {
          titel: movieData.title,
          beschrijving: movieData.description,
          image: movieData.image,
          genres: { connect: genres.map((genre) => ({ naam: genre.naam })) },
          cast: { connect: cast.map((actor) => ({ naam: actor.naam })) },
        },
      });

      const zalen = await Promise.all([
        'Groen', 'Blauw', 'Rood', 'Geel', 'Paars'
      ].map(async (zaalNaam) => {
        const existingZaal = await prisma.zaal.findUnique({
          where: { naam: zaalNaam },
        });

        if (existingZaal) {
          return existingZaal;
        }

        return prisma.zaal.create({
          data: {
            naam: zaalNaam,
            capaciteit: 30,
          },
        });
      }));

      const startDate = new Date('2024-01-22');
      const endDate = new Date('2024-01-31');

      for (const zaal of zalen) {
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
          const middagStart = new Date(date);
          middagStart.setHours(13, 0, 0, 0);

          const avondStart = new Date(date);
          avondStart.setHours(21, 0, 0, 0);

          await prisma.voorstelling.create({
            data: {
              starttijd: middagStart,
              prijs: 10,
              datum: middagStart,
              filmId: film.id,
              zaalId: zaal.id,
            },
          });

          await prisma.voorstelling.create({
            data: {
              starttijd: avondStart,
              prijs: 10,
              datum: avondStart,
              filmId: film.id,
              zaalId: zaal.id,
            },
          });
        }
      }
    }

    console.log('Alle films succesvol geüpload');
  } catch (error) {
    console.error('Error seeding films:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
