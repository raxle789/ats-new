'use server';

import prisma from '../connection/db';

export async function getAllPositionLevelRequirement(offset, perPage) {
  try {
    const data = await prisma.positionLevels.findMany({
      skip: offset,
      take: perPage,
      include: {
        positionLevelRequirements: {
          include: {
            positionLevelRequirementFields: true,
          },
        },
      },
    });

    const total = await prisma.positionLevels.count();

    return {
      data: data,
      total: total,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      total: 0,
    };
  }
}

// export async function getUser() {
//   try {
//     const data = await prisma.users.findUnique({
//       where: {
//         id: 1,
//       },
//     });

//     return data;
//   } catch (e) {
//     console.info(e);
//   }
// }

export async function searchPositionLevelRequirement(query, offset, perPage) {
  try {
    const data = await prisma.positionLevels.findMany({
      skip: offset,
      take: perPage,
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            level: {
              contains: query,
            },
          },
        ],
      },
      include: {
        positionLevelRequirements: {
          select: {
            positionLevelRequirementFields: true,
          },
        },
      },
    });

    const total = await prisma.positionLevels.count({
      skip: offset,
      take: perPage,
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            level: {
              contains: query,
            },
          },
        ],
      },
    });

    return {
      data: data,
      total: total,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      total: 0,
    };
  }
}
