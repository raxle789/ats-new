const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcrypt');

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

  await prisma.$executeRaw`INSERT INTO sources(name) SELECT name FROM ats.dbo.source WHERE name <> 'Others' ORDER BY name`;

  await prisma.$executeRaw`INSERT INTO sources(name) VALUES('Others')`;

  await prisma.$executeRaw`INSERT INTO categories(name, description) VALUES('Education Background', 'Candidate has an educational/training background that is relevant to the position'), ('Working Experience', 'Candidate has work experience with the skills and qualifications which are the same or similar to the position'), ('Communication Skills', 'Candidate is able to express ideas systematically and clearly'), ('Quality Oriented', 'Candidate demonstrates a focus on quality by striving to meet high performance standards and improve work process'), ('Achievement Oriented', 'Candidate has an orientation towards achieving better work performance that exceeds the company''s standards'), ('Developing Others', 'Candidate is able to encourage themselves and/or others to develop/grow'), ('Creative Agility', 'Candidate is able to identify, propose, and develop the use of new methods, technologies, and systems'), ('Leading Others', 'Candidate is able to manage own tasks and other''s task. Able to manage, monitor, provide feedback, and make decisions appropriately'), ('Strategic Thinking', 'Candidate is able to predict various risk, opportunities and take actions based on the organization''s strategic plan'), ('Reliable Partner', 'Candidate is able to adapt and collaborate with colleagues in their own department and other departments'), ('Technology Savvy', 'Candidate is able to use technology/systems to support work processes')`;

  /**
   * CV, Ijazah, KTP/Passport, NPWP, KK, Bank BCA, MCU, Vaksin
   */

  await prisma.document_types.createMany({
    data: [
      { document_name: "ijazah" },
      { document_name: "ktp/passport" },
      { document_name: "npwp/tax" },
      { document_name: "kartu-keluarga" },
      { document_name: "BCA-card" },
      { document_name: "MCU" },
      { document_name: "vaksin-certificate" },
    ]
  });

  const hashed = await bcrypt.hash('super.admin-pass', 10);

  await prisma.$transaction(async (tx) => {
    const adminUser = await tx.users.upsert({
      where: {
        email: 'oujakdev.rep@gmail.com',
      },
      update: {
        name: 'vkr-talent.administator',
        email: 'admin.super@atsera.com',
        is_email_verified: true,
        password: hashed,
      },
      create: {
        name: 'vkr-talent.administator',
        email: 'admin.super@atsera.com',
        is_email_verified: true,
        password: hashed,
      },
    });
    await tx.userRoles.create({
      data: {
        roleId: 1,
        userId: adminUser.id,
      },
    });
  });

  const hashedCandidate = await bcrypt.hash('candidate-pass', 10);

  await prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        name: 'vkr-candidate.jobseeker',
        email: 'candidate.super@atsera.com',
        is_email_verified: true,
        password: hashedCandidate,
      },
    });
    const candidate = await tx.candidates.create({
      data: {
        userId: user.id,
        gender: 'male',
        religion: 'Buddha',
        ethnicity: 'Chinese',
        blood_type: 'AB',
        phone_number: '085784441144',
        is_blacklisted: false,
        date_of_birth: new Date(Date.now()),
        maritalStatus: 'Married',
        birthCity: 'KOTA MALANG',
        expected_salary: 5000000,
        sourceId: 2,
      },
    });
    const emergencyContact = await tx.emergencyContacts.create({
      data: {
        name: 'Daniel Al-Fatih',
        phoneNumber: '087699807765',
        relationStatus: 'Enemies',
      },
    });
    await tx.candidates.update({
      where: {
        id: candidate.id,
      },
      data: {
        emengencyContactId: emergencyContact.id,
      },
    });
    await tx.addresses.create({
      data: {
        id_of_candidate: candidate.id,
        city: 'KOTA MALANG',
        country: 'Indonesia',
        rt: '003',
        rw: '001',
        street: 'Jl. Mayjen Sungkono',
        subdistrict: 'Songgoriti',
        village: 'Buthak',
        zipCode: '61262',
        currentAddress: '',
        createdAt: new Date(Date.now()),
      },
    });
    await tx.families.createMany({
      data: [
        {
          id_of_candidate: candidate.id,
          name: 'Fatih Al-Maksiat',
          dateOfBirth: new Date(Date.now()),
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          gender: 'Male',
          relation: 'Father',
        },
        {
          id_of_candidate: candidate.id,
          name: 'Danil Mukbang',
          dateOfBirth: new Date(Date.now()),
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          gender: 'Male',
          relation: 'Sibling',
        },
        {
          id_of_candidate: candidate.id,
          name: 'Daniela Kuncoro',
          dateOfBirth: new Date(Date.now()),
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          gender: 'Female',
          relation: 'Mother',
        },
      ],
    });
    await tx.educations.create({
      data: {
        edu_level: 'S1/Sarjana',
        edu_major: 'Computer Science',
        start_year: new Date(Date.now()),
        end_year: new Date(Date.now()),
        university_name: 'Universitas Trisakti',
        city: 'Jakarta Barat',
        gpa: 3.74,
        id_of_candidate: candidate.id,
      },
    });
    await tx.certifications.createMany({
      data: [
        {
          id_of_candidate: candidate.id,
          id_of_certificate: 4,
          institutionName: 'Pondok Al-Fatih',
          issuedDate: new Date(Date.now()),
          created_at: new Date(Date.now()),
        },
        {
          id_of_candidate: candidate.id,
          id_of_certificate: 8,
          institutionName: 'Danil cuti',
          issuedDate: new Date(Date.now()),
          created_at: new Date(Date.now()),
        },
        {
          id_of_candidate: candidate.id,
          id_of_certificate: 15,
          institutionName: 'Bukit Golf Danil',
          issuedDate: new Date(Date.now()),
          created_at: new Date(Date.now()),
        },
      ],
    });
    await tx.candidateSkills.createMany({
      data: [
        {
          id_of_candidate: candidate.id,
          id_of_skill: 7,
        },
        {
          id_of_candidate: candidate.id,
          id_of_skill: 14,
        },
        {
          id_of_candidate: candidate.id,
          id_of_skill: 19,
        },
      ],
    });
    await tx.languages.create({
      data: {
        id_of_candidate: candidate.id,
        name: 'Spanish',
        proficiency: 'Native proficiency',
        createdAt: new Date(Date.now()),
      },
    });
    await tx.working_experiences.createMany({
      data: [
        {
          id_of_candidate: candidate.id,
          company_name: 'Sidokare Dev',
          line_industry: 'Technology',
          job_title: 'Senior Developer',
          job_level: 'Assistant Manager',
          job_function: 'IT & Software',
          job_description: '',
          salary: 8000000,
          start_at: new Date(Date.now()),
          end_at: new Date(Date.now()),
          status: '-',
          created_at: new Date(Date.now()),
        },
        {
          id_of_candidate: candidate.id,
          company_name: 'BMW',
          line_industry: 'Automotive',
          job_title: 'Engineer',
          job_level: 'Manager',
          job_function: 'IT & Software',
          job_description: '',
          salary: 9000000,
          start_at: new Date(Date.now()),
          end_at: new Date(Date.now()),
          status: '-',
          created_at: new Date(Date.now()),
        },
        {
          id_of_candidate: candidate.id,
          company_name: 'Adobe',
          line_industry: 'Art',
          job_title: 'Senior Designer',
          job_level: 'Assistant Manager',
          job_function: 'Art',
          job_description: '',
          salary: 6000000,
          start_at: new Date(Date.now()),
          end_at: new Date(Date.now()),
          status: '-',
          created_at: new Date(Date.now()),
        },
      ],
    });
    await tx.candidateQuestions.createMany({
      data: [
        {
          candidateId: candidate.id,
          questionId: 1,
          answer: 'Ready to join now',
          created_at: new Date(Date.now()),
        },
        {
          candidateId: candidate.id,
          questionId: 2,
          answer: `${new Date(Date.now()).toISOString()},${new Date(Date.now()).toISOString()}`,
          created_at: new Date(Date.now()),
        },
        {
          candidateId: candidate.id,
          questionId: 3,
          answer: `Asma,${new Date(Date.now()).toISOString()}`,
          created_at: new Date(Date.now()),
        },
        {
          candidateId: candidate.id,
          questionId: 4,
          answer: 'Michael Ricky,IOS Dev',
          created_at: new Date(Date.now()),
        },
      ],
    });
    await tx.documents.createMany({
      data: [
        {
          saved_name: 'example-photo',
          original_name: 'origin.example-photo',
          byte_size: 25500,
          path: 'no-path',
          file_base: Buffer.from(
            'data:image/png;base64,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',
          ),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          documentTypeId: 1,
          candidate_id: candidate.id,
        },
        {
          saved_name: 'example-pdf',
          original_name: 'origin.example-pdf',
          byte_size: 25500,
          path: 'no-path',
          file_base: Buffer.from(
            'data:application/pdf;base64,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aHQgNzI4Ci9BdmdXaWR0aCA0NDEKL01heFdpZHRoIDI2NjUKL0ZvbnRXZWlnaHQgNDAwCi9YSGVpZ2h0IDI1MAovTGVhZGluZyAzMwovU3RlbVYgNDQKL0ZvbnRCQm94IFstNjY1IC0yMTAgMjAwMCA3MjhdCj4+CmVuZG9iagoxMSAwIG9iagpbMjc4IDAgMCAwIDAgMCAwIDAgMzMzIDMzMyAwIDAgMjc4IDMzMyAyNzggMjc4IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAyNzggMCAwIDAgMCAwIDAgNjY3IDY2NyA3MjIgNzIyIDY2NyA2MTEgNzc4IDcyMiAyNzggNTAwIDY2NyA1NTYgODMzIDcyMiA3NzggNjY3IDc3OCA3MjIgNjY3IDYxMSA3MjIgMCA5NDQgMCA2NjcgMCAwIDAgMCAwIDAgMCA1NTYgNTU2IDUwMCA1NTYgNTU2IDI3OCA1NTYgNTU2IDIyMiAyMjIgNTAwIDIyMiA4MzMgNTU2IDU1NiA1NTYgNTU2IDMzMyA1MDAgMjc4IDU1NiA1MDAgNzIyIDAgNTAwIDUwMF0KZW5kb2JqCjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1RydWVUeXBlCi9OYW1lIC9GMQovQmFzZUZvbnQgL0FyaWFsCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9Gb250RGVzY3JpcHRvciAxMCAwIFIKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMTIyCi9XaWR0aHMgMTEgMCBSCj4+CmVuZG9iagoxMyAwIG9iago8PAovVHlwZSAvRm9udERlc2NyaXB0b3IKL0ZvbnROYW1lIC9UaW1lcyMyME5ldyMyMFJvbWFuCi9GbGFncyAzMgovSXRhbGljQW5nbGUgMAovQXNjZW50IDg5MQovRGVzY2VudCAtMjE2Ci9DYXBIZWlnaHQgNjkzCi9BdmdXaWR0aCA0MDEKL01heFdpZHRoIDI2MTQKL0ZvbnRXZWlnaHQgNDAwCi9YSGVpZ2h0IDI1MAovTGVhZGluZyA0MgovU3RlbVYgNDAKL0ZvbnRCQm94IFstNTY4IC0yMTYgMjA0NiA2OTNdCj4+CmVuZG9iagoxNCAwIG9iagpbMjUwIDAgMCAwIDAgMCAwIDAgMzMzIDMzMyAwIDAgMjUwIDMzMyAyNTAgMjc4IDUwMCA1MDAgNTAwIDUwMCA1MDAgNTAwIDUwMCAwIDAgMCAyNzggMCAwIDAgMCAwIDkyMSA3MjIgNjY3IDAgNzIyIDYxMSA1NTYgNzIyIDAgMzMzIDM4OSA3MjIgNjExIDg4OSA3MjIgNzIyIDU1NiAwIDY2NyA1NTYgNjExIDcyMiAwIDk0NCAwIDcyMiAwIDAgMCAwIDAgMCAwIDQ0NCA1MDAgNDQ0IDUwMCA0NDQgMCAwIDUwMCAyNzggMjc4IDUwMCAyNzggNzc4IDUwMCA1MDAgNTAwIDAgMzMzIDM4OSAyNzggMCAwIDcyMiA1MDBdCmVuZG9iagoxMiAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHJ1ZVR5cGUKL05hbWUgL0YyCi9CYXNlRm9udCAvVGltZXMjMjBOZXcjMjBSb21hbgovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRm9udERlc2NyaXB0b3IgMTMgMCBSCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDEyMAovV2lkdGhzIDE0IDAgUgo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvVGltZXMjMjBOZXcjMjBSb21hbixCb2xkCi9GbGFncyAzMgovSXRhbGljQW5nbGUgMAovQXNjZW50IDg5MQovRGVzY2VudCAtMjE2Ci9DYXBIZWlnaHQgNjc3Ci9BdmdXaWR0aCA0MjcKL01heFdpZHRoIDI1NTgKL0ZvbnRXZWlnaHQgNzAwCi9YSGVpZ2h0IDI1MAovTGVhZGluZyA0MgovU3RlbVYgNDIKL0ZvbnRCQm94IFstNTU4IC0yMTYgMjAwMCA2NzddCj4+CmVuZG9iagoxNyAwIG9iagpbMjUwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDY2NyAwIDAgNjY3IDAgNzc4IDAgMzg5IDUwMCA3NzggNjY3IDk0NCA3MjIgNzc4IDYxMSAwIDcyMiAwIDY2N10KZW5kb2JqCjE1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UcnVlVHlwZQovTmFtZSAvRjMKL0Jhc2VGb250IC9UaW1lcyMyME5ldyMyMFJvbWFuLEJvbGQKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZvbnREZXNjcmlwdG9yIDE2IDAgUgovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciA4NAovV2lkdGhzIDE3IDAgUgo+PgplbmRvYmoKMTkgMCBvYmoKPDwKL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvQXJpYWwsQm9sZAovRmxhZ3MgMzIKL0l0YWxpY0FuZ2xlIDAKL0FzY2VudCA5MDUKL0Rlc2NlbnQgLTIxMAovQ2FwSGVpZ2h0IDcyOAovQXZnV2lkdGggNDc5Ci9NYXhXaWR0aCAyNjI4Ci9Gb250V2VpZ2h0IDcwMAovWEhlaWdodCAyNTAKL0xlYWRpbmcgMzMKL1N0ZW1WIDQ3Ci9Gb250QkJveCBbLTYyOCAtMjEwIDIwMDAgNzI4XQo+PgplbmRvYmoKMjAgMCBvYmoKWzI3OCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMjc4IDAgMjc4IDAgNTU2IDU1NiA1NTYgNTU2IDU1NiAwIDAgNTU2IDU1NiA1NTYgMCAwIDAgMCAwIDAgMCA3MjIgNzIyIDAgNzIyIDY2NyAwIDc3OCAwIDI3OCAwIDcyMiAwIDgzMyA3MjIgMCA2NjcgMCA3MjIgNjY3IDYxMSA3MjIgMCA5NDQgMCAwIDAgMCAwIDAgMCAwIDAgNTU2IDAgMCA2MTEgNTU2IDAgNjExIDYxMSAyNzggMCA1NTYgMjc4IDg4OSA2MTEgNjExIDAgMCAzODkgNTU2IDMzMyA2MTEgMCA3NzggMCA1NTZdCmVuZG9iagoxOCAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHJ1ZVR5cGUKL05hbWUgL0Y0Ci9CYXNlRm9udCAvQXJpYWwsQm9sZAovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRm9udERlc2NyaXB0b3IgMTkgMCBSCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDEyMQovV2lkdGhzIDIwIDAgUgo+PgplbmRvYmoKMjEgMCBvYmoKPDwKL1N1YnR5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',
          ),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          documentTypeId: 2,
          candidate_id: candidate.id,
        },
      ],
    });
    await tx.userRoles.create({
      data: {
        roleId: 3,
        userId: user.id,
      },
    });
  });

  await prisma.$executeRaw`INSERT INTO interview_result_status(name, isComment) VALUES('Hire', 0), ('Reject', 1), ('Keep In View', 1), ('Reschedule', 1)`;

  await prisma.document_types.createMany({
    data: [
      { document_name: 'ijazah' },
      { document_name: 'ktp/passport' },
      { document_name: 'npwp/tax' },
      { document_name: 'kartu-keluarga' },
      { document_name: 'BCA-card' },
      { document_name: 'MCU' },
      { document_name: 'vaksin-certificate' },
    ],
  });

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
