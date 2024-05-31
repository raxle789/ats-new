import prisma from '../connection/db';

export async function getAllPositionLevelRequirement(offset, perPage) {
  try {
    const [data, total] = await prisma.$transaction([
      prisma.positionLevels.findMany({
        skip: offset,
        take: perPage,
        orderBy: {
          level: 'desc',
        },
        include: {
          positionLevelRequirements: {
            include: {
              requirementFields: {
                include: {
                  requirementFieldParsers: true,
                },
              },
            },
          },
        },
      }),
      prisma.positionLevels.count(),
    ]);

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
    const [data, total] = await prisma.$transaction([
      prisma.positionLevels.findMany({
        skip: offset,
        take: perPage,
        orderBy: {
          level: 'desc',
        },
        where: {
          OR: [
            {
              name: {
                contains: query,
              },
            },
            {
              level: {
                equals: isNaN(query) ? -1 : Number(query),
              },
            },
          ],
        },
        include: {
          positionLevelRequirements: {
            include: {
              requirementFields: true,
            },
          },
        },
      }),
      prisma.positionLevels.count({
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
                equals: isNaN(query) ? -1 : Number(query),
              },
            },
          ],
        },
      }),
    ]);

    // const data = await prisma.positionLevels.findMany({
    //   skip: offset,
    //   take: perPage,
    //   where: {
    //     OR: [
    //       {
    //         name: {
    //           contains: query,
    //         },
    //       },
    //       {
    //         level: {
    //           equals: isNaN(query) ? -1 : Number(query),
    //         },
    //       },
    //     ],
    //   },
    //   include: {
    //     positionLevelRequirements: {
    //       include: {
    //         requirementFields: true,
    //       },
    //     },
    //   },
    // });

    // const total = await prisma.positionLevels.count({
    //   skip: offset,
    //   take: perPage,
    //   where: {
    //     OR: [
    //       {
    //         name: {
    //           contains: query,
    //         },
    //       },
    //       {
    //         level: {
    //           equals: isNaN(query) ? -1 : Number(query),
    //         },
    //       },
    //     ],
    //   },
    // });

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
            requirementFields: {
              include: {
                requirementFieldParsers: true,
              },
            },
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
    // const data = await prisma.positionLevels.findMany({
    //   orderBy: {
    //     level: 'desc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM position_levels ORDER BY level DESC`;

    // const aliasedData = data?.map((d) => ({
    //   value: d?.id,
    //   label: d?.name,
    // }));

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllLineIndustry() {
  try {
    // const data = await prisma.lineIndustries.findMany({
    //   orderBy: {
    //     name: 'asc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM line_industries ORDER BY name`;

    // const aliasedData = data?.map((d) => ({
    //   value: d?.id,
    //   label: d?.name,
    // }));

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllEducationLevel() {
  try {
    // const data = await prisma.educationLevels.findMany({
    //   orderBy: {
    //     id: 'asc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM education_levels ORDER BY id`;

    // const aliasedData = data?.map((d) => ({
    //   value: d?.id,
    //   label: d?.name,
    // }));

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function setPositionLevelRequirement(
  positionLevelId,
  requirementFieldName,
  value,
) {
  try {
    prisma.$transaction(async (tx) => {
      const requirementFieldData = await tx.requirementFields.findFirst({
        where: {
          name: requirementFieldName,
        },
      });

      await tx.positionLevelRequirements.upsert({
        where: {
          positionLevelId_requirementFieldId: {
            positionLevelId: positionLevelId,
            requirementFieldId: requirementFieldData.id,
          },
        },
        update: {
          value: value,
        },
        create: {
          positionLevelId: positionLevelId,
          requirementFieldId: requirementFieldData.id,
          value: value,
        },
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getEducationLevel(educationLevelId) {
  try {
    const data = await prisma.educationLevels.findUnique({
      where: {
        id: educationLevelId,
      },
      select: {
        name: true,
      },
    });

    return data?.name;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function getPositionLevel(positionLevelId) {
  try {
    const data = await prisma.positionLevels.findUnique({
      where: {
        id: positionLevelId,
      },
      select: {
        name: true,
      },
    });

    return data?.name;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function getLineIndustry(lineIndustryId) {
  try {
    const data = await prisma.lineIndustries.findUnique({
      where: {
        id: lineIndustryId,
      },
      select: {
        name: true,
      },
    });

    return data?.name;
  } catch (e) {
    console.log(e);

    return '';
  }
}
