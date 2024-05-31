const { PrismaClient } = require('@prisma/client');

const moment = require('moment');

const prisma = new PrismaClient();

async function main() {
  // await prisma.$executeRaw`INSERT INTO efpk (
  //   request_no,
  //   job_title_code,
  //   job_title_name,
  //   candidate_source,
  //   total_need,
  //   total_relized,
  //   total_hold,
  //   flag_over_budget_mpp,
  //   over_budget_mpp_reason,
  //   create_date,
  //   required_date,
  //   status,
  //   req_reject_desc,
  //   reason,
  //   employee_replacement,
  //   replaced_caused_by,
  //   organization_recruit,
  //   org_code,
  //   org_name,
  //   job_lvl_code,
  //   job_lvl_name,
  //   location_code,
  //   location_name,
  //   comp_code,
  //   comp_name,
  //   emp_type,
  //   req_need_date,
  //   req_closing_date,
  //   initiator_nik,
  //   initiator_name,
  //   initiator_email,
  //   lead_time,
  //   description,
  //   approval_nik,
  //   approval_name,
  //   approval_date,
  //   reject_date,
  //   approval_description,
  //   upd_date,
  //   upd_user)
  //   SELECT
  //   RequestNo,
  //   JobTitleCode,
  //   JobTitleName,
  //   CandidateSource,
  //   TotalNeed,
  //   TotalRelized,
  //   TotalHold,
  //   FlagOverBudgetMPP,
  //   OverBudgetMPPReason,
  //   CreateDate,
  //   RequiredDate,
  //   Status,
  //   Reason,
  //   EmployeeReplacemen,
  //   ReplacedCausedBy,
  //   OrganizationRecruit,
  //   OrgCode,
  //   OrgName,
  //   JobLvlCode,
  //   JobLvlName,
  //   LocationCode,
  //   LocationName,
  //   CompCode,
  //   CompName,
  //   EmpType,
  //   ReqNeedDate,
  //   ReqClosingDate,
  //   InitiatorNIK,
  //   InitiatorName,
  //   InitiatorEmail,
  //   LeadTime,
  //   Description,
  //   ApprovalNIK,
  //   ApprovalName,
  //   ApprDate,
  //   RejectDate,
  //   ApprovalDescription,
  //   UpdDate,
  //   UpdUser
  //   FROM ats.dbo.v_efpk
  //   ORDER BY RequestNo DESC;`;

  // await prisma.$executeRaw`INSERT INTO efpk_job_vacancies(status, efpkId) SELECT * FROM ats.dbo.fpks AS fpk LEFT JOIN ats.dbo.job_vacancy_fpks AS jvf ON fpk.id = jvf.fpk_id WHERE jvf.job_vacancy_id IS NOT NULL AND jvf.fpk_id IS NOT NULL;`;

  await prisma.$executeRaw`INSERT INTO line_industries(name, created_at, updated_at) SELECT name, created_at, updated_at FROM ats.dbo.line_industries ORDER BY id`;

  await prisma.$executeRaw`INSERT INTO education_levels(name, proint_id, created_at, updated_at) SELECT name, prointId, created_at, updated_at FROM ats.dbo.education_levels ORDER BY id`;

  await prisma.$executeRaw`INSERT INTO position_levels(name, level, score, sla_days, created_at, updated_at) SELECT name, level, score, sla_days, created_at, updated_at  FROM ats.dbo.levels ORDER BY id`;

  await prisma.$executeRaw`INSERT INTO job_functions(name) SELECT name FROM ats.dbo.job_functions ORDER BY id`;

  await prisma.$executeRaw`INSERT INTO requirement_fields(name) SELECT DISTINCT fields FROM ats.dbo.job_vacancy_requirements ORDER BY fields`;

  await prisma.$executeRaw`INSERT INTO requirement_field_parsers(name) VALUES('parseEducationLevel'), ('parsePositionLevel'), ('parseYearOfExperience'), ('parseGrade'), ('parseLineIndustry'), ('parseSalary'), ('parseAge'), ('parseGender'), ('parseSkill'), ('parseCertificate')`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 1 WHERE name = 'education_level'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 2 WHERE name = 'job_level'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 3 WHERE name = 'min_year_experience'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 4 WHERE name = 'grade'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 5 WHERE name = 'line_industry'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 6 WHERE name = 'salary'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 7 WHERE name = 'age'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 8 WHERE name = 'gender'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 9 WHERE name = 'special_skill'`;

  await prisma.$executeRaw`UPDATE requirement_fields SET requirement_field_parser_id = 10 WHERE name = 'certification'`;

  await prisma.$executeRaw`INSERT INTO position_level_requirements(position_level_id, requirement_field_id) VALUES(1, 13), (1, 12), (1, 10), (1, 15), (1, 4), (1, 8), (2, 13), (2, 12), (2, 10), (2, 15), (2, 4), (2, 8), (3, 13), (3, 12), (3, 10), (3, 15), (3, 4), (3, 8), (4, 13), (4, 12), (4, 10), (4, 15), (4, 4), (4, 8), (5, 13), (5, 12), (5, 10), (5, 15), (5, 4), (5, 8), (6, 13), (6, 12), (6, 10), (6, 15), (6, 4), (6, 8), (7, 13), (7, 12), (7, 10), (7, 15), (7, 4), (7, 8)`;

  await prisma.$executeRaw`INSERT INTO roles(name, guard, created_at, updated_at) SELECT name, guard, created_at, updated_at FROM ats.dbo.roles ORDER BY id`;

  await prisma.$executeRaw`SET IDENTITY_INSERT users ON INSERT INTO users(id, name, email, password, created_at, updated_at) SELECT id, name, email, password, created_at, updated_at FROM ats.dbo.users ORDER BY id SET IDENTITY_INSERT users OFF`;

  await prisma.$executeRaw`INSERT INTO user_has_roles(role_id, user_id) SELECT role_id, user_id FROM ats.dbo.user_has_roles`;

  // await prisma.$executeRaw`INSERT INTO verticals(code) SELECT DISTINCT SUBSTRING(RTRIM(LTRIM(OrgGroupName)), 1, CHARINDEX(' ', RTRIM(LTRIM(OrgGroupName)))) FROM MASTER_ERA.dbo.ERA_MasterOrganization WHERE LEN(SUBSTRING(RTRIM(LTRIM(OrgGroupName)), 1, CHARINDEX(' ', RTRIM(LTRIM(OrgGroupName))))) <= 3 AND LEN(SUBSTRING(RTRIM(LTRIM(OrgGroupName)), 1, CHARINDEX(' ', RTRIM(LTRIM(OrgGroupName))))) != 0 AND SUBSTRING(RTRIM(LTRIM(OrgGroupName)), 1, CHARINDEX(' ', RTRIM(LTRIM(OrgGroupName)))) IN ('EAL', 'EBW', 'ED', 'EFN', 'SS')`;

  await prisma.$executeRaw`INSERT INTO verticals(code, name) VALUES('EAL', 'Erajaya Active Lifestyle'), ('EBW', 'Erajaya Beauty & Wellness'), ('ED', 'Erajaya Digital'), ('EFN', 'Erajaya Food & Nourishment'), ('SS', 'Group Service')`;

  // await prisma.$executeRaw`UPDATE verticals SET name = 'Erajaya Active Lifestyle' WHERE code = 'EAL'`;

  // await prisma.$executeRaw`UPDATE verticals SET name = 'Erajaya Beauty & Wellness' WHERE code = 'EBW'`;

  // await prisma.$executeRaw`UPDATE verticals SET name = 'Erajaya Digital' WHERE code = 'ED'`;

  // await prisma.$executeRaw`UPDATE verticals SET name = 'Erajaya Food & Nourishment' WHERE code = 'EFN'`;

  // await prisma.$executeRaw`UPDATE verticals SET name = 'Group Service' WHERE code = 'SS'`;

  await prisma.$executeRaw`INSERT INTO employment_status(name, proint_id) SELECT EmpType, EmpTypeId FROM MASTER_ERA.dbo.ERA_MasterEmploymentType ORDER BY EmpType`;

  await prisma.$executeRaw`INSERT INTO genders(name) VALUES('Male'), ('Female')`;

  await prisma.$executeRaw`INSERT INTO skills(name) SELECT name FROM ats.dbo.special_skills ORDER BY id`;

  await prisma.$executeRaw`INSERT INTO certificates(name) SELECT name FROM ats.dbo.certifications ORDER BY id`;

  await prisma.$executeRaw`INSERT INTO document_types(document_name) VALUES('profile-photo'), ('curriculum-vitae')`;

  await prisma.$executeRaw`INSERT INTO questions(question) VALUES('How long your notice period?'), ('Have you ever worked in Erajaya group of companies?'), ('Do you have any prior medical conditions, illnesses, or congenital diseases?'), ('Do you have any friends, colleague, relative or family who is working at Erajaya Group Companies?')`;

  await prisma.$executeRaw`INSERT INTO states(name, alias) VALUES('WAITING', 'Waiting'), ('ASSESSMENT', 'Assessment'), ('INTERVIEW', 'Interview'), ('REFERENCE CHECK', 'Reference Check'), ('OFFERING', 'Offering'), ('MCU', 'Medical Check Up'), ('AGREEMENT', 'Agreement'), ('ONBOARDING', 'Onboarding'), ('REJECTED', 'Rejected')`;

  await prisma.$executeRaw`INSERT INTO types(name) VALUES ('Online'), ('Offline')`;

  await prisma.$executeRaw`INSERT INTO places(name, address) VALUES ('Erajaya Gedong Panjang', 'Jl. Gedong Panjang No. 1, Jakarta Utara'), ('Erajaya Plaza', 'Jl. Pemuda No. 60, Jakarta Pusat'), ('Erajaya Hayam Wuruk', 'Jl. Hayam Wuruk No. 2, Jakarta Pusat')`;

  await prisma.$executeRaw`INSERT INTO email_templates(name, message) SELECT title, template FROM ats.dbo.interview_infos ORDER BY title`;

  // await prisma.$executeRaw`INSERT INTO phones(user_id, type, number, status, [current], created_at, updated_at) SELECT user_id, type, number, status, [current], created_at, updated_at FROM ats.dbo.phones ORDER BY id;`;

  // await prisma.$executeRaw`INSERT INTO efpk_initiator_informations(nik, name, email, position, efpk_id, user_id) SELECT efpk.initiator_nik, efpk.initiator_name, efpk.initiator_email, u.position, efpk.id, u.id FROM efpk LEFT JOIN ats.dbo.users AS u ON efpk.initiator_email COLLATE SQL_Latin1_General_CP1_CI_AS = u.email COLLATE SQL_Latin1_General_CP1_CI_AS ORDER BY efpk.id;`;

  // await prisma.$executeRaw`UPDATE efpk_initiator_informations SET phone = p.number FROM efpk_initiator_informations AS efi LEFT JOIN ats.dbo.phones as p ON efi.user_id = p.user_id WHERE efi.user_id = p.user_id;`;

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
