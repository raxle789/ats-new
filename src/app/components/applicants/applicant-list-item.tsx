'use client';

import React, { useState, useEffect } from 'react';
import { Checkbox, Popover } from 'antd';
import type { CheckboxProps } from 'antd';
import ActionCheckboxPipeline from '../common/popup/action-checkbox-pipeline';
import ApplicantsItems from '../dashboard/employ/applicant-item';

const ApplicantListItem = ({ status, applicantData }) => {
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

  return (
    <>
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
          <ApplicantsItems
            key={item?.candidateId}
            item={item}
            status={status}
            checkboxState={checkbox}
            checkboxAllValue={checkboxAllValue}
            setCheckbox={setCheckbox}
            setCheckboxAllValue={setCheckboxAllValue}
          />
        ))}
      </div>
    </>
  );
};

export default ApplicantListItem;
