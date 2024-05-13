import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EmployJobItem from './job-item';
import EmployShortSelect from './short-select';
import ActionDropdownJobDetails from '../candidate/action-dropdown-job-details';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import candidate_data from '@/data/candidate-data';
import CandidateAssessmentItem from './candidate-assessment-item';
import SearchBar from '@/ui/search-bar';
import { Modal, Menu, Popover, Checkbox } from 'antd';
import type { CollapseProps, CheckboxProps, MenuProps } from 'antd';
import { Collapse } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setApplicantStep } from '@/redux/features/applicantStepSlice';
import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import ActionCheckboxPipeline from '../../common/popup/action-checkbox-pipeline';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const profileItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Main Profile',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'Address Information',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'Education History',
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: 'Language Abilities',
    children: <p>{text}</p>,
  },
  {
    key: '5',
    label: 'Work Experience',
    children: <p>{text}</p>,
  },
  {
    key: '6',
    label: 'Family Structure',
    children: <p>{text}</p>,
  },
  {
    key: '7',
    label: 'Main Family',
    children: <p>{text}</p>,
  },
  {
    key: '8',
    label: 'Additional Information',
    children: <p>{text}</p>,
  },
];

const documentItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Personal Information',
    children: <p>{text}</p>,
  },
];

const items: MenuProps['items'] = [
  {
    label: 'Profile',
    key: 'profile',
  },
  {
    label: 'Document',
    key: 'document',
  },
  {
    label: 'Application History',
    key: 'applicationHistory',
  },
  {
    label: 'Candidate History',
    key: 'candidateHistory',
  },
];

const CandidateAssessment = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  dispatch(setApplicantStep({ currentStep: 4 }));

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

  // const isModalOpen = useAppSelector((state) => state.candidateModal.isOpen);
  const handleCancel = () => {
    dispatch(setIsOpen(false));
  };

  const [current, setCurrent] = useState('profile');
  const onClickHandle: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

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
      <div className="nav-bar-responsive d-flex align-items-center justify-content-center mb-40 pb-3 overflow-auto">
        <Link href="#" className="d-flex flex-column align-items-center me-4">
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
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 4 }))}
        >
          <span>3</span>
          <span>Assessment</span>
        </Link>
        <Link
          href="/dashboard/ta/preview-page/interview"
          onClick={() => dispatch(setApplicantStep({ currentStep: 5 }))}
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
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-40">
        <div>
          <h4 className="sub-main-title">Assessment</h4>
        </div>
        <SearchBar />
      </div>

      {/* <div className="dash-pagination d-flex justify-content-end mt-30">
        <ul className="style-none d-flex align-items-center">
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>..</li>
          <li>
            <a href="#">7</a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </div> */}
      {/* start modal */}
      <Modal
        title="Candidate Details"
        centered
        // open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="custom-modal-wrapper"
      >
        <Menu
          onClick={onClickHandle}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {current === 'profile' && (
          <div className="mt-3">
            <Collapse items={profileItems} defaultActiveKey={['1']} />
          </div>
        )}
        {current === 'document' && (
          <div className="mt-3">
            <Collapse items={documentItems} defaultActiveKey={['1']} />
          </div>
        )}
      </Modal>
      {/* end modal */}
    </>
  );
};

export default CandidateAssessment;
