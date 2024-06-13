'use client';

import React, { useState, useEffect } from 'react';
import SpinFullScreen from '@/ui/spin-full-screen';
import SubmitPositionLevelRequirementForm from '../../forms/submit-position-level-requirement-form';
import _ from 'lodash';
import * as confirmations from '@/utils/confirmation';
import * as messages from '@/utils/message';
import { useRouter, usePathname } from 'next/navigation';
import { message, Form, Modal } from 'antd';
// import {
//   yearOfExperienceMarks,
//   educationLevelMarks,
//   gradeMarks,
//   ageMarks,
// } from '@/data/job-posting-data';
// import { fpkData } from './job-fpk';
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;
const { confirm } = Modal;

type Props = {
  positionLevelRequirementData: any;
  positionLevelData: any;
  lineIndustryData: any;
  educationLevelData: any;
  setPositionLevelRequirementData: any;
};

const SubmitPositionLevelRequirementItem: React.FC<Props> = ({
  positionLevelRequirementData,
  positionLevelData,
  lineIndustryData,
  educationLevelData,
  setPositionLevelRequirementData,
}) => {
  const [api, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // const openNotification = (placement) => {
  //   api.info({
  //     message: `Notification ${placement}`,
  //     description: (
  //       <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
  //     ),
  //     placement,
  //   });
  // };

  // const formRef = useRef({});

  // console.info(positionLevelRequirementData);

  // console.info(positionLevelData);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (
      positionLevelRequirementData &&
      !_.isEmpty(positionLevelRequirementData)
    ) {
      if (
        positionLevelRequirementData?.positionLevelRequirements &&
        positionLevelRequirementData?.positionLevelRequirements?.length
      ) {
        positionLevelRequirementData?.positionLevelRequirements?.forEach(
          (data) => {
            if (data?.requirementFields?.name === 'salary') {
              form.setFieldsValue({
                start_salary:
                  data?.value === null ||
                  data?.value === undefined ||
                  !data?.value
                    ? null
                    : data?.value?.start_salary,
                end_salary:
                  data?.value === null ||
                  data?.value === undefined ||
                  !data?.value
                    ? null
                    : data?.value?.end_salary,
              });
            } else {
              form.setFieldsValue({
                [data?.requirementFields?.name]:
                  data?.value === null ||
                  data?.value === undefined ||
                  !data?.value
                    ? null
                    : data?.value,
              });
            }

            // if (data?.requirementFields?.name !== 'salary') {
            //   try {
            //     const data2 = JSON.parse(data?.value);

            //     const isArray = Array.isArray(data2);

            //     if (isArray) {
            //       form.setFieldsValue({
            //         [data?.requirementFields?.name]: data2,
            //       });
            //     } else {
            //       if (data.value === null || data.value === '') {
            //         form.setFieldsValue({ [data.requirementFields.name]: null });
            //       } else {
            //         const numberValue = Number(data?.value);
            //         form.setFieldsValue({
            //           [data?.requirementFields?.name]: isNaN(numberValue)
            //             ? data?.value
            //             : numberValue,
            //         });
            //       }
            //     }
            //   } catch (e) {
            //     if (data.value === null || data.value === '') {
            //       form.setFieldsValue({ [data.requirementFields.name]: null });
            //     } else {
            //       const numberValue = Number(data?.value);
            //       form.setFieldsValue({
            //         [data?.requirementFields?.name]: isNaN(numberValue)
            //           ? data?.value
            //           : numberValue,
            //       });
            //     }
            //   }
            // } else if (data?.requirementFields?.name === 'salary') {
            //   const data2 = JSON.parse(data?.value);

            //   form.setFieldsValue({
            //     [data?.requirementFields?.name]: {
            //       start_salary: data2 ? Number(data2[0]) : null,
            //       end_salary: data2 ? Number(data2[1]) : null,
            //     },
            //   });
            // }
          },
        );
      }

      form.setFieldsValue({
        positionLevelId: positionLevelRequirementData?.id,
      });
    }
  }, [positionLevelRequirementData]);

  // const toggleRowExpansion = (index: number) => {
  //   setExpandedRows((prevExpandedRows) => ({
  //     ...prevExpandedRows,
  //     [index]: !prevExpandedRows[index],
  //   }));
  // };

  // const showLoader = (show: boolean) => {
  //   setLoading(show);
  //   // setTimeout(() => {
  //   //   setLoading(false);
  //   // }, 3000);
  // };

  function handleSubmitPositionLevelRequirement(values) {
    setLoading(true);

    confirm({
      ...confirmations.submitConfirmation('positionLevelRequirement'),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const validate = await setPositionLevelRequirementData(values);

            if (validate?.success) {
              messages.success(api, validate?.message);

              resolve(
                new Promise<void>((resolve) => {
                  setTimeout(
                    () => resolve(router.replace('/dashboard/ta/parameter')),
                    1000,
                  );
                }),
              );
            } else {
              messages.error(api, validate?.message);

              form.resetFields();

              router.refresh();

              resolve(setLoading(false));
            }
          }, 2000);
        }).catch((e) =>
          console.log("Failed Setting Position Level's Requirement: ", e),
        );
      },
      onCancel() {
        setLoading(false);
      },
    });

    // confirm({
    //   title: 'Confirmation',
    //   icon: <ExclamationCircleFilled />,
    //   centered: true,
    //   content: "Do you want to submit this position level's requirements?",
    //   onOk() {
    //     return new Promise<void>((resolve, reject) => {
    //       setTimeout(async () => {
    //         const validate = await setPositionLevelRequirementData(values);

    //         if (validate?.success) {
    //           messages.success(api, validate?.message);

    //           resolve(
    //             new Promise<void>((resolve) => {
    //               setTimeout(
    //                 () => resolve(router.replace('/dashboard/ta/parameter')),
    //                 1000,
    //               );
    //             }),
    //           );
    //         } else {
    //           messages.error(api, validate?.message);

    //           form.resetFields();

    //           router.refresh();
    //         }

    //         // form.resetFields();

    //         // router.refresh();

    //         // resolve(
    //         //   new Promise<void>((resolve) => {
    //         //     setTimeout(
    //         //       () => resolve(router.replace('/dashboard/ta/parameter')),
    //         //       1000,
    //         //     );
    //         //   }),
    //         // );
    //       }, 2000);
    //     }).catch((e) =>
    //       console.log("Failed Set Position Level's Requirement: ", e),
    //     );
    //   },
    //   onCancel() {
    //     setLoading(false);

    //     router.refresh();
    //   },
    // });
  }

  function handleCancel() {
    setLoading(true);

    confirm({
      ...confirmations.cancelConfirmation('positionLevelRequirement'),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            resolve(router.push(`/dashboard/ta/position-level-requirement`));
          }, 2000);
        }).catch((e) =>
          console.log(
            "Failed Cancel Setting Position Level's Requirement: ",
            e,
          ),
        );
      },
      onCancel() {
        setLoading(false);
      },
    });
  }

  return (
    <>
      {contextHolder}

      <SpinFullScreen loading={loading} />

      <h2 className="main-title">
        Edit {positionLevelRequirementData?.name} Position Level Requirement
      </h2>

      <SubmitPositionLevelRequirementForm
        form={form}
        handleSubmitPositionLevelRequirement={
          handleSubmitPositionLevelRequirement
        }
        positionLevelData={positionLevelData}
        lineIndustryData={lineIndustryData}
        educationLevelData={educationLevelData}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default SubmitPositionLevelRequirementItem;
