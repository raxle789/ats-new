import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EmployJobItem from './job-item';
import EmployShortSelect from './short-select';
import ActionDropdownJobDetails from '../candidate/action-dropdown-job-details';
import Image from 'next/image';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import candidate_data from '@/data/candidate-data';
import CandidateInterviewItem from './candidate-interview-item';
import SearchBar from '@/ui/search-bar';
import { useAppDispatch } from '@/redux/hook';
import { setApplicantStep } from '@/redux/features/applicantStepSlice';
import { Popover, Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import ActionCheckboxPipeline from '../../common/popup/action-checkbox-pipeline';

const CandidateInterview = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  dispatch(setApplicantStep({ currentStep: 'interview' }));

  const handleJobFpkSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);
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
      <div className="d-sm-flex align-items-start justify-content-between mb-10 lg-mb-30">
        <div>
          <h3 className="main-title m0">Candidates</h3>
        </div>
        <div className="d-flex ms-auto xs-mt-30">
          <div className="short-filter ms-auto">
            <div className="action-dots float-end mt-10 ms-2">
              <button
                className="action-btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span></span>
              </button>
              <ActionDropdownJobDetails />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-40">
        <div>
          <h4 className="sub-main-title">Interview</h4>
        </div>
        <SearchBar />
      </div>

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
          <CandidateInterviewItem
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

export default CandidateInterview;
