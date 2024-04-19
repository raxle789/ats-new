import React, { useState } from 'react';
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
import CandidateDetailsModal from '../../common/popup/candidate-details-modal';
import { useAppDispatch } from '@/redux/hook';
import { setApplicantStep } from '@/redux/features/applicantStepSlice';

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
  const candidate_items = candidate_data.slice(0, 3);
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
          onClick={() =>
            dispatch(setApplicantStep({ currentStep: 'assessment' }))
          }
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
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-40">
        <div>
          <h4 className="sub-main-title">Interview</h4>
        </div>
        {/* <form
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
        </form> */}
        <SearchBar />
      </div>

      <div className="wrapper">
        {candidate_items.map((item) => (
          <CandidateInterviewItem key={item.id} item={item} />
        ))}
      </div>

      {/* start modal */}
      <CandidateDetailsModal />
      {/* end modal */}
    </>
  );
};

export default CandidateInterview;
