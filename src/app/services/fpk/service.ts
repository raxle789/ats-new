'use server';

import prisma from '../connection/db';

// const sql = require('mssql');

// const moment = require('moment');

export async function getAllFpk(offset: number, perPage: number) {
  try {
    // const db = await getDb(poolName);

    // const data = await db
    //   .request()
    //   .input('status', sql.VarChar, 'Approved')
    //   .input('offset', sql.Int, offset)
    //   .input('perPage', sql.Int, perPage)
    //   .query(
    //     'SELECT JobTitleName, RequestNo, JobLvlCode, CompCode, InitiatorName, InitiatorEmail, initiators.phone AS InitiatorPhone, initiators.position as InitiatorPosition, LocationName, Reason, CreateDate, ApprovalDate, Status, CandidateSource, TaId FROM efpk LEFT JOIN initiators ON efpk.InitiatorNIK = initiators.nik WHERE Status = @status ORDER BY RequestNo DESC OFFSET @offset ROWS FETCH NEXT @perPage ROWS ONLY',
    //   );

    // const total = await db
    //   .request()
    //   .input('status', sql.VarChar, 'Approved')
    //   .query('SELECT COUNT(*) AS total FROM efpk WHERE Status = @status');

    // const data = await prisma.efpk.findMany({
    //   skip: offset,
    //   take: perPage,
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
    //     efpkJobVacancies: true,
    //     // efpkJobVacancies: {
    //     //   select: {
    //     //     status: true,
    //     //   },
    //     // },
    //   },
    // });

    const [data, total] = await prisma.$transaction([
      prisma.$queryRaw`SELECT efpk.JobTitleName AS jobTitleName, efpk.RequestNo AS requestNo, efpk.JobLvlCode AS jobLvlCode, efpk.CompCode AS compCode, efpk.TotalNeed AS totalNeed, efpk.TotalRelized AS totalRelized, efpk.InitiatorName AS initiatorName, efpk.InitiatorEmail AS initiatorEmail, phone.PhoneNmbr AS initiatorPhone, employee.JobTtlName AS initiatorJobTitleName, efpk.LocationName AS locationName, efpk.Reason AS reason, efpk.CreateDate AS createDate, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1) AS approvalDate, efpk.Status AS status, efpkJob.total AS totalJobVacancies, efpk_ta.ta_id AS taId FROM ((((MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON efpk.InitiatorNIK = employee.EmpNIK) LEFT JOIN (SELECT EmpNIK, PhoneNmbr, ROW_NUMBER() OVER(PARTITION BY EmpNIK ORDER BY ISNULL(EmpDateEnd, '9999-12-31') DESC) AS rn FROM MASTER_ERA.dbo.ERA_MasterPhone WHERE FgPrimary = 'Y') AS phone ON efpk.InitiatorNIK = phone.EmpNIK AND phone.rn = 1) LEFT JOIN efpk_ta ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpk_ta.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) LEFT JOIN (SELECT efpk_request_No, COUNT(job_vacancy_id) AS total FROM efpk_job_vacancies GROUP BY efpk_request_no) AS efpkJob ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpkJob.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) WHERE efpk.CompCode NOT IN ('DA', 'DAP', 'DKSN') ORDER BY CreateDate DESC, RequestNo DESC OFFSET ${offset} ROWS FETCH NEXT ${perPage} ROWS ONLY`,
      prisma.$queryRaw`SELECT COUNT(*) AS total FROM MASTER_ERA.dbo.PROINT_trx_efpk WHERE CompCode NOT IN ('DA', 'DAP', 'DKSN')`,
    ]);

    // const data =
    //   await prisma.$queryRaw`SELECT efpk.JobTitleName AS jobTitleName, efpk.RequestNo AS requestNo, efpk.JobLvlCode AS jobLvlCode, efpk.CompCode AS compCode, efpk.TotalNeed AS totalNeed, efpk.TotalRelized AS totalRelized, efpk.InitiatorName AS initiatorName, efpk.InitiatorEmail AS initiatorEmail, phone.PhoneNmbr AS initiatorPhone, employee.JobTtlName AS initiatorJobTitleName, efpk.LocationName AS locationName, efpk.Reason AS reason, efpk.CreateDate AS createDate, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1) AS approvalDate, efpk.Status AS status, efpk_ta.ta_id AS taId, efpkJob.total AS totalJobVacancies FROM ((((MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON efpk.InitiatorNIK = employee.EmpNIK) LEFT JOIN (SELECT EmpNIK, PhoneNmbr, ROW_NUMBER() OVER(PARTITION BY EmpNIK ORDER BY ISNULL(EmpDateEnd, '9999-12-31') DESC) AS rn FROM MASTER_ERA.dbo.ERA_MasterPhone WHERE FgPrimary = 'Y') AS phone ON efpk.InitiatorNIK = phone.EmpNIK AND phone.rn = 1) LEFT JOIN efpk_ta ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpk_ta.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) LEFT JOIN (SELECT efpk_request_No, COUNT(job_vacancy_id) AS total FROM efpk_job_vacancies GROUP BY efpk_request_no) AS efpkJob ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpkJob.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) WHERE efpk.Status = 'Approved' ORDER BY RequestNo DESC OFFSET ${offset} ROWS FETCH NEXT ${perPage} ROWS ONLY`;

    // const data2 =
    //   await prisma.$queryRaw`SELECT efpk.JobTitleName AS jobTitleName, efpk.RequestNo AS requestNo, efpk.JobLvlCode AS jobLvlCode, efpk.CompCode AS compCode, efpk.TotalNeed AS totalNeed, efpk.TotalRelized AS totalRelized, efpk.InitiatorName AS initiatorName, efpk.InitiatorEmail AS initiatorEmail, phone.PhoneNmbr AS initiatorPhone, employee.JobTtlName AS initiatorJobTitleName, efpk.LocationName AS locationName, efpk.Reason AS reason, efpk.CreateDate AS createDate, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1) AS approvalDate, efpk.Status AS status, efpk_ta.ta_id AS taId, efpkJob.total AS totalJobVacancies FROM ((((MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON efpk.InitiatorNIK = employee.EmpNIK) LEFT JOIN (SELECT EmpNIK, PhoneNmbr, ROW_NUMBER() OVER(PARTITION BY EmpNIK ORDER BY ISNULL(EmpDateEnd, '9999-12-31') DESC) AS rn FROM MASTER_ERA.dbo.ERA_MasterPhone WHERE FgPrimary = 'Y') AS phone ON efpk.InitiatorNIK = phone.EmpNIK AND phone.rn = 1) LEFT JOIN efpk_ta ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpk_ta.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) LEFT JOIN (SELECT efpk_request_No, COUNT(job_vacancy_id) AS total FROM efpk_job_vacancies GROUP BY efpk_request_no) AS efpkJob ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpkJob.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) WHERE efpk.Status = 'Approved' ORDER BY RequestNo DESC OFFSET ${offset} ROWS FETCH NEXT ${perPage} ROWS ONLY`;

    // const total = await prisma.efpk.count();

    // const total =
    //   await prisma.$queryRaw`SELECT COUNT(*) AS total FROM MASTER_ERA.dbo.PROINT_trx_efpk WHERE Status = 'Approved'`;

    return {
      data: data,
      total: total[0].total,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      total: 0,
    };
  }
}

export async function getAllFpkTotal() {
  try {
    // const db = await getDb(poolName);

    // const data = await db
    //   .request()
    //   .input('status', sql.VarChar, 'Approved')
    //   .query('SELECT COUNT(*) AS total FROM efpk WHERE Status = @status');

    // const total = await prisma.efpk.count();

    const total =
      await prisma.$queryRaw`SELECT COUNT(*) AS total FROM MASTER_ERA.dbo.PROINT_trx_efpk WHERE CompCode NOT IN ('DA', 'DAP', 'DKSN')`;

    return total[0].total;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function searchFpk(query, offset, perPage) {
  try {
    // const db = await getDb(poolName);

    // const data = await db
    //   .request()
    //   .input('query', sql.Text, `%${query}%`)
    //   .input('offset', sql.Int, offset)
    //   .input('perPage', sql.Int, perPage)
    //   .query(
    //     "SELECT JobTitleName, RequestNo, JobLvlCode, CompCode, InitiatorName, InitiatorEmail, initiators.phone AS InitiatorPhone, initiators.position AS InitiatorPosition, LocationName, Reason, CreateDate, ApprovalDate, Status, CandidateSource, efpk.TaId FROM ((efpk LEFT JOIN v_users ON efpk.TaId = v_users.id) LEFT JOIN initiators ON efpk.InitiatorNIK = initiators.nik) WHERE JobTitleName LIKE @query OR RequestNo LIKE @query OR JobLvlCode LIKE @query OR CompCode LIKE @query OR InitiatorName LIKE @query OR InitiatorEmail LIKE @query OR initiators.phone LIKE @query OR initiators.position LIKE @query OR LocationName LIKE @query OR Reason LIKE @query OR FORMAT(CreateDate, 'dd-MMM-yyyy') LIKE @query OR FORMAT(CONVERT(datetime, ApprovalDate, 103), 'dd-MMM-yyyy') LIKE @query OR Status LIKE @query OR CandidateSource LIKE @query OR v_users.name LIKE @query ORDER BY RequestNo DESC OFFSET @offset ROWS FETCH NEXT @perPage ROWS ONLY",
    //   );

    // const total = await db
    //   .request()
    //   .input('query', sql.Text, `%${query}%`)
    //   .query(
    //     "SELECT COUNT(*) AS searchTotal FROM ((efpk LEFT JOIN v_users ON efpk.TaId = v_users.id) LEFT JOIN initiators ON efpk.InitiatorNIK = initiators.nik) WHERE JobTitleName LIKE @query OR RequestNo LIKE @query OR JobLvlCode LIKE @query OR CompCode LIKE @query OR InitiatorName LIKE @query OR InitiatorEmail LIKE @query OR initiators.phone LIKE @query OR initiators.position LIKE @query OR LocationName LIKE @query OR Reason LIKE @query OR FORMAT(CreateDate, 'dd-MMM-yyyy') LIKE @query OR FORMAT(CONVERT(datetime, ApprovalDate, 103), 'dd-MMM-yyyy') LIKE @query OR Status LIKE @query OR CandidateSource LIKE @query OR v_users.name LIKE @query",
    //   );

    // const data = await prisma.efpk.findMany({
    //   skip: offset,
    //   take: perPage,
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
    //       {
    //         efpkTa: {
    //           ta: {
    //             name: {
    //               contains: query,
    //             },
    //           },
    //         },
    //       },
    //       // {
    //       //   efpkJobVacancies: query === 'No' ? { none: {} } : { some: {} },
    //       // },
    //     ],
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
    //     efpkJobVacancies: true,
    //     // efpkJobVacancies: {
    //     //   select: {
    //     //     status: true,
    //     //   },
    //     // },
    //   },
    // });

    const [data, total] = await prisma.$transaction([
      prisma.$queryRaw`SELECT efpk.JobTitleName AS jobTitleName, efpk.RequestNo AS requestNo, efpk.JobLvlCode AS jobLvlCode, efpk.CompCode AS compCode, efpk.TotalNeed AS totalNeed, efpk.TotalRelized AS totalRelized, efpk.InitiatorName AS initiatorName, efpk.InitiatorEmail AS initiatorEmail, phone.PhoneNmbr AS initiatorPhone, employee.JobTtlName AS initiatorJobTitleName, efpk.LocationName AS locationName, efpk.Reason AS reason, efpk.CreateDate AS createDate, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1) AS approvalDate, efpk.Status AS status, efpkJob.total AS totalJobVacancies, efpk_ta.ta_id AS taId 
      FROM (((((MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON efpk.InitiatorNIK = employee.EmpNIK) LEFT JOIN (SELECT EmpNIK, PhoneNmbr, ROW_NUMBER() OVER(PARTITION BY EmpNIK ORDER BY ISNULL(EmpDateEnd, '9999-12-31') DESC) AS rn FROM MASTER_ERA.dbo.ERA_MasterPhone WHERE FgPrimary = 'Y') AS phone ON efpk.InitiatorNIK = phone.EmpNIK AND phone.rn = 1) LEFT JOIN efpk_ta ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpk_ta.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) LEFT JOIN users ON efpk_ta.ta_id = users.id) LEFT JOIN (SELECT efpk_request_No, COUNT(job_vacancy_id) AS total FROM efpk_job_vacancies GROUP BY efpk_request_no) AS efpkJob ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpkJob.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) WHERE efpk.CompCode NOT IN ('DA', 'DAP', 'DKSN') AND (efpk.JobTitleName LIKE ${'%' + query + '%'} OR efpk.RequestNo LIKE ${'%' + query + '%'} OR efpk.JobLvlCode LIKE ${'%' + query + '%'} OR efpk.CompCode LIKE ${'%' + query + '%'} OR CAST(efpk.TotalNeed AS NVarChar)LIKE ${'%' + query + '%'} OR CAST(efpk.TotalRelized AS NVarChar) LIKE ${'%' + query + '%'} OR efpk.InitiatorName LIKE ${'%' + query + '%'} OR efpk.InitiatorEmail LIKE ${'%' + query + '%'} OR phone.PhoneNmbr LIKE ${'%' + query + '%'} OR employee.JobTtlName LIKE ${'%' + query + '%'} OR efpk.LocationName LIKE ${'%' + query + '%'} OR efpk.Reason LIKE ${'%' + query + '%'} OR FORMAT(efpk.CreateDate, 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR FORMAT(CONVERT(datetime, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1), 103), 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR efpk.Status LIKE ${'%' + query + '%'} OR (CASE WHEN efpkJob.total >= 1 THEN 'Yes' ELSE 'No' END) LIKE ${'%' + query + '%'} OR users.name LIKE ${'%' + query + '%'}) ORDER BY CreateDate DESC, RequestNo DESC OFFSET ${offset} ROWS FETCH NEXT ${perPage} ROWS ONLY`,
      prisma.$queryRaw`SELECT COUNT(*) AS total FROM (((((MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON efpk.InitiatorNIK = employee.EmpNIK) LEFT JOIN (SELECT EmpNIK, PhoneNmbr, ROW_NUMBER() OVER(PARTITION BY EmpNIK ORDER BY ISNULL(EmpDateEnd, '9999-12-31') DESC) AS rn FROM MASTER_ERA.dbo.ERA_MasterPhone WHERE FgPrimary = 'Y') AS phone ON efpk.InitiatorNIK = phone.EmpNIK AND phone.rn = 1) LEFT JOIN efpk_ta ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpk_ta.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) LEFT JOIN users ON efpk_ta.ta_id = users.id) LEFT JOIN (SELECT efpk_request_No, COUNT(job_vacancy_id) AS total FROM efpk_job_vacancies GROUP BY efpk_request_no) AS efpkJob ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpkJob.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) WHERE efpk.CompCode NOT IN ('DA', 'DAP', 'DKSN') AND (efpk.JobTitleName LIKE ${'%' + query + '%'} OR efpk.RequestNo LIKE ${'%' + query + '%'} OR efpk.JobLvlCode LIKE ${'%' + query + '%'} OR efpk.CompCode LIKE ${'%' + query + '%'} OR CAST(efpk.TotalNeed AS NVarChar)LIKE ${'%' + query + '%'} OR CAST(efpk.TotalRelized AS NVarChar) LIKE ${'%' + query + '%'} OR efpk.InitiatorName LIKE ${'%' + query + '%'} OR efpk.InitiatorEmail LIKE ${'%' + query + '%'} OR phone.PhoneNmbr LIKE ${'%' + query + '%'} OR employee.JobTtlName LIKE ${'%' + query + '%'} OR efpk.LocationName LIKE ${'%' + query + '%'} OR efpk.Reason LIKE ${'%' + query + '%'} OR FORMAT(efpk.CreateDate, 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR FORMAT(CONVERT(datetime, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1), 103), 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR efpk.Status LIKE ${'%' + query + '%'} OR (CASE WHEN efpkJob.total >= 1 THEN 'Yes' ELSE 'No' END) LIKE ${'%' + query + '%'} OR users.name LIKE ${'%' + query + '%'})`,
    ]);

    // const data =
    //   await prisma.$queryRaw`SELECT efpk.JobTitleName AS jobTitleName, efpk.RequestNo AS requestNo, efpk.JobLvlCode AS jobLvlCode, efpk.CompCode AS compCode, efpk.TotalNeed AS totalNeed, efpk.TotalRelized AS totalRelized, efpk.InitiatorName AS initiatorName, efpk.InitiatorEmail AS initiatorEmail, phone.PhoneNmbr AS initiatorPhone, employee.JobTtlName AS initiatorJobTitleName, efpk.LocationName AS locationName, efpk.Reason AS reason, efpk.CreateDate AS createDate, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1) AS approvalDate, efpk.Status AS status, efpk_ta.ta_id AS taId FROM (((((MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON efpk.InitiatorNIK = employee.EmpNIK) LEFT JOIN (SELECT EmpNIK, PhoneNmbr, ROW_NUMBER() OVER(PARTITION BY EmpNIK ORDER BY ISNULL(EmpDateEnd, '9999-12-31') DESC) AS rn FROM MASTER_ERA.dbo.ERA_MasterPhone WHERE FgPrimary = 'Y') AS phone ON efpk.InitiatorNIK = phone.EmpNIK AND phone.rn = 1) LEFT JOIN efpk_ta ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpk_ta.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) LEFT JOIN users ON efpk_ta.ta_id = users.id) LEFT JOIN (SELECT efpk_request_No, COUNT(job_vacancy_id) AS total FROM efpk_job_vacancies GROUP BY efpk_request_no) AS efpkJob ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpkJob.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) WHERE efpk.Status = 'Approved' AND (efpk.JobTitleName LIKE ${'%' + query + '%'} OR efpk.RequestNo LIKE ${'%' + query + '%'} OR efpk.JobLvlCode LIKE ${'%' + query + '%'} OR efpk.CompCode LIKE ${'%' + query + '%'} OR CAST(efpk.TotalNeed AS NVarChar)LIKE ${'%' + query + '%'} OR CAST(efpk.TotalRelized AS NVarChar) LIKE ${'%' + query + '%'} OR efpk.InitiatorName LIKE ${'%' + query + '%'} OR efpk.InitiatorEmail LIKE ${'%' + query + '%'} OR phone.PhoneNmbr LIKE ${'%' + query + '%'} OR employee.JobTtlName LIKE ${'%' + query + '%'} OR efpk.LocationName LIKE ${'%' + query + '%'} OR efpk.Reason LIKE ${'%' + query + '%'} OR FORMAT(efpk.CreateDate, 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR FORMAT(CONVERT(datetime, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1), 103), 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR efpk.Status LIKE ${'%' + query + '%'} OR users.name LIKE ${'%' + query + '%'}) ORDER BY RequestNo DESC OFFSET ${offset} ROWS FETCH NEXT ${perPage} ROWS ONLY`;

    // const total = await prisma.efpk.count({
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
    //       {
    //         efpkTa: {
    //           ta: {
    //             name: {
    //               contains: query,
    //             },
    //           },
    //         },
    //       },
    //       // {
    //       //   efpkJobVacancies: query === 'No' ? { none: {} } : { some: {} },
    //       // },
    //     ],
    //   },
    // });

    // const total =
    //   await prisma.$queryRaw`SELECT COUNT(*) FROM (((((MASTER_ERA.dbo.PROINT_trx_efpk AS efpk LEFT JOIN MASTER_ERA.dbo.ERA_MasterEmployeeAttr AS employee ON efpk.InitiatorNIK = employee.EmpNIK) LEFT JOIN (SELECT EmpNIK, PhoneNmbr, ROW_NUMBER() OVER(PARTITION BY EmpNIK ORDER BY ISNULL(EmpDateEnd, '9999-12-31') DESC) AS rn FROM MASTER_ERA.dbo.ERA_MasterPhone WHERE FgPrimary = 'Y') AS phone ON efpk.InitiatorNIK = phone.EmpNIK AND phone.rn = 1) LEFT JOIN efpk_ta ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpk_ta.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) LEFT JOIN users ON efpk_ta.ta_id = users.id) LEFT JOIN (SELECT efpk_request_No, COUNT(job_vacancy_id) AS total FROM efpk_job_vacancies GROUP BY efpk_request_no) AS efpkJob ON efpk.RequestNo COLLATE SQL_Latin1_General_CP1_CI_AS = efpkJob.efpk_request_no COLLATE SQL_Latin1_General_CP1_CI_AS) WHERE efpk.Status = 'Approved' AND (efpk.JobTitleName LIKE ${'%' + query + '%'} OR efpk.RequestNo LIKE ${'%' + query + '%'} OR efpk.JobLvlCode LIKE ${'%' + query + '%'} OR efpk.CompCode LIKE ${'%' + query + '%'} OR CAST(efpk.TotalNeed AS NVarChar)LIKE ${'%' + query + '%'} OR CAST(efpk.TotalRelized AS NVarChar) LIKE ${'%' + query + '%'} OR efpk.InitiatorName LIKE ${'%' + query + '%'} OR efpk.InitiatorEmail LIKE ${'%' + query + '%'} OR phone.PhoneNmbr LIKE ${'%' + query + '%'} OR employee.JobTtlName LIKE ${'%' + query + '%'} OR efpk.LocationName LIKE ${'%' + query + '%'} OR efpk.Reason LIKE ${'%' + query + '%'} OR FORMAT(efpk.CreateDate, 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR FORMAT(CONVERT(datetime, COALESCE(efpk.ApprDate9, efpk.ApprDate8, efpk.ApprDate7, efpk.ApprDate6, efpk.ApprDate5, efpk.ApprDate4, efpk.ApprDate3, efpk.ApprDate2, efpk.ApprDate1), 103), 'dd-MMM-yyyy') LIKE ${'%' + query + '%'} OR efpk.Status LIKE ${'%' + query + '%'} OR users.name LIKE ${'%' + query + '%'}) ORDER BY RequestNo DESC OFFSET ${offset} ROWS FETCH NEXT ${perPage} ROWS ONLY`;

    return {
      data: data,
      total: total[0].total,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      total: 0,
    };
  }
}

export async function getAllTa() {
  try {
    // const db = await getDb(poolName);

    // const data = await db
    //   .request()
    //   // .input('roles1', sql.Int, 1)
    //   .input('roles2', sql.Int, 8)
    //   .query(
    //     'SELECT v_users.id AS value, v_users.name AS label FROM ((v_user_has_roles AS v_uhs INNER JOIN v_users ON v_uhs.user_id = v_users.id) INNER JOIN roles ON v_uhs.role_id = roles.id) WHERE v_uhs.role_id = @roles2 ORDER BY v_users.name',
    //   );

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
      orderBy: {
        name: 'asc',
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

export async function assignTaToFpk(efpkRequestNo, taId) {
  try {
    // const db = await getDb(poolName);
    // await db
    //   .request()
    //   .input('requestNo', sql.VarChar, requestNo)
    //   .input('taId', sql.Numeric, taId)
    //   .query('UPDATE efpk SET TaId = @taId WHERE RequestNo = @requestNo');

    prisma.$transaction(async (tx) => {
      await tx.efpkTa.upsert({
        where: {
          efpkRequestNo: efpkRequestNo,
        },
        update: {
          taId: taId,
        },
        create: {
          efpkRequestNo: efpkRequestNo,
          taId: taId,
        },
      });

      await tx.efpkTaTransactions.create({
        data: {
          taId: taId,
          efpkRequestNo: efpkRequestNo,
        },
      });
    });
  } catch (e) {
    console.log(e);
  }
}
