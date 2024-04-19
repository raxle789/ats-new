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
  const key: any = process.env.NEXT_PUBLIC_SECRET_KEY;
  const decryptValue = async () => {
    try {
      const query = (await decodeURIComponent(params.id)) ?? '';

      const decryptedValue = await CryptoJS.Rabbit.decrypt(String(query), key);

      const convertString = await decryptedValue.toString(CryptoJS.enc.Utf8);

      return convertString;
    } catch (e) {
      return '';
    }
  };

  const originalValue = await decryptValue();

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
