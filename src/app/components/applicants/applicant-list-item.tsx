'use client';

import React, { useState, useEffect } from 'react';
import { handleApplicant } from '../message/confirm';
import { useRouter } from 'next/navigation';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';
import { Checkbox, Popover, Spin, Modal, message } from 'antd';
import type { CheckboxProps } from 'antd';
import ActionCheckboxPipeline from '../common/popup/action-checkbox-pipeline';
import ApplicantItem from '../dashboard/employ/applicant-item';

const { confirm } = Modal;

const ApplicantListItem = ({
  status,
  applicantData,
  jobVacancyId,
  registerAssessment,
}) => {
  const router = useRouter();

  const [api, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const initialCheckboxState = applicantData?.reduce(
    (acc: { [key: string]: boolean }, _: any, index: string) => {
      return {
        ...acc,
        [index]: false,
      };
    },
    {},
  );

  const [checkboxAllValue, setCheckboxAllValue] = useState(false);

  const [checkbox, setCheckbox] = useState<{ [key: string]: boolean }>(
    initialCheckboxState,
  );

  const [popOverState, setPopOverState] = useState(false);

  const onChangeCheckboxAll: CheckboxProps['onChange'] = (e) => {
    const checked = e.target.checked;
    const updatedCheckbox: { [key: string]: boolean } = {};

    Object.keys(checkbox).forEach((key: string) => {
      updatedCheckbox[key] = checked;
    });

    setCheckbox(updatedCheckbox);
    setCheckboxAllValue(checked);
  };

  useEffect(() => {
    const countTrueValues = Object.values(checkbox).reduce(
      (acc, curr) => acc + (curr ? 1 : 0),
      0,
    );
    if (countTrueValues > 1) {
      setPopOverState(true);
    } else {
      setPopOverState(false);
    }
  }, [checkbox]);

  // function handleApplicant(handleType: 'assignAssessment', candidateId) {
  //   switch (handleType) {
  //     case 'assignAssessment': {
  //       confirm({
  //         ...confirmations?.assignConfirmation('assessment'),
  //         onOk() {
  //           return new Promise<void>((resolve, reject) => {
  //             setTimeout(async () => {
  //               const validate = await registerAssessment(
  //                 candidateId,
  //                 jobVacancyId,
  //               );

  //               if (validate?.success) {
  //                 messages.success(api, validate?.message);

  //                 router.refresh();
  //               } else {
  //                 messages.error(api, validate?.message);

  //                 router.refresh();
  //               }

  //               resolve(setLoading(false));
  //             }, 2000);
  //           }).catch((e) =>
  //             console.log('Failed Assign This Candidate to Assessment: ', e),
  //           );
  //         },
  //         onCancel() {
  //           router.refresh();

  //           setLoading(false);
  //         },
  //       });
  //     }
  //   }
  // }

  return (
    <>
      {contextHolder}

      <Spin spinning={loading} fullscreen />

      <div className="card-checkbox">
        <Popover
          content={<ActionCheckboxPipeline />}
          trigger="click"
          open={popOverState}
          placement="right"
        >
          <Checkbox
            onChange={onChangeCheckboxAll}
            checked={checkboxAllValue}
          ></Checkbox>
        </Popover>
      </div>
      <div className="wrapper">
        {applicantData?.map((item) => (
          <ApplicantItem
            key={item?.candidateId}
            item={item}
            status={status}
            checkboxState={checkbox}
            checkboxAllValue={checkboxAllValue}
            setCheckbox={setCheckbox}
            setCheckboxAllValue={setCheckboxAllValue}
            jobVacancyId={jobVacancyId}
            api={api}
            router={router}
            setLoading={setLoading}
            handleApplicant={handleApplicant}
          />
        ))}
      </div>
    </>
  );
};

export default ApplicantListItem;
