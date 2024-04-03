import 'server-only';

import prisma from '../connection/db';

export async function getAllPositionLevelRequirement(offset, perPage) {
  try {
    const data = await prisma.positionLevels.findMany({
      skip: offset,
      take: perPage,
      include: {
        positionLevelRequirements: {
          include: {
            requirementFields: true,
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
            requirementFields: true,
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

export async function getPositionLevelRequirement(positionLevelId) {
  try {
    const data = await prisma.positionLevels.findUnique({
      where: {
        id: positionLevelId,
      },
      include: {
        positionLevelRequirements: {
          include: {
            requirementFields: true,
          },
        },
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getAllPositionLevel() {
  try {
    const data = await prisma.positionLevels.findMany();

    const aliasedData = data.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllLineIndustry() {
  try {
    const data = await prisma.lineIndustries.findMany();

    const aliasedData = data.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllEducationLevel() {
  try {
    const data = await prisma.educationLevels.findMany();

    const aliasedData = data.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function setPositionLevelRequirement(
  positionLevelId,
  requirementFieldId,
  value,
) {
  try {
    await prisma.positionLevelRequirements.upsert({
      where: {
        AND: [
          {
            positionLevelId: positionLevelId,
          },
          {
            requirementFieldId: requirementFieldId,
          },
        ],
      },
      update: {
        value: value,
      },
      create: {
        positionLevelId: positionLevelId,
        requirementFieldId: requirementFieldId,
        value: value,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
