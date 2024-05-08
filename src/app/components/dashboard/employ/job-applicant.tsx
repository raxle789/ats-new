import React from 'react';
import Link from 'next/link';
import ActionDropdownJobDetails from '../candidate/action-dropdown-job-details';
import SearchBar from '@/ui/search-bar';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setApplicantStep } from '@/redux/features/applicantStepSlice';
import ApplicantArea from './applicant-area';
import AssessmentArea from './assessment-area';

const JobApplicantArea = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // dispatch(setApplicantStep({ currentStep: 1 }));

  const handleJobFpkSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const partState = useAppSelector((state) => state.applicantStep.step);
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
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 1 }))}
        >
          <span>0</span>
          <span>Applicants</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 2 }))}
        >
          <span>0</span>
          <span>Shortlisted</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 3 }))}
        >
          <span>0</span>
          <span className="text-center">Talent Pool</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 4 }))}
        >
          <span>3</span>
          <span>Assessment</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 5 }))}
        >
          <span>0</span>
          <span>Interview</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 6 }))}
        >
          <span>0</span>
          <span className="text-center">Ref Check</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 7 }))}
        >
          <span>0</span>
          <span>Offering</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 8 }))}
        >
          <span>0</span>
          <span>MCU</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center me-4"
          onClick={() => dispatch(setApplicantStep({ currentStep: 9 }))}
        >
          <span>0</span>
          <span>Agreement</span>
        </Link>
        <Link
          href=""
          className="d-flex flex-column align-items-center"
          onClick={() => dispatch(setApplicantStep({ currentStep: 10 }))}
        >
          <span>0</span>
          <span>Boarding</span>
        </Link>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-40">
        <div>
          {partState === 1 && <h4 className="sub-main-title">Applicant</h4>}
          {partState === 4 && <h4 className="sub-main-title">Assessment</h4>}
          {partState === 5 && <h4 className="sub-main-title">Interview</h4>}
        </div>
        <SearchBar />
      </div>

      {partState === 1 && <ApplicantArea />}
      {partState === 4 && <AssessmentArea />}
      {/* {partState === 5 && <ApplicantArea />} */}
    </>
  );
};

export default JobApplicantArea;
