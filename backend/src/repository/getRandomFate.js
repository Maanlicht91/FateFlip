import { prisma } from "../config/db.js";

const getRandomFate = async () => {
  const count = await prisma.fate.count();

  if (count === 0) {
    throw new Error("No fates found in the database.");
  }

  const randomIndex = Math.floor(Math.random() * count);

  const fate = await prisma.fate.findMany({
    skip: randomIndex,
    take: 1,
    select: {
      type: true,
      message: true,
      imageUrl: true,
    },
  });

  return fate[0];
};

export default getRandomFate;
