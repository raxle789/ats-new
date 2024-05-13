'use server';

import prisma from '../connection/db';

export async function getAllEfpkByTa(taId) {
  try {
    const data = await prisma.efpkTa.findMany({
      where: {
        taId: taId,
      },
      orderBy: {
        efpkRequestNo: 'desc',
      },
    });

    const aliasedData = data?.map((d) => {
      return {
        value: d?.efpkRequestNo,
        label: d?.efpkRequestNo,
      };
    });

    return aliasedData;
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
    const data = await prisma.jobFunctions.findMany({
      orderBy: {
        name: 'asc',
      },
    });

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
    //   await prisma.$queryRaw`SELECT EmpTypeId AS value, EmpType AS label FROM MASTER_ERA.dbo.ERA_MasterEmploymentType ORDER BY EmpType`;

    const data = await prisma.employmentStatus.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    const aliasedData = data?.map((d) => {
      return {
        value: d?.name,
        label: d?.name,
      };
    });

    return aliasedData;

    // return data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllPositionLevel() {
  try {
    const data = await prisma.positionLevels.findMany({
      orderBy: {
        level: 'desc',
      },
    });

    const aliasedData = data?.map((d) => {
      return {
        value: d?.level,
        label: d?.name,
        slaDays: d?.slaDays,
      };
    });

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllVertical() {
  try {
    const data = await prisma.verticals.findMany({
      orderBy: {
        code: 'asc',
      },
    });

    const aliasedData = data?.map((d) => {
      return {
        value: d?.code,
        label: `${d?.name} (${d?.code})`,
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
    const data = await prisma.lineIndustries.findMany({
      orderBy: {
        name: 'asc',
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
      await prisma.$queryRaw`SELECT LocationCode AS value, LocationName AS label FROM MASTER_ERA.dbo.ERA_MasterLocation WHERE NOT LocationCode = '(None)' ORDER BY LocationName`;

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
    const data = await prisma.skills.findMany({
      orderBy: {
        name: 'asc',
      },
    });

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
    const data = await prisma.certificates.findMany({
      orderBy: {
        name: 'asc',
      },
    });

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
              working_experiences: true,
              educations: true,
              candidateSkills: {
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
              working_experiences: true,
              educations: true,
              candidateSkills: {
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
          AND: [{ jobVacancyId: jobVacancyId }, { stateName: stateName }],
        },
      }),
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
