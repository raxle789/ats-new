'use server';

import { cache } from 'react';
import { sendEmail } from '../messages/email/service';
import { Status } from '@/status/applicant-status';
import prisma from '../connection/db';
import _ from 'lodash';
import { transpileModule } from 'typescript';

export async function getAllEfpkByTa(taId) {
  try {
    // const data = await prisma.efpkTa.findMany({
    //   where: {
    //     taId: taId,
    //   },
    //   orderBy: {
    //     efpkRequestNo: 'desc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT efpk_request_no AS value, efpk_request_no AS label FROM efpk_ta WHERE ta_id = ${taId} ORDER BY efpk_request_no DESC`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.efpkRequestNo,
    //     label: d?.efpkRequestNo,
    //   };
    // });

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getEfpkByRequestNo(requestNo) {
  try {
    const data =
      await prisma.$queryRaw`SELECT *, ROW_NUMBER() OVER(PARTITION BY efpk.RequestNo ORDER BY CreateDate) AS rn FROM MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN ATS_ERAJAYA.dbo.position_levels AS positions ON CAST(SUBSTRING(JobLvlCode, PATINDEX('%[1-9]%', efpk.JobLvlCode), 1 ) AS INT) = positions.level WHERE efpk.RequestNo = ${requestNo} ORDER BY CreateDate DESC`;

    return data[0];
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getAllJobTitle() {
  try {
    const data =
      await prisma.$queryRaw`SELECT JobTtlCode AS value, JObTtlName AS label FROM MASTER_ERA.dbo.ERA_MasterJobTitle WHERE NOT JobTtlCode = '(None)' ORDER BY JObTtlName`;

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
    // const data = await prisma.jobFunctions.findMany({
    //   orderBy: {
    //     name: 'asc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM job_functions ORDER BY name`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.id,
    //     label: d?.name,
    //   };
    // });

    return data;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllEmploymentStatus() {
  try {
    // const data =
    //   await prisma.$queryRaw`SELECT EmpTypeId AS value, EmpType AS label FROM MASTER_ERA.dbo.ERA_MasterEmploymentType ORDER BY EmpType`;

    // const data = await prisma.employmentStatus.findMany({
    //   orderBy: {
    //     name: 'asc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT name AS value, name AS label FROM employment_status ORDER BY name`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.name,
    //     label: d?.name,
    //   };
    // });

    return data;

    // return data;
  } catch (e) {
    console.log(e);

    return [];
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
      await prisma.$queryRaw`SELECT level AS value, name AS label, sla_days AS slaDays FROM position_levels ORDER BY level DESC`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.level,
    //     label: d?.name,
    //     slaDays: d?.slaDays,
    //   };
    // });

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllVertical() {
  try {
    // const data = await prisma.verticals.findMany({
    //   orderBy: {
    //     code: 'asc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT code AS value, CONCAT(name, ' (', code, ')') AS label FROM verticals ORDER BY label`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.code,
    //     label: `${d?.name} (${d?.code})`,
    //   };
    // });

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllDepartment() {
  try {
    // const data =
    //   await prisma.$queryRaw`SELECT OrgGroupCode AS value, OrgGroupName AS label FROM MASTER_ERA.dbo.ERA_MasterOrganization GROUP BY OrgGroupCode, OrgGroupName ORDER BY OrgGroupName`;

    const data = await prisma.$transaction(async (tx) => {
      const verticalData = await tx.verticals.findMany({
        orderBy: {
          code: 'asc',
        },
        select: {
          code: true,
          name: true,
        },
      });

      const aliasedData = [];

      for (const { code, name } of verticalData) {
        const newData = {
          label: `${name} (${code})`,
          title: code,
          options: [],
        };

        const departmentData =
          await tx.$queryRaw`SELECT OrgGroupCode AS value, OrgGroupName AS label FROM MASTER_ERA.dbo.ERA_MasterOrganization WHERE RTRIM(LTRIM(SUBSTRING(RTRIM(LTRIM(OrgGroupName)), 1, CHARINDEX(' ', RTRIM(LTRIM(OrgGroupName)))))) = ${code} GROUP BY OrgGroupCode, OrgGroupName ORDER BY OrgGroupName`;

        for (const { value, label } of departmentData) {
          newData.options.push({
            value: value,
            label: label,
          });
        }

        aliasedData.push(newData);
      }

      return aliasedData;
    });

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

export async function getAllRegion() {
  try {
    const data =
      await prisma.$queryRaw`SELECT LocGrpCode AS value, LocGrpName AS label FROM MASTER_ERA.dbo.ERA_MasterRegion ORDER BY LocGrpName`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllWorkLocation() {
  try {
    const data =
      await prisma.$queryRaw`SELECT LocationCode AS value, (CASE WHEN CHARINDEX('@', LocationName) > 0 THEN RTRIM(LTRIM(SUBSTRING(LocationName, CHARINDEX('@', LocationName) + 1, LEN(LocationName)))) ELSE LocationName END) AS label FROM MASTER_ERA.dbo.ERA_MasterLocation WHERE NOT LocationCode = '(None)' ORDER BY label`;

    // console.info(data);

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllGender() {
  try {
    // const data = await prisma.genders.findMany();

    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM genders ORDER BY name`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.id,
    //     label: d?.name,
    //   };
    // });

    return data;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllSkill() {
  try {
    // const data = await prisma.skills.findMany({
    //   orderBy: {
    //     name: 'asc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM skills ORDER BY name`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.id,
    //     label: d?.name,
    //   };
    // });

    return data;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllCertificate() {
  try {
    // const data = await prisma.certificates.findMany({
    //   orderBy: {
    //     name: 'asc',
    //   },
    // });

    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM certificates ORDER BY name`;

    // const aliasedData = data?.map((d) => {
    //   return {
    //     value: d?.id,
    //     label: d?.name,
    //   };
    // });

    return data;
  } catch (e) {
    console.info(e);

    return [];
  }
}

export async function getAllTa(taId) {
  try {
    const data = await prisma.users.findMany({
      where: {
        AND: [
          {
            id: {
              not: taId,
            },
          },
          {
            userRoles: {
              some: {
                roles: {
                  name: 'ta_non_admin',
                },
              },
            },
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
    });

    const aliasedData = data?.map((d) => ({
      value: d?.id,
      label: d?.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllUser(userId) {
  try {
    const data = await prisma.users.findMany({
      where: {
        AND: [
          {
            id: {
              not: userId,
            },
          },
          {
            userRoles: {
              some: {
                roles: {
                  name: 'user',
                },
              },
            },
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
    });

    const aliasedData = data?.map((d) => ({
      value: d?.id,
      label: d?.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllDepartmentByVertical(verticalCode) {
  try {
    const data =
      await prisma.$queryRaw`SELECT OrgGroupCode AS value, OrgGroupName AS label FROM MASTER_ERA.dbo.ERA_MasterOrganization WHERE RTRIM(LTRIM(SUBSTRING(RTRIM(LTRIM(OrgGroupName)), 1, CHARINDEX(' ', RTRIM(LTRIM(OrgGroupName)))))) = ${verticalCode} GROUP BY OrgGroupCode, OrgGroupName ORDER BY OrgGroupName`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function createJobVacancy(
  taId,
  {
    jobEfpk,
    jobTitle,
    jobTitleAliases,
    jobFunction,
    jobEmploymentStatus,
    jobPositionLevel,
    jobVertical,
    jobDepartment,
    jobLineIndustry,
    jobRegion,
    jobWorkLocation,
    jobWorkLocationAddress,
    jobPublishedDateAndExpiredDate,
    jobDescription,
    jobRequirement,
    ageParameterCheckbox,
    age,
    genderParameterCheckbox,
    gender,
    special_skillParameterCheckbox,
    special_skill,
    certificationParameterCheckbox,
    certification,
    jobVideoInterview,
    jobAutoAssessment,
    jobConfidential,
    jobCareerFest,
    jobTaCollaborator,
    jobUserCollaborator,
  },
) {
  try {
    const data = prisma.$transaction(async (tx) => {
      const { id } = await tx.jobVacancies.create({
        data: {
          jobTitleAliases: jobTitleAliases,
          workLocationAddress: jobWorkLocationAddress,
          publishedDate: jobPublishedDateAndExpiredDate[0],
          expiredDate: jobPublishedDateAndExpiredDate[1],
          jobDescription: jobDescription,
          jobRequirement: jobRequirement,
          isVideoInterview: jobVideoInterview,
          isAutoAssessment: jobAutoAssessment,
          isConfidential: jobConfidential,
          isCareerFest: jobCareerFest,
          taId: taId,
          jobTitleCode: jobTitle,
          jobFunctionId: jobFunction,
          employmentStatusName: jobEmploymentStatus,
          positionLevel: jobPositionLevel,
          verticalCode: jobVertical,
          organizationGroupCode: jobDepartment,
          locationGroupCode: jobRegion,
          locationCode: jobWorkLocation,
        },
      });

      await tx.efpkJobVacancies.create({
        data: {
          efpkRequestNo: jobEfpk,
          jobVacancyId: id,
        },
      });

      await tx.jobVacancyLineIndustries.createMany({
        data: jobLineIndustry.map((lineIndustryId) => {
          return {
            jobVacancyId: id,
            lineIndustryId: lineIndustryId,
          };
        }),
      });

      if (ageParameterCheckbox) {
        const ageRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'age',
          },
        });

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: ageRequirementFieldData.id,
            value: age === '1' ? null : age,
          },
        });
      } else if (!ageParameterCheckbox) {
        const ageRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'age',
          },
        });

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: ageRequirementFieldData.id,
            value: null,
          },
        });
      }

      if (genderParameterCheckbox) {
        const genderRequirementFieldData = await tx.requirementFields.findFirst(
          {
            where: {
              name: 'gender',
            },
          },
        );

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: genderRequirementFieldData.id,
            value: gender === '0' ? null : gender,
          },
        });
      } else if (!genderParameterCheckbox) {
        const genderRequirementFieldData = await tx.requirementFields.findFirst(
          {
            where: {
              name: 'gender',
            },
          },
        );

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: genderRequirementFieldData.id,
            value: null,
          },
        });
      }

      if (special_skillParameterCheckbox) {
        const newSkillParameter = await Promise.all(
          special_skill.map(async (skillId) => {
            if (typeof skillId === 'string') {
              const data = await tx.skills.create({
                data: {
                  name: skillId,
                },
              });

              return data.id;
            } else {
              return skillId;
            }
          }),
        );

        const skillRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'special_skill',
          },
        });

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: skillRequirementFieldData.id,
            value: newSkillParameter.length
              ? JSON.stringify(newSkillParameter)
              : null,
          },
        });
      } else if (!special_skillParameterCheckbox) {
        const skillRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'special_skill',
          },
        });

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: skillRequirementFieldData.id,
            value: null,
          },
        });
      }

      if (certificationParameterCheckbox) {
        const newCertificateParameter = await Promise.all(
          certification.map(async (certificateId) => {
            if (typeof certificateId === 'string') {
              const data = await tx.certificates.create({
                data: {
                  name: certificateId,
                },
              });

              return data.id;
            } else {
              return certificateId;
            }
          }),
        );

        const certificateRequirementFieldData =
          await tx.requirementFields.findFirst({
            where: {
              name: 'certification',
            },
          });

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: certificateRequirementFieldData.id,
            value: newCertificateParameter.length
              ? JSON.stringify(newCertificateParameter)
              : null,
          },
        });
      } else if (!certificationParameterCheckbox) {
        const certificateRequirementFieldData =
          await tx.requirementFields.findFirst({
            where: {
              name: 'certification',
            },
          });

        await tx.jobVacancyRequirements.create({
          data: {
            jobVacancyId: id,
            requirementFieldId: certificateRequirementFieldData.id,
            value: null,
          },
        });
      }

      await tx.jobVacancyTaCollaborators.createMany({
        data: jobTaCollaborator.map((taId) => {
          return {
            jobVacancyId: id,
            taId: taId,
          };
        }),
      });

      await tx.jobVacancyUserCollaborators.createMany({
        data: jobUserCollaborator.map((userId) => {
          return {
            jobVacancyId: id,
            userId: userId,
          };
        }),
      });

      return id;
    });

    return data;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function getJobVacancy(jobVacancyId) {
  try {
    const data = await prisma.jobVacancies.findUnique({
      where: {
        id: jobVacancyId,
      },
      include: {
        efpkJobVacancies: {
          select: {
            efpkRequestNo: true,
          },
        },
        ta: {
          select: {
            name: true,
          },
        },
        jobFunctions: {
          select: {
            id: true,
            name: true,
          },
        },
        employmentStatus: {
          select: {
            name: true,
          },
        },
        positionLevels: {
          select: {
            level: true,
            name: true,
          },
        },
        verticals: {
          select: {
            code: true,
            name: true,
          },
        },
        jobVacancyLineIndustries: {
          select: {
            lineIndustryId: true,
          },
        },
        jobVacancyRequirements: {
          select: {
            requirementFields: {
              select: {
                name: true,
                requirementFieldParsers: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            value: true,
          },
        },
        jobVacancyTaCollaborators: {
          select: {
            taId: true,
          },
        },
        jobVacancyUserCollaborators: {
          select: {
            userId: true,
          },
        },
      },
    });

    // console.info(data);

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getAllJobVacancy(offset, perPage) {
  try {
    // const prisma2 = new PrismaClient().$extends({
    //   result: {
    //     jobVacancies: {
    //       jobTitleName: {
    //         needs: { jobTitleCode: true },
    //         compute(jobVacancies) {
    //           return async () => {
    //             'use server';
    //             return await getJobTitleByCode(jobVacancies.jobTitleCode);
    //           };
    //         },
    //       },
    //       departmentName: {
    //         needs: { organizationGroupCode: true },
    //         compute(jobVacancies) {
    //           return async () => {
    //             'use server';
    //             return await getDepartmentByOrganizationGroupCode(
    //               jobVacancies.organizationGroupCode,
    //             );
    //           };
    //         },
    //       },
    //       status: {
    //         needs: { expiredDate: true },
    //         compute(jobVacancies) {
    //           return moment(jobVacancies.expiredDate).isSameOrBefore(moment());
    //         },
    //       },
    //       sla: {
    //         needs: {
    //           efpkJobVacancies: { efpkRequestNo: true },
    //           positionLevels: { slaDays: true },
    //         },
    //         compute(jobVacancies) {
    //           return async () => {
    //             'use server';

    //             const lastApprovalDate = await getLastEfpkApprovalByRequestNo(
    //               jobVacancies.efpkJobVacancies.efpkRequestNo,
    //             );

    //             const sla = moment(lastApprovalDate).add(
    //               jobVacancies.positionLevels.slaDays,
    //               'days',
    //             );

    //             const different = sla.diff(lastApprovalDate, 'days');

    //             return different < 0 ? 0 : different;
    //           };
    //         },
    //       },
    //       initiatorName: {
    //         needs: { efpkJobVacancies: { efpkRequestNo: true } },
    //         compute(jobVacancies) {
    //           return async () => {
    //             'use server';

    //             const efpkData = await getEfpkByRequestNo(
    //               jobVacancies.efpkJobVacancies.efpkRequestNo,
    //             );

    //             const initiatorName = efpkData.InitiatorName;

    //             return initiatorName;
    //           };
    //         },
    //       },
    //       taName: {
    //         needs: { ta: true },
    //         compute(jobVacancies) {
    //           return jobVacancies.ta.name;
    //         },
    //       },
    //       isEfpk: {
    //         needs: { efpkJobVacancies: true },
    //         compute(jobVacancies) {
    //           return jobVacancies.efpkJobVacancies.length > 0;
    //         },
    //       },
    //     },
    //   },
    // });

    // const data = await prisma2.jobVacancies.findMany();

    const [data, total] = await prisma.$transaction([
      prisma.jobVacancies.findMany({
        skip: offset,
        take: perPage,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          jobTitleCode: true,
          jobTitleAliases: true,
          organizationGroupCode: true,
          locationCode: true,
          publishedDate: true,
          expiredDate: true,
          candidateStates: true,
          efpkJobVacancies: {
            select: {
              efpkRequestNo: true,
            },
          },
          ta: {
            select: {
              name: true,
            },
          },
          positionLevels: {
            select: {
              name: true,
              slaDays: true,
            },
          },
          jobFunctions: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.jobVacancies.count(),
    ]);

    // await prisma.jobVacancies.findMany({
    //   include: {
    //     ta: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //     efpkJobVacancies: {
    //       select: {
    //         efpkRequestNo: true,
    //       },
    //     },
    //     jobFunctions: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //     positionLevels: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //     jobVacancyLineIndustries: {
    //       select: {
    //         lineIndustryId: true,
    //       },
    //     },
    //     jobVacancyRequirements: {
    //       select: {
    //         requirementFields: {
    //           select: {
    //             name: true,
    //           },
    //         },
    //         value: true,
    //       },
    //     },
    //     jobVacancyTaCollaborators: {
    //       select: {
    //         taId: true,
    //       },
    //     },
    //     jobVacancyUserCollaborators: {
    //       select: {
    //         userId: true,
    //       },
    //     },
    //     candidateStates: true,
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

export async function getJobTitleByCode(jobTitleCode) {
  try {
    const [data] =
      await prisma.$queryRaw`SELECT JObTtlName FROM MASTER_ERA.dbo.ERA_MasterJobTitle WHERE JobTtlCode = ${jobTitleCode}`;

    return data?.JObTtlName;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function getDepartmentByOrganizationGroupCode(
  organizationGroupCode,
) {
  try {
    const [data] =
      await prisma.$queryRaw`SELECT OrgGroupCode, OrgGroupName FROM MASTER_ERA.dbo.ERA_MasterOrganization WHERE OrgGroupCode = ${organizationGroupCode} GROUP BY OrgGroupCode, OrgGroupName`;

    return data?.OrgGroupName;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function getWorkLocationByLocationCode(locationCode) {
  try {
    const [data] =
      await prisma.$queryRaw`SELECT LocationName FROM MASTER_ERA.dbo.ERA_MasterLocation WHERE LocationCode = ${locationCode}`;

    return data?.LocationName;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function getLastEfpkApprovalByRequestNo(requestNo) {
  try {
    const [data] =
      await prisma.$queryRaw`SELECT COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1) AS approvalDate FROM MASTER_ERA.dbo.PROINT_trx_efpk AS efpk WHERE efpk.RequestNo = ${requestNo}`;

    return data?.approvalDate;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function getEfpkInitiatorNameByRequestNo(requestNo) {
  try {
    const [data] =
      await prisma.$queryRaw`SELECT InitiatorName FROM MASTER_ERA.dbo.PROINT_trx_efpk WHERE RequestNo = ${requestNo}`;

    return data?.InitiatorName;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function editJobVacancy(
  taId,
  jobVacancyId,
  {
    jobEfpk,
    jobTitle,
    jobTitleAliases,
    jobFunction,
    jobEmploymentStatus,
    jobPositionLevel,
    jobVertical,
    jobDepartment,
    jobLineIndustry,
    jobRegion,
    jobWorkLocation,
    jobWorkLocationAddress,
    jobPublishedDateAndExpiredDate,
    jobDescription,
    jobRequirement,
    ageParameterCheckbox,
    age,
    genderParameterCheckbox,
    gender,
    special_skillParameterCheckbox,
    special_skill,
    certificationParameterCheckbox,
    certification,
    jobVideoInterview,
    jobAutoAssessment,
    jobConfidential,
    jobCareerFest,
    jobTaCollaborator,
    jobUserCollaborator,
  },
) {
  try {
    const data = prisma.$transaction(async (tx) => {
      const { id } = await tx.jobVacancies.update({
        where: {
          id: jobVacancyId,
        },
        data: {
          jobTitleAliases: jobTitleAliases,
          workLocationAddress: jobWorkLocationAddress,
          publishedDate: jobPublishedDateAndExpiredDate[0],
          expiredDate: jobPublishedDateAndExpiredDate[1],
          jobDescription: jobDescription,
          jobRequirement: jobRequirement,
          isVideoInterview: jobVideoInterview,
          isAutoAssessment: jobAutoAssessment,
          isConfidential: jobConfidential,
          isCareerFest: jobCareerFest,
          taId: taId,
          jobTitleCode: jobTitle,
          jobFunctionId: jobFunction,
          employmentStatusName: jobEmploymentStatus,
          positionLevel: jobPositionLevel,
          verticalCode: jobVertical,
          organizationGroupCode: jobDepartment,
          locationGroupCode: jobRegion,
          locationCode: jobWorkLocation,
        },
      });

      await tx.efpkJobVacancies.deleteMany({
        where: {
          jobVacancyId: id,
        },
      });

      await tx.efpkJobVacancies.create({
        data: {
          jobVacancyId: id,
          efpkRequestNo: jobEfpk,
        },
      });

      await tx.jobVacancyLineIndustries.deleteMany({
        where: {
          jobVacancyId: id,
        },
      });

      await tx.jobVacancyLineIndustries.createMany({
        data: jobLineIndustry.map((lineIndustryId) => {
          return {
            jobVacancyId: id,
            lineIndustryId: lineIndustryId,
          };
        }),
      });

      if (ageParameterCheckbox) {
        const ageRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'age',
          },
        });

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: ageRequirementFieldData.id,
            },
          },
          data: {
            value: age === '1' ? null : age,
          },
        });
      } else if (!ageParameterCheckbox) {
        const ageRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'age',
          },
        });

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: ageRequirementFieldData.id,
            },
          },
          data: {
            value: null,
          },
        });
      }

      if (genderParameterCheckbox) {
        const genderRequirementFieldData = await tx.requirementFields.findFirst(
          {
            where: {
              name: 'gender',
            },
          },
        );

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: genderRequirementFieldData.id,
            },
          },
          data: {
            value: gender === '0' ? null : gender,
          },
        });
      } else if (!genderParameterCheckbox) {
        const genderRequirementFieldData = await tx.requirementFields.findFirst(
          {
            where: {
              name: 'gender',
            },
          },
        );

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: genderRequirementFieldData.id,
            },
          },
          data: {
            value: null,
          },
        });
      }

      if (special_skillParameterCheckbox) {
        const newSkillParameter = await Promise.all(
          special_skill.map(async (skillId) => {
            if (typeof skillId === 'string') {
              const data = await tx.skills.create({
                data: {
                  name: skillId,
                },
              });

              return data.id;
            } else {
              return skillId;
            }
          }),
        );

        const skillRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'special_skill',
          },
        });

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: skillRequirementFieldData.id,
            },
          },
          data: {
            value: newSkillParameter?.length
              ? JSON.stringify(newSkillParameter)
              : null,
          },
        });
      } else if (!special_skillParameterCheckbox) {
        const skillRequirementFieldData = await tx.requirementFields.findFirst({
          where: {
            name: 'special_skill',
          },
        });

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: skillRequirementFieldData.id,
            },
          },
          data: {
            value: null,
          },
        });
      }

      if (certificationParameterCheckbox) {
        const newCertificateParameter = await Promise.all(
          certification.map(async (certificateId) => {
            if (typeof certificateId === 'string') {
              const data = await tx.certificates.create({
                data: {
                  name: certificateId,
                },
              });

              return data.id;
            } else {
              return certificateId;
            }
          }),
        );

        const certificateRequirementFieldData =
          await tx.requirementFields.findFirst({
            where: {
              name: 'certification',
            },
          });

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: certificateRequirementFieldData.id,
            },
          },
          data: {
            value: newCertificateParameter?.length
              ? JSON.stringify(newCertificateParameter)
              : null,
          },
        });
      } else if (!certificationParameterCheckbox) {
        const certificateRequirementFieldData =
          await tx.requirementFields.findFirst({
            where: {
              name: 'certification',
            },
          });

        await tx.jobVacancyRequirements.update({
          where: {
            jobVacancyId_requirementFieldId: {
              jobVacancyId: id,
              requirementFieldId: certificateRequirementFieldData.id,
            },
          },
          data: {
            value: null,
          },
        });
      }

      await tx.jobVacancyTaCollaborators.deleteMany({
        where: {
          jobVacancyId: id,
        },
      });

      await tx.jobVacancyTaCollaborators.createMany({
        data: jobTaCollaborator.map((taId) => {
          return {
            jobVacancyId: id,
            taId: taId,
          };
        }),
      });

      await tx.jobVacancyUserCollaborators.deleteMany({
        where: {
          jobVacancyId: id,
        },
      });

      await tx.jobVacancyUserCollaborators.createMany({
        data: jobUserCollaborator.map((userId) => {
          return {
            jobVacancyId: id,
            userId: userId,
          };
        }),
      });

      return id;
    });

    return data;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function applyJobVacancy(
  candidateId,
  jobVacancyId,
  stateName = 'WAITING',
) {
  try {
    // console.info(candidateId);

    // console.info(jobVacancyId);

    const data = await prisma.candidateStates.create({
      data: {
        candidateId: candidateId,
        jobVacancyId: jobVacancyId,
        stateName: stateName,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function candidateAlreadyApplyJobVacancy(
  candidateId,
  jobVacancyId,
) {
  try {
    const total = await prisma.candidateStates.count({
      where: {
        AND: [
          {
            candidateId: candidateId,
          },
          {
            jobVacancyId: jobVacancyId,
          },
        ],
      },
    });

    return total;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function deleteJobVacancy(jobVacancyId) {
  try {
    const data = await prisma.jobVacancies.delete({
      where: {
        id: jobVacancyId,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getAllApplicantByJobVacancyId(
  jobVacancyId,
  offset,
  perPage,
) {
  try {
    const [data, total] = await prisma.$transaction([
      prisma.candidateStates.findMany({
        skip: offset,
        take: perPage,
        where: {
          jobVacancyId: jobVacancyId,
        },
        include: {
          states: true,
          candidates: {
            include: {
              users: true,
              documents: {
                select: {
                  file_base: true,
                  document_types: {
                    select: {
                      document_name: true,
                    },
                  },
                },
              },
              working_experiences: true,
              educations: true,
              candidate_skills: {
                select: {
                  skills: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      prisma.candidateStates.count({
        where: {
          jobVacancyId: jobVacancyId,
        },
      }),
    ]);

    // const documents = await prisma.documents.findMany({
    //   where: {
    //     candidate_id: 6,
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

export async function getAllApplicantByJobVacancyIdAndStateName(
  jobVacancyId,
  stateName,
  offset,
  perPage,
) {
  try {
    const [data, total] = await prisma.$transaction([
      prisma.candidateStates.findMany({
        skip: offset,
        take: perPage,
        where: {
          AND: [{ jobVacancyId: jobVacancyId }, { stateName: stateName }],
        },
        include: {
          states: true,
          candidates: {
            include: {
              users: true,
              documents: {
                select: {
                  file_base: true,
                  document_types: {
                    select: {
                      document_name: true,
                    },
                  },
                },
              },
              working_experiences: true,
              candidate_skills: {
                select: {
                  skills: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          jobVacancies: {
            select: {
              jobTitleCode: true,
              jobTitleAliases: true,
              positionLevels: {
                select: {
                  name: true,
                  level: true,
                },
              },
            },
          },
          candidateStateAssessments: true,
        },
      }),
      prisma.candidateStates.count({
        where: {
          AND: [{ jobVacancyId: jobVacancyId }, { stateName: stateName }],
        },
      }),
    ]);

    // console.info(data[0].candidates.candidate_skills[0].skills.name);

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

export async function getAllApplicantTotalByJobVacancyId(jobVacancyId) {
  try {
    const total = await prisma.candidateStates.count({
      where: {
        jobVacancyId: jobVacancyId,
      },
    });

    return total;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function getAllApplicantTotalByJobVacancyIdAndStateName(
  jobVacancyId,
  stateName,
) {
  try {
    const total = await prisma.candidateStates.count({
      where: {
        AND: [{ jobVacancyId: jobVacancyId }, { stateName: stateName }],
      },
    });

    return total;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function assignApplicant(candidateId, jobVacancyId, stateName) {
  try {
    const data = prisma.$transaction(async (tx) => {
      const candidateState = await tx.candidateStates.findFirst({
        where: {
          AND: [
            {
              candidateId: candidateId,
            },
            {
              jobVacancyId: jobVacancyId,
            },
          ],
        },
      });

      if (candidateState && !_.isEmpty(candidateState)) {
        const data = await tx.candidateStates.update({
          where: {
            id: candidateState.id,
          },
          data: {
            stateName: stateName,
          },
        });

        return data;
      }

      return {};
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getApplicantAndJobVacancyByCandidateIdAndJobVacancyId(
  candidateId,
  jobVacancyId,
) {
  try {
    const data = prisma.$transaction(async (tx) => {
      const candidateAlreadyApply = await candidateAlreadyApplyJobVacancy(
        candidateId,
        jobVacancyId,
      );

      if (candidateAlreadyApply) {
        const candidate = await tx.candidates.findUnique({
          where: {
            id: candidateId,
          },
          include: {
            users: true,
            addresses: true,
            educations: true,
            candidateStates: {
              select: {
                candidateStateAssessments: true,
              },
            },
          },
        });

        const jobVacancy = await tx.jobVacancies.findUnique({
          where: {
            id: jobVacancyId,
          },
          include: {
            jobFunctions: true,
            positionLevels: true,
          },
        });

        return {
          candidate: candidate,
          jobVacancy: jobVacancy,
        };
      }

      return {
        candidate: {},
        jobVacancy: {},
      };
    });

    return data;
  } catch (e) {
    console.log(e);

    return {
      candidate: {},
      jobVacancy: {},
    };
  }
}

export async function getToken() {
  const url = process.env.ASSESSMENT_ENDPOINT_URL;

  const secretKey = process.env.ASSESSMENT_SECRET_KEY;

  if (!url || !secretKey) {
    return {};
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: secretKey,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return {};
    }

    const token = await res.json();

    return token?.token;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function requestAssessment(
  handleType: 'register' | 'detail',
  data = new FormData(),
  parameter = '',
) {
  switch (handleType) {
    case 'register':
      return await (async () => {
        const url = process.env.ASSESSMENT_ENDPOINT_URL;

        const secretKey = process.env.ASSESSMENT_SECRET_KEY;

        if (!url || !secretKey) {
          return {};
        }

        try {
          const res2 = await fetch(`${url}/register`, {
            method: 'POST',
            headers: {
              Authorization: secretKey,
            },
            body: data,
            cache: 'no-store',
          });

          // console.info(res2);

          if (!res2.ok) {
            return {};
          }

          const registerData = await res2.json();

          return registerData;
        } catch (e) {
          console.log(e);

          return {};
        }
      })();
    case 'detail':
      return await (async () => {
        const url = process.env.ASSESSMENT_ENDPOINT_URL;

        const secretKey = process.env.ASSESSMENT_SECRET_KEY;

        if (!url || !secretKey || !parameter) {
          return {};
        }

        try {
          const res2 = await fetch(`${url}/candidates/${parameter}`, {
            method: 'GET',
            headers: {
              Authorization: secretKey,
            },
            cache: 'no-store',
          });

          // console.info(res2);

          if (!res2.ok) {
            return {};
          }

          const candidateData = await res2.json();

          return candidateData;
        } catch (e) {
          console.log(e);

          return {};
        }
      })();
    default:
      return {};
  }
}

export async function createAssessment(
  candidateId,
  jobVacancyId,
  remoteId,
  finalResult,
  startDate,
  finishDate,
) {
  try {
    const data = prisma.$transaction(async (tx) => {
      // const candidateStateAssessment = await tx.candidateStateAssessments.count(
      //   {
      //     where: {
      //       remoteId: remoteId,
      //     },
      //   },
      // );

      // if (candidateStateAssessment) {
      //   const data = await tx.candidateStateAssessments.update({
      //     where: {
      //       remoteId: remoteId,
      //     },
      //     data: {
      //       finalResult: finalResult,
      //       startedAt: startDate,
      //       finishedAt: finishDate,
      //     },
      //   });

      //   return data;
      // }

      const candidateState = await tx.candidateStates.findFirst({
        where: {
          AND: [
            {
              candidateId: candidateId,
            },
            {
              jobVacancyId: jobVacancyId,
            },
          ],
        },
      });

      if (candidateState && !_.isEmpty(candidateState)) {
        const data = await tx.candidateStateAssessments.upsert({
          where: {
            candidateStateId: candidateState.id,
          },
          update: {
            remoteId: remoteId,
            finalResult: finalResult,
            startedAt: startDate,
            finishedAt: finishDate,
            candidateStateId: candidateState.id,
          },
          create: {
            remoteId: remoteId,
            finalResult: finalResult,
            startedAt: startDate,
            finishedAt: finishDate,
            candidateStateId: candidateState.id,
          },
        });

        if (data && !_.isEmpty(data)) {
          const changeCandidateState = await assignApplicant(
            candidateId,
            jobVacancyId,
            Status.ASSESSMENT,
          );

          if (changeCandidateState && !_.isEmpty(changeCandidateState)) {
            return data;
          }

          return {};
        }

        return {};
      }

      return {};
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getAllInterviewType() {
  try {
    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM types ORDER BY name`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllInterviewer() {
  try {
    const data =
      await prisma.$queryRaw`SELECT EmpNIK AS value, CONCAT(EmpName, ' (', EmpNIK, ') (', JobLvlName, ')') AS label FROM MASTER_ERA.dbo.ERA_MasterEmployeeAttr ORDER BY EmpName`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllInterviewMessageTemplate() {
  try {
    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label, message AS message FROM email_templates ORDER BY name`;

    // console.info(data[3]);

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllInterviewPlace() {
  try {
    const data =
      await prisma.$queryRaw`SELECT id AS value, name AS label FROM places ORDER BY name`;

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function createInterview(
  candidateId,
  jobVacancyId,
  { title, dateTime, meetingLink, type, interviewers, message, place },
) {
  try {
    const data = prisma.$transaction(async (tx) => {
      const candidateState = await tx.candidateStates.findFirst({
        where: {
          AND: [
            {
              candidateId: candidateId,
            },
            {
              jobVacancyId: jobVacancyId,
            },
          ],
        },
        include: {
          candidates: {
            select: {
              users: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (candidateState && !_.isEmpty(candidateState)) {
        const interviewData = await tx.interviews.create({
          data: {
            title: title,
            dateTime: dateTime,
            meetingLink: meetingLink ? meetingLink : null,
            message: message,
            typeId: type,
            placeId: place ? place : null,
            candidateStateId: candidateState.id,
          },
        });

        if (interviewData && !_.isEmpty(interviewData)) {
          // console.info(interviewData);

          // console.info(interviewers);

          // const interviewInterviewersData = await (async () => {
          //   let count = 0;

          //   if (interviewers && interviewers.length) {
          //     for (let i = 0; i < interviewers?.length; i++) {
          //       const data = await tx.interviewInterviewers.create({
          //         data: {
          //           interviewId: interviewData.id,
          //           interviewerNIK: interviewers[i],
          //         },
          //       });

          //       if (data && !_.isEmpty(data)) {
          //         count++;
          //       }
          //     }
          //   }

          //   return count;
          // })();

          const interviewInterviewersData =
            await tx.interviewInterviewers.createMany({
              data: interviewers.map((nik) => {
                return {
                  interviewId: interviewData.id,
                  interviewerNIK: nik,
                };
              }),
            });

          if (interviewInterviewersData) {
            return {
              ...candidateState,
              interviewId: interviewData.id,
              interviewers: interviewers,
              message: message,
            };

            // const candidateStateInterviewData =
            //   await tx.candidateStateInterviews.create({
            //     data: {
            //       candidateStateId: candidateState.id,
            //       interviewId: interviewData.id,
            //     },
            //   });

            // if (
            //   candidateStateInterviewData &&
            //   !_.isEmpty(candidateStateInterviewData)
            // ) {
            //   return {
            //     ...candidateState,
            //     interviewId: interviewData.id,
            //     interviewers: interviewers,
            //     message: message,
            //   };

            //   // const emailResponse = await (async () => {
            //   //   const response = [];

            //   //   const candidateEmailResponse = await sendEmail(
            //   //     candidateState?.candidates?.users?.email,
            //   //     'Interview Invitation',
            //   //     message,
            //   //   );

            //   //   response.push({
            //   //     ...candidateEmailResponse,
            //   //     role: 'candidate',
            //   //     name: candidateState?.candidates?.users?.name,
            //   //     email: candidateState?.candidates?.users?.email,
            //   //   });

            //   //   await Promise.all(
            //   //     interviewers.map(async (nik) => {
            //   //       const interviewerEmail =
            //   //         await getInterviewerEmailByNik(nik);

            //   //       const interviewerEmailResponse = await sendEmail(
            //   //         interviewerEmail,
            //   //         'Interview Invitation',
            //   //         "<p>You've been invited to an interview.</p>",
            //   //       );

            //   //       response.push({
            //   //         ...interviewerEmailResponse,
            //   //         role: 'interviewer',
            //   //         name: await getInterviewerNameByNik(nik),
            //   //         email: interviewerEmail,
            //   //       });
            //   //     }),
            //   //   );

            //   //   return response;
            //   // })();

            //   // return emailResponse;
            // }

            // return {};
          }

          return {};
        }

        return {};
      }

      return {};
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getInterviewByCandidateStateId(candidateStateId) {
  try {
    const data = prisma.$transaction(async (tx) => {
      const interviewData =
        await tx.$queryRaw`SELECT id AS value, title AS label, date_time AS dateTime, is_email_sent AS isEmailSent FROM interviews WHERE candidate_state_id = ${candidateStateId}`;

      if (interviewData && interviewData?.length) {
        const interviewDetailData = await Promise.all(
          interviewData?.map(async (interview) => {
            const data = {
              ...interview,
              interviewers:
                await tx.$queryRaw`SELECT employee.EmpNIK AS interviewerNik, employee.EmpName AS interviewerName, irs.name AS interviewResult, ii.is_email_sent AS isEmailSent FROM (((interview_interviewers AS ii LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON ii.interviewer_nik = employee.EmpNIK) LEFT JOIN interview_results AS ir ON ii.interview_result_id = ir.id)LEFT JOIN interview_result_status AS irs ON ir.statusName = irs.name) WHERE ii.interview_id = ${interview.value} ORDER BY employee.EmpName ASC`,
            };

            return data;
          }),
        );

        return interviewDetailData;
      }

      return [];
    });

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getInterviewerEmailByNik(nik) {
  try {
    const data =
      await prisma.$queryRaw`SELECT TOP (1) Email AS email FROM MASTER_ERA.dbo.ERA_MasterEmployeeEmail WHERE EmpNIK = ${nik}`;

    if (data?.length) {
      return data[0]?.email;
    }

    return '';
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function getInterviewerNameByNik(nik) {
  try {
    const data =
      await prisma.$queryRaw`SELECT TOP (1) EmpName AS name FROM MASTER_ERA.dbo.ERA_MasterEmployeeAttr WHERE EmpNIK = ${nik}`;

    if (data?.length) {
      return data[0]?.name;
    }

    return '';
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function updateInterview(interviewId, isEmailSent) {
  try {
    const data = await prisma.interviews.update({
      where: {
        id: interviewId,
      },
      data: {
        isEmailSent: isEmailSent,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function updateInterviewInterviewer(
  interviewId,
  interviewerNik,
  isEmailSent,
) {
  try {
    const data = await prisma.interviewInterviewers.update({
      where: {
        interviewId_interviewerNIK: {
          interviewId: interviewId,
          interviewerNIK: interviewerNik,
        },
      },
      data: {
        isEmailSent: isEmailSent,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getInterviewById(interviewId) {
  try {
    const data = await prisma.interviews.findUnique({
      where: {
        id: interviewId,
      },
      include: {
        candidateStates: {
          select: {
            candidates: {
              select: {
                users: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        interviewInterviewers: true,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getApplicantByCandidateId(candidateId, jobVacancyId) {
  try {
    const data = await prisma.candidates.findUnique({
      where: {
        id: candidateId,
      },
      include: {
        users: true,
        educations: true,
        working_experiences: true,
        sources: {
          select: {
            name: true,
          },
        },
        candidateStates: {
          where: {
            candidateId: candidateId,
            jobVacancyId: jobVacancyId,
          },
          select: {
            candidateStateAssessments: true,
            interviews: {
              select: {
                title: true,
                dateTime: true,
                interviewInterviewers: {
                  select: {
                    interviewerNIK: true,
                    interviewResults: {
                      select: {
                        statusName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        documents: {
          select: {
            file_base: true,
            document_types: {
              select: {
                document_name: true,
              },
            },
          },
        },
      },
    });

    // console.info(data);

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function getAllInterviewResultCategory(interviewResultId) {
  try {
    const data = await (async () => {
      if (interviewResultId) {
        return await prisma.categories.findMany({
          select: {
            name: true,
            description: true,
            interviewResultCategories: {
              where: {
                interviewResultId: interviewResultId,
              },
            },
          },
        });
      } else {
        return await prisma.categories.findMany({
          select: {
            name: true,
            description: true,
          },
        });
      }
    })();

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllInterviewResultStatus() {
  try {
    const data = await prisma.interviewResultStatus.findMany({
      select: {
        id: true,
        name: true,
        isComment: true,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function userAlreadyFilledInterviewResult(
  interviewId,
  interviewerNik,
) {
  try {
    const data = await prisma.interviewInterviewers.findUnique({
      where: {
        interviewId_interviewerNIK: {
          interviewId: interviewId,
          interviewerNIK: interviewerNik,
        },
      },
      select: {
        interviewResultId: true,
      },
    });

    return data?.interviewResultId;
  } catch (e) {
    console.log(e);

    return null;
  }
}

export async function createInterviewResult({ mainData, categoryData }) {
  try {
    // console.info(mainData);

    const data = prisma.$transaction(async (tx) => {
      const interviewResultData = await tx.interviewResults.create({
        data: {
          statusName: mainData.status,
          reason: mainData.reason ? mainData.reason : null,
          rescheduler: mainData.rescheduler.rescheduler
            ? mainData.rescheduler.rescheduler
            : null,
          candidateReschedulerId: mainData.rescheduler.candidateReschedulerId
            ? mainData.rescheduler.candidateReschedulerId
            : null,
          userReschedulerNIK: mainData.rescheduler.userReschedulerNik
            ? mainData.rescheduler.userReschedulerNik
            : null,
          interviewResultCategories: {
            createMany: {
              data: categoryData.map((item) => {
                return {
                  categoryName: item.categoryName,
                  score: item.score,
                  comment: item.comment ? item.comment : null,
                };
              }),
            },
          },
        },
      });

      if (interviewResultData && !_.isEmpty(interviewResultData)) {
        const interviewInterviewersData = await tx.interviewInterviewers.update(
          {
            where: {
              interviewId_interviewerNIK: {
                interviewId: mainData.interviewId,
                interviewerNIK: mainData.interviewerNik,
              },
            },
            data: {
              interviewResultId: interviewResultData.id,
            },
          },
        );

        if (
          interviewInterviewersData &&
          !_.isEmpty(interviewInterviewersData)
        ) {
          return interviewResultData;
        }

        return {};
      }

      return {};
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }

  // console.info(mainData);
}

export async function getInterviewResult(interviewResultId) {
  try {
    const data = await prisma.interviewResults.findUnique({
      where: {
        id: interviewResultId,
      },
      select: {
        statusName: true,
        reason: true,
        rescheduler: true,
        candidateReschedulerId: true,
        userReschedulerNIK: true,
      },
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

export async function updateInterviewResult({
  interviewResultId,
  mainData,
  categoryData,
}) {
  try {
    // console.info(mainData);

    const data = prisma.$transaction(async (tx) => {
      // console.info(interviewResultId);

      const interviewResultData = await tx.interviewResults.update({
        where: {
          id: interviewResultId,
        },
        data: {
          statusName: mainData.status,
          reason: mainData.reason ? mainData.reason : null,
          rescheduler: mainData.rescheduler.rescheduler
            ? mainData.rescheduler.rescheduler
            : null,
          candidateReschedulerId: mainData.rescheduler.candidateReschedulerId
            ? mainData.rescheduler.candidateReschedulerId
            : null,
          userReschedulerNIK: mainData.rescheduler.userReschedulerNik
            ? mainData.rescheduler.userReschedulerNik
            : null,
          interviewResultCategories: {
            deleteMany: {},
            createMany: {
              data: categoryData.map((item) => {
                return {
                  categoryName: item.categoryName,
                  score: item.score,
                  comment: item.comment ? item.comment : null,
                };
              }),
            },
          },
        },
      });

      if (interviewResultData && !_.isEmpty(interviewResultData)) {
        const interviewInterviewersData = await tx.interviewInterviewers.update(
          {
            where: {
              interviewId_interviewerNIK: {
                interviewId: mainData.interviewId,
                interviewerNIK: mainData.interviewerNik,
              },
            },
            data: {
              interviewResultId: interviewResultData.id,
            },
          },
        );

        if (
          interviewInterviewersData &&
          !_.isEmpty(interviewInterviewersData)
        ) {
          return interviewResultData;
        }

        return {};
      }

      return {};
    });

    return data;
  } catch (e) {
    console.log(e);

    return {};
  }

  // console.info(mainData);
}
