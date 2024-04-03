import EmployJobParameterItem from './submit-job-parameter-item';
import {
  getPositionLevelRequirementData,
  getAllPositionLevelData,
  getAllLineIndustryData,
  getAllEducationLevelData,
} from '@/lib/action/positionLevelRequirement/action';
import CryptoJS from 'crypto-js';

const EmployJobParameter = async ({ searchParams }) => {
  const query = searchParams ?? {};

  const encryptedValue = Object?.keys(query)?.map((key) => query[key]);

  const decryptedValue = CryptoJS.Rabbit.decrypt(
    String(encryptedValue[0]),
    process.env.NEXT_PUBLIC_SECRET_KEY,
  );

  const originalValue = decryptedValue.toString(CryptoJS.enc.Utf8);

  const positionLevelRequirementData = await getPositionLevelRequirementData(
    Number(originalValue),
  )
    .then((res) => {
      const data = res ?? {};

      return data;
    })
    .catch((e) => console.log('Error getting position level data: ', e));

  const positionLevelData = await getAllPositionLevelData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => console.log('Error getting position level data: ', e));

  const lineIndustryData = await getAllLineIndustryData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => console.log('Error getting line industry data: ', e));

  const educationLevelData = await getAllEducationLevelData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => console.log('Error getting education level data: ', e));

  return (
    <>
      <h2 className="main-title">Edit Position Level Requirement</h2>

      <EmployJobParameterItem
        positionLevelRequirementData={positionLevelRequirementData}
        positionLevelData={positionLevelData}
        lineIndustryData={lineIndustryData}
        educationLevelData={educationLevelData}
      />
    </>
  );
};

export default EmployJobParameter;
