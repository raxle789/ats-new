import prisma from '../connection/db';

// const sql = require('mssql');

const moment = require('moment');

export async function getAllFullyApprovedFpk(offset, perPage) {
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

    const data = await prisma.efpk.findMany({
      skip: offset,
      take: perPage,
      orderBy: {
        requestNo: 'desc',
      },
      include: {
        efpkInitiatorInformations: {
          select: {
            phone: true,
            position: true,
          },
        },
        efpkTa: {
          select: {
            taId: true,
          },
        },
        efpkJobVacancies: true,
        // efpkJobVacancies: {
        //   select: {
        //     status: true,
        //   },
        // },
      },
    });

    const total = await prisma.efpk.count();

    return {
      data: data,
      total: total,
    };
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllFullyApprovedFpkTotal() {
  try {
    // const db = await getDb(poolName);

    // const data = await db
    //   .request()
    //   .input('status', sql.VarChar, 'Approved')
    //   .query('SELECT COUNT(*) AS total FROM efpk WHERE Status = @status');

    const total = await prisma.efpk.count();

    return total;
  } catch (e) {
    console.log(e);

    return [];
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

    const data = await prisma.efpk.findMany({
      skip: offset,
      take: perPage,
      where: {
        OR: [
          {
            jobTitleName: {
              contains: query,
            },
          },
          {
            requestNo: {
              contains: query,
            },
          },
          {
            jobLvlCode: {
              contains: query,
            },
          },
          {
            compCode: {
              contains: query,
            },
          },
          {
            initiatorName: {
              contains: query,
            },
          },
          {
            initiatorEmail: {
              contains: query,
            },
          },
          {
            locationName: {
              contains: query,
            },
          },
          {
            reason: {
              contains: query,
            },
          },
          {
            createDate: {
              equals: moment(query, 'DD-MMM-YYYY').isValid()
                ? new Date(moment(query, 'DD-MMM-YYYY').format('YYYY-MM-DD'))
                : undefined,
            },
          },
          {
            approvalDate: {
              contains: moment(query, 'DD-MMM-YYYY').isValid()
                ? moment(query, 'DD-MMM-YYYY').format('DD/MM/YYYY')
                : undefined,
            },
          },
          {
            status: {
              contains: query,
            },
          },
          {
            efpkTa: {
              ta: {
                name: {
                  contains: query,
                },
              },
            },
          },
          // {
          //   efpkJobVacancies: query === 'No' ? { none: {} } : { some: {} },
          // },
        ],
      },
      include: {
        efpkInitiatorInformations: {
          select: {
            phone: true,
            position: true,
          },
        },
        efpkTa: {
          select: {
            taId: true,
          },
        },
        efpkJobVacancies: true,
        // efpkJobVacancies: {
        //   select: {
        //     status: true,
        //   },
        // },
      },
    });

    const total = await prisma.efpk.count({
      where: {
        OR: [
          {
            jobTitleName: {
              contains: query,
            },
          },
          {
            requestNo: {
              contains: query,
            },
          },
          {
            jobLvlCode: {
              contains: query,
            },
          },
          {
            compCode: {
              contains: query,
            },
          },
          {
            initiatorName: {
              contains: query,
            },
          },
          {
            initiatorEmail: {
              contains: query,
            },
          },
          {
            locationName: {
              contains: query,
            },
          },
          {
            reason: {
              contains: query,
            },
          },
          {
            createDate: {
              equals: moment(query, 'DD-MMM-YYYY').isValid()
                ? new Date(moment(query, 'DD-MMM-YYYY').format('YYYY-MM-DD'))
                : undefined,
            },
          },
          {
            approvalDate: {
              contains: moment(query, 'DD-MMM-YYYY').isValid()
                ? moment(query, 'DD-MMM-YYYY').format('DD/MM/YYYY')
                : undefined,
            },
          },
          {
            status: {
              contains: query,
            },
          },
          {
            efpkTa: {
              ta: {
                name: {
                  contains: query,
                },
              },
            },
          },
          // {
          //   efpkJobVacancies: query === 'No' ? { none: {} } : { some: {} },
          // },
        ],
      },
    });

    return {
      data: data,
      total: total,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      total: [],
    };
  }
}

export async function getAllTaData() {
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
              name: 'interviewer',
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
      value: d.id,
      label: d.name,
    }));

    return aliasedData;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function assignTaToFpk(efpkId, taId) {
  try {
    // const db = await getDb(poolName);
    // await db
    //   .request()
    //   .input('requestNo', sql.VarChar, requestNo)
    //   .input('taId', sql.Numeric, taId)
    //   .query('UPDATE efpk SET TaId = @taId WHERE RequestNo = @requestNo');

    await prisma.efpkTa.upsert({
      where: {
        efpkId: efpkId,
      },
      update: {
        taId: taId,
      },
      create: {
        taId: taId,
        efpkId: efpkId,
      },
    });

    await prisma.efpkTaTransactions.create({
      data: {
        taId: taId,
        efpkId: efpkId,
      },
    });
  } catch (e) {
    console.log(e);

    return [];
  }
}
