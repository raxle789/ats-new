import EmployJobParameterItem from './submit-job-parameter-item';
import {
  getPositionLevelRequirementData,
  setPositionLevelRequirementData,
  getAllPositionLevelData,
  getAllLineIndustryData,
  getAllEducationLevelData,
} from '@/lib/action/position-level-requirements/action';
import CryptoJS from 'crypto-js';

type Props = {
  params: any;
};

const EmployJobParameter: React.FC<Props> = async ({ params }) => {
  // const encryptedValue = Object?.keys(query)?.map((key) => query[key]);
  // const key: any = process.env.NEXT_PUBLIC_SECRET_KEY;

  // const decryptValue = async () => {
  //   try {
  //     const query = decodeURIComponent(params?.id) ?? '';

  //     const decryptedValue = CryptoJS.Rabbit.decrypt(
  //       String(query),
  //       process.env.NEXT_PUBLIC_SECRET_KEY,
  //     );

  //     const convertString = decryptedValue.toString(CryptoJS.enc.Utf8);

  //     return convertString;
  //   } catch (e) {
  //     return '';
  //   }
  // };

  const positionLevelId = await (async () => {
    try {
      const query = decodeURIComponent(params?.id) ?? '';

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
  })();

  const positionLevelRequirementData = await (async () => {
    if (positionLevelId && positionLevelId != 0) {
      return await getPositionLevelRequirementData(positionLevelId)
        .then((res) => {
          const data = res ?? {};

          return data;
        })
        .catch((e) => {
          console.log('Error getting position level requirement data: ', e);

          return {};
        });
    }

    return {};
  })();

  const positionLevelData = await getAllPositionLevelData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting position level data: ', e);

      return [];
    });

  const lineIndustryData = await getAllLineIndustryData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting line industry data: ', e);

      return [];
    });

  const educationLevelData = await getAllEducationLevelData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Error getting education level data: ', e);

      return [];
    });

  return (
    <>
      <h2 className="main-title">Edit Position Level Requirement</h2>

      <EmployJobParameterItem
        positionLevelRequirementData={positionLevelRequirementData}
        positionLevelData={positionLevelData}
        lineIndustryData={lineIndustryData}
        educationLevelData={educationLevelData}
        setPositionLevelRequirementData={setPositionLevelRequirementData}
      />
    </>
  );
};

export default EmployJobParameter;
