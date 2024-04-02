const { PrismaClient } = require('@prisma/client');

const moment = require('moment');

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`INSERT INTO efpk (
    request_no,
    job_title_code,
    job_title_name,
    candidate_source,
    total_need,
    total_relized,
    total_hold,
    flag_over_budget_mpp,
    over_budget_mpp_reason,
    create_date,
    required_date,
    status,
    reason,
    employee_replacement,
    replaced_caused_by,
    organization_recruit,
    org_code,
    org_name,
    job_lvl_code,
    job_lvl_name,
    location_code,
    location_name,
    comp_code,
    comp_name,
    emp_type,
    req_need_date,
    req_closing_date,
    initiator_nik,
    initiator_name,
    initiator_email,
    lead_time,
    description,
    approval_nik,
    approval_name,
    approval_date,
    reject_date,
    approval_description,
    upd_date,
    upd_user)
    SELECT 
    RequestNo, 
    JobTitleCode, 
    JobTitleName, 
    CandidateSource,
    TotalNeed, 
    TotalRelized, 
    TotalHold,
    FlagOverBudgetMPP, 
    OverBudgetMPPReason,
    CreateDate,
    RequiredDate,
    Status,
    Reason,
    EmployeeReplacemen,
    ReplacedCausedBy, 
    OrganizationRecruit, 
    OrgCode, 
    OrgName, 
    JobLvlCode, 
    JobLvlName, 
    LocationCode, 
    LocationName, 
    CompCode, 
    CompName, 
    EmpType, 
    ReqNeedDate,
    ReqClosingDate, 
    InitiatorNIK, 
    InitiatorName, 
    InitiatorEmail, 
    LeadTime, 
    Description, 
    ApprovalNIK, 
    ApprovalName, 
    ApprDate, 
    RejectDate, 
    ApprovalDescription, 
    UpdDate, 
    UpdUser
    FROM ats.dbo.v_efpk
    ORDER BY RequestNo DESC;`;

  // await prisma.$executeRaw`INSERT INTO efpk_job_vacancies(status, efpkId) SELECT * FROM ats.dbo.fpks AS fpk LEFT JOIN ats.dbo.job_vacancy_fpks AS jvf ON fpk.id = jvf.fpk_id WHERE jvf.job_vacancy_id IS NOT NULL AND jvf.fpk_id IS NOT NULL;`;

  await prisma.$executeRaw`INSERT INTO line_industries(name, created_at, updated_at) SELECT name, created_at, updated_at FROM ats.dbo.line_industries ORDER BY name;`;

  await prisma.$executeRaw`INSERT INTO education_levels(name, proint_id, created_at, updated_at) SELECT name, prointId, created_at, updated_at FROM ats.dbo.education_levels ORDER BY id;`;

  await prisma.$executeRaw`INSERT INTO position_levels(name, level, score, sla_days, created_at, updated_at) SELECT name, level, score, sla_days, created_at, updated_at  FROM ats.dbo.levels ORDER BY id;`;

  await prisma.$executeRaw`INSERT INTO position_level_requirement_fields(name) SELECT DISTINCT fields FROM ats.dbo.job_vacancy_requirements ORDER BY fields;`;

  await prisma.$executeRaw`INSERT INTO roles(name, guard, created_at, updated_at) SELECT name, guard, created_at, updated_at FROM ats.dbo.roles ORDER BY id;`;

  await prisma.$executeRaw`INSERT INTO users(id, name, email, password, created_at, updated_at) SELECT id, name, email, password, created_at, updated_at FROM ats.dbo.users ORDER BY id;`;

  await prisma.$executeRaw`INSERT INTO user_has_roles(role_id, user_id) SELECT role_id, user_id FROM ats.dbo.user_has_roles;`;

  await prisma.$executeRaw`INSERT INTO phones(user_id, type, number, status, [current], created_at, updated_at) SELECT user_id, type, number, status, [current], created_at, updated_at FROM ats.dbo.phones ORDER BY id;`;

  await prisma.$executeRaw`INSERT INTO efpk_initiator_informations(nik, name, email, position, efpk_id, user_id) SELECT efpk.initiator_nik, efpk.initiator_name, efpk.initiator_email, u.position, efpk.id, u.id FROM efpk LEFT JOIN ats.dbo.users AS u ON efpk.initiator_email COLLATE SQL_Latin1_General_CP1_CI_AS = u.email COLLATE SQL_Latin1_General_CP1_CI_AS ORDER BY efpk.id;`;

  await prisma.$executeRaw`UPDATE efpk_initiator_informations SET phone = p.number FROM efpk_initiator_informations AS efi LEFT JOIN ats.dbo.phones as p ON efi.user_id = p.user_id WHERE efi.user_id = p.user_id;`;

  // const hasil = await prisma.users.findMany({
  //   where: {
  //     userRoles: {
  //       some: {
  //         roles: {
  //           name: 'interviewer',
  //         },
  //       },
  //     },
  //   },
  // });

  // const input = await prisma.positionLevelRequirements.upsert({
  //   where: {
  //     AND: [
  //       {
  //         positionLevelsId: 2,
  //       },
  //       {
  //         requirementLevelsId: 12,
  //       },
  //     ],
  //   },
  //   update: {
  //     value: JSON.stringify([2, 3, 4, 8]),
  //   },
  //   create: {
  //     positionLevelsId: 2,
  //     requirementLevelsId: 12,
  //     value: JSON.stringify([2, 3, 4, 8]),
  //   },
  //   include: {
  //     positionLevels: true,
  //     positionLevelRequirementFields: true,
  //   },
  // });

  // const hasil = await prisma.positionLevelRequirements.findMany({
  //   select: {
  //     positionLevels: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     positionLevelRequirementFields: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     value: true,
  //   },
  // });

  // const input = await prisma.efpkTa.upsert({
  //   where: {
  //     efpkId: 4,
  //   },
  //   create: {
  //     taId: 1024,
  //     efpkId: 4,
  //   },
  //   update: {
  //     taId: 1024,
  //   },
  // });

  // const input2 = await prisma.efpkTaTransaction.create({
  //   data: {
  //     taId: 1024,
  //     efpkId: 4,
  //   },
  // });

  // const input3 = await prisma.efpkTa.updateMany({
  //   where: {
  //     efpkId: 4,
  //   },
  //   data: {
  //     taId: 1008,
  //   },
  // });

  // const input4 = await prisma.efpkTaTransaction.create({
  //   data: {
  //     taId: 1008,
  //     efpkId: 4,
  //   },
  // });

  // const hasil = await prisma.efpkTa.findMany({
  //   include: {
  //     ta: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     efpk: {
  //       select: {
  //         requestNo: true,
  //       },
  //     },
  //   },
  // });

  // const hasil2 = await prisma.efpkTaTransaction.findMany({
  //   include: {
  //     ta: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     efpk: {
  //       select: {
  //         requestNo: true,
  //       },
  //     },
  //   },
  // });

  // const hasil = await prisma.efpk.findMany({
  //   skip: 0,
  //   take: 10,
  //   orderBy: {
  //     requestNo: 'desc',
  //   },
  //   include: {
  //     efpkInitiatorInformations: {
  //       select: {
  //         phone: true,
  //         position: true,
  //       },
  //     },
  //     efpkTa: {
  //       select: {
  //         taId: true,
  //       },
  //     },
  //   },
  // });

  // job posting yes no belom
  // const query = 'Keke Meidyluana Sitalaksmi';

  // const query = '15-May-2023';

  // const hasil = await prisma.efpk.findMany({
  //   where: {
  //     OR: [
  //       {
  //         jobTitleName: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         requestNo: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         jobLvlCode: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         compCode: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         initiatorName: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         initiatorEmail: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         locationName: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         reason: {
  //           contains: query,
  //         },
  //       },
  //       {
  //         createDate: {
  //           equals: moment(query, 'DD-MMM-YYYY').isValid()
  //             ? new Date(moment(query, 'DD-MMM-YYYY').format('YYYY-MM-DD'))
  //             : undefined,
  //         },
  //       },
  //       {
  //         approvalDate: {
  //           contains: moment(query, 'DD-MMM-YYYY').isValid()
  //             ? moment(query, 'DD-MMM-YYYY').format('DD/MM/YYYY')
  //             : undefined,
  //         },
  //       },
  //       {
  //         status: {
  //           contains: query,
  //         },
  //       },
  //     ],
  //   },
  //   include: {
  //     efpkInitiatoInformations: {
  //       select: {
  //         phone: true,
  //         position: true,
  //       },
  //     },
  //     efpkTa: {
  //       select: {
  //         taId: true,
  //       },
  //     },
  //   },
  // });

  // console.info(hasil);

  // console.info(hasil2);

  // console.info(JSON.parse(hasil[0].value));
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.info(e);
    await prisma.$disconnect();
    process.exit(1);
  });
