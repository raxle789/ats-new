'use server';

import SubmitJobItem from './submit-job-item';
import * as crypto from '@/lib/utils/utils';
import ErrorSubmitJob from '../../error/error-submit-job';
import {
  getAllEfpkDataByTa,
  getEfpkDataByRequestNo,
  getAllJobTitleData,
  getAllJobFunctionData,
  getAllEmploymentStatusData,
  getAllPositionLevelData,
  getAllVerticalData,
  getAllDepartmentData,
  getAllLineIndustryData,
  getAllRegionData,
  getAllWorkLocationData,
  getAllGenderData,
  getAllSkillData,
  getAllCertificateData,
  getAllTaData,
  getAllUserData,
  getAllDepartmentDataByVertical,
  insertJobVacancy,
  getJobVacancyData,
  editJobVacancy,
} from '@/lib/actions/job-vacancies/action';

const SubmitJobArea = async ({ params, searchParams }) => {
  const taId = 73023;

  const encryptedTaId = await crypto?.encryptData(taId);

  const requestNo = searchParams?.fpk
    ? decodeURIComponent(searchParams?.fpk)
    : '';

  const verticalCode = searchParams?.verticalCode
    ? decodeURIComponent(searchParams?.verticalCode)
    : '';

  const jobVacancyData = await (async () => {
    if (params?.id) {
      return await getJobVacancyData(params?.id);
      // .then((res) => {
      //   const data = res ?? {};

      //   // console.info(data);

      //   return data;
      // })
      // .catch((e) => {
      //   console.log('Failed Getting Job Vacancy Data: ', e);

      //   return {};
      // });
    } else {
      return {};
    }
  })();

  const efpkDataByTa = await getAllEfpkDataByTa(taId)
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting efpk data by ta: ', e);

      return [];
    });

  const efpkDataByRequestNo = await (async () => {
    if (requestNo) {
      return await getEfpkDataByRequestNo(requestNo);
      // .then((res) => {
      //   const data = res ?? {};

      //   return data;
      // })
      // .catch((e) => {
      //   console.log('Failed getting efpk data by request no: ', e);

      //   return {};
      // });
    } else {
      return {};
    }
  })();

  const jobTitleData = await getAllJobTitleData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting job title data: ', e);

      return [];
    });

  const jobFunctionData = await getAllJobFunctionData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting job function data: ', e);

      return [];
    });

  const employmentStatusData = await getAllEmploymentStatusData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting employment status data: ', e);

      return [];
    });

  const positionLevelData = await getAllPositionLevelData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting position level data: ', e);

      return [];
    });

  const verticalData = await getAllVerticalData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting vertical data: ', e);

      return [];
    });

  const departmentData = await getAllDepartmentData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting department data: ', e);

      return [];
    });

  // const departmentData = await (async () => {
  //   if (!verticalCode) {
  //     return await getAllDepartmentData()
  //       .then((res) => {
  //         const data = res ?? [];

  //         return data;
  //       })
  //       .catch((e) => console.log('Failed getting department data: ', e));
  //   } else {
  //     return getAllDepartmentDataByVertical(verticalCode)
  //       .then((res) => {
  //         const data = res ?? [];

  //         return data;
  //       })
  //       .catch((e) =>
  //         console.log('Failed getting department data by vertical: ', e),
  //       );
  //   }
  // })();

  const lineIndustryData = await getAllLineIndustryData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting line industry data: ', e);

      return [];
    });

  const regionData = await getAllRegionData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting region data: ', e);

      return [];
    });

  const workLocationData = await getAllWorkLocationData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting work location data: ', e);

      return [];
    });

  const genderData = await getAllGenderData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting gender data: ', e);

      return [];
    });

  const skillData = await getAllSkillData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting skill data: ', e);

      return [];
    });

  const certificateData = await getAllCertificateData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting certificate data: ', e);

      return [];
    });

  const taData = await getAllTaData(taId)
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting ta data: ', e);

      return [];
    });

  const userData = await getAllUserData(taId)
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed getting user data: ', e);

      return [];
    });

  const submitJobVacancy = (() => {
    switch (params?.mode) {
      case 'create':
        return insertJobVacancy;
      case 'update':
        return editJobVacancy;
      case 'duplicate':
        return insertJobVacancy;
    }
  })();

  return (
    <>
      {/* {efpkDataByTa?.length <= 0 ||
      efpkDataByTa === undefined ||
      !efpkDataByTa ? (
        <ErrorSubmitJob />
      ) : (
        <>
          <h2 className="main-title">Post a New Job</h2>

          <SubmitJobItem efpkData={efpkDataByTa} />
        </>
      )} */}

      <SubmitJobItem
        mode={params?.mode}
        jobVacancyData={jobVacancyData}
        taId={encryptedTaId}
        efpkData={efpkDataByTa}
        efpkDataByRequestNo={efpkDataByRequestNo}
        jobTitleData={jobTitleData}
        jobFunctionData={jobFunctionData}
        employmentStatusData={employmentStatusData}
        positionLevelData={positionLevelData}
        verticalData={verticalData}
        departmentData={departmentData}
        lineIndustryData={lineIndustryData}
        regionData={regionData}
        workLocationData={workLocationData}
        genderData={genderData}
        skillData={skillData}
        certificateData={certificateData}
        taData={taData}
        userData={userData}
        submitJobVacancy={submitJobVacancy}
      />

      {/* ) : params?.mode === 'update' ? (
        <>
          <SubmitJobItem
            mode={params?.mode}
            jobVacancyData={jobVacancyData}
            taId={encryptedTaId}
            efpkData={efpkDataByTa}
            efpkDataByRequestNo={efpkDataByRequestNo}
            jobTitleData={jobTitleData}
            jobFunctionData={jobFunctionData}
            employmentStatusData={employmentStatusData}
            positionLevelData={positionLevelData}
            verticalData={verticalData}
            departmentData={departmentData}
            lineIndustryData={lineIndustryData}
            regionData={regionData}
            workLocationData={workLocationData}
            genderData={genderData}
            skillData={skillData}
            certificateData={certificateData}
            taData={taData}
            userData={userData}
            submitJobVacancy={updateJobVacancy}
          />
        </>
      ) : (
        <>
          <SubmitJobItem
            mode={params?.mode}
            jobVacancyData={jobVacancyData}
            taId={encryptedTaId}
            efpkData={efpkDataByTa}
            efpkDataByRequestNo={efpkDataByRequestNo}
            jobTitleData={jobTitleData}
            jobFunctionData={jobFunctionData}
            employmentStatusData={employmentStatusData}
            positionLevelData={positionLevelData}
            verticalData={verticalData}
            departmentData={departmentData}
            lineIndustryData={lineIndustryData}
            regionData={regionData}
            workLocationData={workLocationData}
            genderData={genderData}
            skillData={skillData}
            certificateData={certificateData}
            taData={taData}
            userData={userData}
            submitJobVacancy={insertJobVacancy}
          />
        </>
      )} */}
    </>
  );
};

export default SubmitJobArea;
