'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// import * as messages from '@/utils/message';
// import * as confirmations from '@/utils/confirmation';
import { Checkbox, Popover, Spin, message } from 'antd';
import type { CheckboxProps } from 'antd';
import ActionCheckboxPipeline from '../common/popup/action-checkbox-pipeline';
// import RefCheckItem from '../dashboard/employ/ref-check-item';
// const { confirm } = Modal;

type Props = {
  status?: string | any;
  applicantData?: any;
  jobVacancyId?: number | any;
  handleApplicant?: (
    handleType:
      | 'assignAssessment'
      | 'detailAssessment'
      | 'resendAssessment'
      | 'assignInterview'
      | 'resendCandidateInterviewInvitation',
    candidateId: number,
    jobVacancyId: number | any,
    interviewId: number | null,
    api: any,
    router: any,
    setLoading: (loading: boolean) => void,
    status: string,
  ) => void;
};

const RefCheckListItem: React.FC<Props> = ({
  status,
  applicantData,
  jobVacancyId,
  handleApplicant,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [checkboxAllValue, setCheckboxAllValue] = useState(false);
  const [checkbox, setCheckbox] = useState<{ [key: string]: boolean }>({});
  const [popOverState, setPopOverState] = useState(false);

  let initialCheckboxState: { [key: string]: boolean };

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
    if (applicantData) {
      const countTrueValues = Object.values(checkbox).reduce(
        (acc, curr) => acc + (curr ? 1 : 0),
        0,
      );
      if (
        countTrueValues > 0 ||
        (applicantData.length === 1 && countTrueValues === 1)
      ) {
        setPopOverState(true);
      } else {
        setPopOverState(false);
      }

      if (
        countTrueValues > 0 &&
        countTrueValues === Object.keys(checkbox).length
      ) {
        setCheckboxAllValue(true);
      }
    }
  }, [checkbox]);

  useEffect(() => {
    if (applicantData) {
      initialCheckboxState = applicantData?.reduce(
        (acc: { [key: string]: boolean }, item: any, _: string) => {
          return {
            ...acc,
            [item?.candidateId]: false,
          };
        },
        {},
      );

      setCheckbox(initialCheckboxState);
      console.log('Applicant Data: ', applicantData);
      console.log('initial Checkbox: ', initialCheckboxState);
    }
  }, [applicantData]);

  console.log('(global) checkbox: ', checkbox);
  console.log('(global) checkboxAllValue: ', checkboxAllValue);

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
      <div className="d-flex justify-content-between align-items-center mb-20">
        <div>
          <h4 className="sub-main-title">
            {pathname?.endsWith(jobVacancyId)
              ? 'APPLICANT'
              : pathname
                  ?.split('/')
                  [pathname?.split('/')?.length - 1]?.toUpperCase() ?? '-'}
          </h4>
        </div>
        {/* <SearchBar /> */}
      </div>
      {applicantData.length > 0 && (
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
      )}
      <div className="wrapper">
        {/* {applicantData?.map((item: any) => (
          <RefCheckItem
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
        ))} */}
      </div>
    </>
  );
};

export default RefCheckListItem;
