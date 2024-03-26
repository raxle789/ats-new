import getDb from '../connection/db';

const sql = require('mssql');

export async function getAllFullyApprovedFpk(poolName, offset, perPage) {
  try {
    const db = await getDb(poolName);

    const data = await db
      .request()
      .input('status', sql.VarChar, 'Approved')
      .input('offset', sql.Int, offset)
      .input('perPage', sql.Int, perPage)
      .query(
        'SELECT JobTitleName, RequestNo, JobLvlCode, CompCode, InitiatorName, InitiatorEmail, LocationName, Reason, CreateDate, ApprovalDate, Status, CandidateSource, TaId FROM efpk WHERE Status = @status ORDER BY RequestNo DESC OFFSET @offset ROWS FETCH NEXT @perPage ROWS ONLY',
      );

    const total = await db
      .request()
      .input('status', sql.VarChar, 'Approved')
      .query('SELECT COUNT(*) AS total FROM efpk WHERE Status = @status');

    console.info(data.recordset);

    return {
      data: data?.recordset,
      total: total?.recordset,
    };
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function getAllFullyApprovedFpkTotal(poolName) {
  try {
    const db = await getDb(poolName);

    const data = await db
      .request()
      .input('status', sql.VarChar, 'Approved')
      .query('SELECT COUNT(*) AS total FROM efpk WHERE Status = @status');

    return data?.recordset;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function searchFpk(poolName, query, offset, perPage) {
  try {
    const db = await getDb(poolName);

    const data = await db
      .request()
      .input('query', sql.Text, `%${query}%`)
      .input('offset', sql.Int, offset)
      .input('perPage', sql.Int, perPage)
      .query(
        "SELECT JobTitleName, RequestNo, JobLvlCode, CompCode, InitiatorName, InitiatorEmail, LocationName, Reason, CreateDate, ApprovalDate, Status, CandidateSource, efpk.TaId FROM efpk LEFT JOIN v_users ON efpk.TaId = v_users.id WHERE JobTitleName LIKE @query OR RequestNo LIKE @query OR JobLvlCode LIKE @query OR CompCode LIKE @query OR InitiatorName LIKE @query OR InitiatorEmail LIKE @query OR LocationName LIKE @query OR Reason LIKE @query OR FORMAT(CreateDate, 'dd-MMM-yyyy') LIKE @query OR FORMAT(CONVERT(datetime, ApprovalDate, 103), 'dd-MMM-yyyy') LIKE @query OR Status LIKE @query OR CandidateSource LIKE @query OR v_users.name LIKE @query ORDER BY RequestNo DESC OFFSET @offset ROWS FETCH NEXT @perPage ROWS ONLY",
      );

    const total = await db
      .request()
      .input('query', sql.Text, `%${query}%`)
      .query(
        "SELECT COUNT(*) AS searchTotal FROM efpk LEFT JOIN v_users ON efpk.TaId = v_users.id WHERE JobTitleName LIKE @query OR RequestNo LIKE @query OR JobLvlCode LIKE @query OR CompCode LIKE @query OR InitiatorName LIKE @query OR InitiatorEmail LIKE @query OR LocationName LIKE @query OR Reason LIKE @query OR FORMAT(CreateDate, 'dd-MMM-yyyy') LIKE @query OR FORMAT(CONVERT(datetime, ApprovalDate, 103), 'dd-MMM-yyyy') LIKE @query OR Status LIKE @query OR CandidateSource LIKE @query OR v_users.name LIKE @query",
      );

    return {
      data: data?.recordset,
      total: total?.recordset,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      total: [],
    };
  }
}

export async function getAllTaData(poolName) {
  try {
    const db = await getDb(poolName);

    const data = await db
      .request()
      // .input('roles1', sql.Int, 1)
      .input('roles2', sql.Int, 8)
      .query(
        'SELECT v_users.id AS value, v_users.name AS label FROM ((v_user_has_roles AS v_uhs INNER JOIN v_users ON v_uhs.user_id = v_users.id) INNER JOIN roles ON v_uhs.role_id = roles.id) WHERE v_uhs.role_id = @roles2 ORDER BY v_users.name',
      );

    return data?.recordset;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function assignTaToFpk(poolName, requestNo, taId) {
  try {
    const db = await getDb(poolName);

    await db
      .request()
      .input('requestNo', sql.VarChar, requestNo)
      .input('taId', sql.Numeric, taId)
      .query('UPDATE efpk SET TaId = @taId WHERE RequestNo = @requestNo');
  } catch (e) {
    console.log(e);

    return [];
  }
}
