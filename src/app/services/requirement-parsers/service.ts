'use server';

import prisma from '../connection/db';

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
