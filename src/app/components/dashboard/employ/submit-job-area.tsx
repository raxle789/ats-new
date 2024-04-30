'use server';

import SubmitJobItem from './submit-job-item';
import CryptoJS from 'crypto-js';
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
  updateJobVacancy,
} from '@/lib/action/job-vacancies/action';

const SubmitJobArea = async ({ params, searchParams }) => {
  const jobVacancyId = (() => {
    if (params?.id) {
      try {
        const query = decodeURIComponent(params?.id);

        const decryptedValue = CryptoJS.Rabbit.decrypt(
          String(query),
          process.env.NEXT_PUBLIC_SECRET_KEY,
        );

        const convertString = decryptedValue.toString(CryptoJS.enc.Utf8);

        const originalValue = Number(convertString);

        return originalValue;
      } catch (e) {
        console.log(e);

        return 0;
      }
    }
  })();

  const taId = 73023;

  const encryptedTaId = CryptoJS.Rabbit.encrypt(
    String(73023),
    process.env.NEXT_PUBLIC_SECRET_KEY,
  ).toString();

  const requestNo = searchParams?.fpk
    ? decodeURIComponent(searchParams?.fpk)
    : '';

  const verticalCode = searchParams?.verticalCode
    ? decodeURIComponent(searchParams?.verticalCode)
    : '';

  const jobVacancyData = await (async () => {
    if (jobVacancyId && jobVacancyId !== 0) {
      return await getJobVacancyData(jobVacancyId)
        .then((res) => {
          const data = res ?? {};

          // console.info(data);

          return data;
        })
        .catch((e) => {
          console.log('Error getting job vacancy data: ', e);

          return {};
        });
    }

    return {};
  })();

  const efpkDataByTa = await getAllEfpkDataByTa(taId)
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting efpk data by ta: ', e);

      return [];
    });

  const efpkDataByRequestNo = await (async () => {
    if (requestNo) {
      return await getEfpkDataByRequestNo(requestNo)
        .then((res) => {
          const data = res ?? {};

          return data;
        })
        .catch((e) => {
          console.log('Error getting efpk data by request no: ', e);

          return {};
        });
    }

    return {};
  })();

  const jobTitleData = await getAllJobTitleData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting job title data: ', e);

      return [];
    });

  const jobFunctionData = await getAllJobFunctionData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting job function data: ', e);

      return [];
    });

  const employmentStatusData = await getAllEmploymentStatusData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting employment status data: ', e);

      return [];
    });

  const positionLevelData = await getAllPositionLevelData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting position level data: ', e);

      return [];
    });

  const verticalData = await getAllVerticalData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting vertical data: ', e);

      return [];
    });

  const departmentData = await getAllDepartmentData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting department data: ', e);

      return [];
    });

  // const departmentData = await (async () => {
  //   if (!verticalCode) {
  //     return await getAllDepartmentData()
  //       .then((res) => {
  //         const data = res ?? [];

  //         return data;
  //       })
  //       .catch((e) => console.log('Error getting department data: ', e));
  //   } else {
  //     return getAllDepartmentDataByVertical(verticalCode)
  //       .then((res) => {
  //         const data = res ?? [];

  //         return data;
  //       })
  //       .catch((e) =>
  //         console.log('Error getting department data by vertical: ', e),
  //       );
  //   }
  // })();

  const lineIndustryData = await getAllLineIndustryData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting line industry data: ', e);

      return [];
    });

  const regionData = await getAllRegionData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting region data: ', e);

      return [];
    });

  const workLocationData = await getAllWorkLocationData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting work location data: ', e);

      return [];
    });

  const genderData = await getAllGenderData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting gender data: ', e);

      return [];
    });

  const skillData = await getAllSkillData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting skill data: ', e);

      return [];
    });

  const certificateData = await getAllCertificateData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting certificate data: ', e);

      return [];
    });

  const taData = await getAllTaData(taId)
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting ta data: ', e);

      return [];
    });

  const userData = await getAllUserData(taId)
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting user data: ', e);

      return [];
    });

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
      {!jobVacancyId ? (
        <>
          <SubmitJobItem
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
      ) : (
        <>
          <SubmitJobItem
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
      )}
    </>
  );
};

export default SubmitJobArea;
