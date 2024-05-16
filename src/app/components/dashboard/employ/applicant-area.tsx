'use client';

import React, { useState, useEffect } from 'react';
import { Checkbox, Popover } from 'antd';
import type { CheckboxProps } from 'antd';
import ActionCheckboxPipeline from '../../common/popup/action-checkbox-pipeline';
import ApplicantsItems from './applicant-item';
import candidate_data from '@/data/candidate-data';

const ApplicantArea = () => {
  const candidate_items = candidate_data.slice(0, 10);
  const initialCheckboxState = candidate_data?.reduce(
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
        {candidate_items.map((item) => (
          <ApplicantsItems
            key={item.id}
            item={item}
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

export default ApplicantArea;
