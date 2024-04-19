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
      await prisma.$queryRaw`SELECT *, ROW_NUMBER() OVER(PARTITION BY efpk.RequestNo ORDER BY CreateDate) AS rn FROM MASTER_ERA.dbo.PROINT_trx_efpk AS efpk WHERE efpk.RequestNo = ${requestNo}`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllJobTitle() {
  try {
    const data =
      await prisma.$queryRaw`SELECT JobTtlCode AS value, JObTtlName AS label FROM MASTER_ERA.dbo.ERA_MasterJobTitle`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

// export async function getAllAliasesJobTitle() {
//   try {
//     const data = await prisma.jobTitles.findMany();

//     const aliasedData = data?.map((d) => {
//       return {
//         value: d?.id,
//         label: d?.name,
//       };
//     });

//     return aliasedData;
//   } catch (e) {
//     console.log(e);

//     return [];
//   }
// }

export async function getAllJobFunction() {
  try {
    const data = await prisma.jobFunctions.findMany();

    const aliasedData = data?.map((d) => {
      return {
        value: d?.id,
        label: d?.name,
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
    // const data =
    //   await prisma.$queryRaw`SELECT EmpTypeId AS value, EmpType AS label FROM MASTER_ERA.dbo.ERA_MasterEmploymentType;`;

    const data = await prisma.employmentStatus.findMany();

    const aliasedData = data?.map((d) => {
      return {
        value: d?.id,
        label: d?.name,
      };
    });

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllPositionLevel() {
  try {
    const data = await prisma.positionLevels.findMany();

    const aliasedData = data?.map((d) => {
      return {
        value: d?.id,
        label: d?.name,
      };
    });

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllDepartment() {
  try {
    const data =
      await prisma.$queryRaw`SELECT OrgCode AS value, OrgName AS label FROM MASTER_ERA.dbo.ERA_MasterOrganization`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllLineIndustry() {
  try {
    const data = await prisma.lineIndustries.findMany();

    const aliasedData = data?.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllRegion() {
  try {
    const data =
      await prisma.$queryRaw`SELECT LocGrpCode AS value, LocGrpName AS label FROM MASTER_ERA.dbo.ERA_MasterRegion`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllWorkLocation() {
  try {
    const data =
      await prisma.$queryRaw`SELECT LocationCode AS value, LocationName AS label FROM MASTER_ERA.dbo.ERA_MasterLocation`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllGender() {
  try {
    const data = await prisma.genders.findMany();

    const aliasedData = data?.map((d) => {
      return {
        value: d?.id,
        label: d?.name,
      };
    });

    return aliasedData;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllSkill() {
  try {
    const data = await prisma.skills.findMany();

    const aliasedData = data?.map((d) => {
      return {
        value: d?.id,
        label: d?.name,
      };
    });

    return aliasedData;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllCertificate() {
  try {
    const data = await prisma.certificates.findMany();

    const aliasedData = data?.map((d) => {
      return {
        value: d?.id,
        label: d?.name,
      };
    });

    return aliasedData;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllTa() {
  try {
    const data = await prisma.users.findMany({
      where: {
        userRoles: {
          some: {
            roles: {
              name: 'ta_non_admin',
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const aliasedData = data.map((d) => ({
      value: d?.id,
      label: d?.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return {
      data: [],
    };
  }
}

export async function getAllUser() {
  try {
    const data = await prisma.users.findMany({
      where: {
        userRoles: {
          some: {
            roles: {
              name: 'user',
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const aliasedData = data.map((d) => ({
      value: d?.id,
      label: d?.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return {
      data: [],
    };
  }
}
