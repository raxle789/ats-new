import EmployJobParameterItem from './submit-job-parameter-item';
import {
  getPositionLevelRequirementData,
  setPositionLevelRequirementData,
  getAllPositionLevelData,
  getAllLineIndustryData,
  getAllEducationLevelData,
} from '@/lib/action/positionLevelRequirement/action';
import CryptoJS from 'crypto-js';

const EmployJobParameter = async ({ searchParams }) => {
  const query = searchParams ?? {};

  const encryptedQuery = Object?.keys(query)?.map((key) => query[key]);
  const encryptedValue = JSON.stringify({ encryptedQuery }).toString();

  console.info('encryptedQuery: ', encryptedQuery);
  console.info('encryptedValue: ', encryptedValue);

  // const info2 = CryptoJS.AES.decrypt(
  //   encryptedValue,
  //   process.env.NEXT_PUBLIC_SECRET_KEY,
  // ).toString(CryptoJS.enc.Utf8);

  const key: string | WordArray = process.env.NEXT_PUBLIC_SECRET_KEY;

  const decryptedValue = CryptoJS.Rabbit.decrypt(encryptedValue[0], key);

  console.info('decryptedValue: ', decryptedValue);

  const originalValue = decryptedValue.toString(CryptoJS.enc.Utf8);
  console.log('originalValue: ', originalValue);

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
        setPositionLevelRequirementData={setPositionLevelRequirementData}
      />
    </>
  );
};

export default EmployJobParameter;
