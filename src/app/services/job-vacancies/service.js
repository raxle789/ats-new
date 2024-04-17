'use server';

import prisma from '../connection/db';

export async function getAllEfpkByTa(taId) {
  try {
    const data = await prisma.efpkTa.findMany({
      where: {
        taId: taId,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getEfpkByRequestNo(requestNo) {
  try {
    const data =
      await prisma.$queryRaw`SELECT *, ROW_NUMBER() OVER(PARTITION BY efpk.RequestNo ORDER BY CreateDate) FROM MASTER_ERA.dbo.PROINT_trx_efpk AS efpk WHERE efpk.RequestNo = ${requestNo}`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllJobFunctions() {
  try {
    const data = await prisma.jobFunctions.findMany();

    const aliasedData = data?.map((d) => {
      return {
        value: d.id,
        label: d.name,
      };
    });

    return aliasedData;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllEmploymentStatus() {
  try {
    const data =
      await prisma.$queryRaw`SELECT EmpTypeId AS value, EmpType AS label FROM MASTER_ERA.dbo.ERA_MasterEmploymentType;`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export function getAllPositionLevel() {
  try {
    const data = prisma.positionLevels.findMany();

    const aliasedData = data.map((d) => {
      return {
        value: d.id,
        label: d.name,
      };
    });
  } catch (e) {
    console.log(e);

    return [];
  }
}
