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
import CandidateAssessmentItem from './candidate-assessment-item';
import { useAppDispatch } from '@/redux/hook';
import { setApplicantStep } from '@/redux/features/applicantStepSlice';
import type { CheckboxProps } from 'antd';
import { Checkbox, Popover } from 'antd';
import ActionCheckboxPipeline from '../../common/popup/action-checkbox-pipeline';
import ApplicantsItems from './applicants-item';
import ApplicantMenu from './applicant-menu';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const JobApplicantArea = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  dispatch(setApplicantStep({ currentStep: 1 }));

  const handleJobFpkSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const [keyState, setKeyState] = useState('1');

  const onChange = (key: string) => {
    setKeyState(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Applicant 200',
    },
    {
      key: '2',
      label: 'Shortlisted 200',
    },
    {
      key: '3',
      label: 'Talent Pool 200',
    },
    {
      key: '4',
      label: 'Assessment 200',
    },
    {
      key: '5',
      label: 'Interview 200',
    },
    {
      key: '6',
      label: 'Ref Check 200',
    },
    {
      key: '7',
      label: 'Offering 200',
    },
    {
      key: '8',
      label: 'MCU 200',
    },
    {
      key: '9',
      label: 'Agreement 200',
    },
    {
      key: '10',
      label: 'Boarding 200',
    },
  ];
  return (
    <>
      <div className="d-sm-flex align-items-start justify-content-between mb-10 lg-mb-30">
        <div>
          <h3 className="main-title m0">(internship) Announcer Radio</h3>
          <p>Daniel Sulistio</p>
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
      {/* <div className="nav-bar-responsive d-flex align-items-center justify-content-center mb-40 pb-3 overflow-auto"> */}
      {/* <Link href="#" className="d-flex flex-column align-items-center me-4">
          <span>0</span>
          <span>Applicants</span>
        </Link>
        <Link href="#" className="d-flex flex-column align-items-center me-4">
          <span>0</span>
          <span>Shortlisted</span>
        </Link>
        <Link href="#" className="d-flex flex-column align-items-center me-4">
          <span>0</span>
          <span className="text-center">Talent Pool</span>
        </Link>
        <Link
          href="/dashboard/ta/preview-page/assessment"
          onClick={() =>
            dispatch(setApplicantStep({ currentStep: 'assessment' }))
          }
          className="d-flex flex-column align-items-center me-4"
        >
          <span>3</span>
          <span>Assessment</span>
        </Link>
        <Link
          href="/dashboard/ta/preview-page/interview"
          onClick={() =>
            dispatch(setApplicantStep({ currentStep: 'interview' }))
          }
          className="d-flex flex-column align-items-center me-4"
        >
          <span>0</span>
          <span>Interview</span>
        </Link>
        <Link href="#" className="d-flex flex-column align-items-center me-4">
          <span>0</span>
          <span className="text-center">Ref Check</span>
        </Link>
        <Link href="#" className="d-flex flex-column align-items-center me-4">
          <span>0</span>
          <span>Offering</span>
        </Link>
        <Link href="#" className="d-flex flex-column align-items-center me-4">
          <span>0</span>
          <span>MCU</span>
        </Link>
        <Link href="#" className="d-flex flex-column align-items-center me-4">
          <span>0</span>
          <span>Agreement</span>
        </Link>
        <Link href="#" className="d-flex flex-column align-items-center">
          <span>0</span>
          <span>Boarding</span>
        </Link> */}
      {/* </div> */}

      <div className="d-flex justify-content-end mb-40">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="search-form form-fpk"
        >
          <input
            type="text"
            placeholder="Search here.."
            onChange={(e) => handleJobFpkSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
          />
          <button type="submit">
            <Image src={search} alt="search" className="lazy-img m-auto" />
          </button>
        </form>
      </div>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {keyState === '1' && <ApplicantMenu />}
    </>
  );
};

export default JobApplicantArea;
