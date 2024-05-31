import EmployJobParameterItem from './submit-job-parameter-item';
import * as crypto from '@/lib/utils/utils';
import {
  getPositionLevelRequirementData,
  setPositionLevelRequirementData,
  getAllPositionLevelData,
  getAllLineIndustryData,
  getAllEducationLevelData,
} from '@/lib/actions/position-level-requirements/action';

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

  const positionLevelId = await crypto.decryptData(params?.id);

  const positionLevelRequirementData = await (async () => {
    if (positionLevelId) {
      return await getPositionLevelRequirementData(positionLevelId)
        .then((res) => {
          const data = res ?? {};

          // console.info(data);

          return data;
        })
        .catch((e) => {
          console.log("Failed Getting Position Level Requirement's Data: ", e);

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
      console.log("Failed Getting Position Level's Data: ", e);

      return [];
    });

  const lineIndustryData = await getAllLineIndustryData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log("Failed Getting Line Industry's Data: ", e);

      return [];
    });

  const educationLevelData = await getAllEducationLevelData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log("Failed Getting Education Level's Data: ", e);

      return [];
    });

  return (
    <>
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
