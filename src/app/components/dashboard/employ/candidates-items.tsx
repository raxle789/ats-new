'use client';
import React, { useEffect, useState } from 'react';
// import CandidateDetailsModal from '../../common/popup/candidate-details-modal';
// import ActionCandidatesMenu from './action-candidates-menu';
import Image from 'next/image';
// import { useAppDispatch } from '@/redux/hook';
// import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

const CandidatesItems = ({ candidates }: { candidates: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newDetailParams = new URLSearchParams(searchParams);
  const DynamicCandidateDetails = dynamic(
    () => import('../../common/popup/candidate-details-modal'),
  );
  const DynamicAction = dynamic(() => import('./action-candidates-menu'), {
    ssr: false,
  });
  /* States */
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [details, setDetails] = useState<any>(null); // will be typed soon
  console.info("Details state data \t:", details)

  const fetchDetailCandidate = async (candidateId: number) => {
    const request = await fetch("/api/v1/talent-acq/candidates?for=" + String(candidateId), {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    /* Set Details State */
    setDetails(response)
  };

  const showModal = async (candidateId: number) => {
    /* Get detail candidates by id */
    await fetchDetailCandidate(candidateId);
    setIsOpenModal(true)
  };
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto mt-auto mb-auto">
          <a href="#" className="rounded-circle">
            <Image
              src={candidates?.documents}
              alt="image"
              width={80}
              height={80}
              className="lazy-img rounded-circle"
              width={80}
              height={80}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </a>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-start mb-40">
            <div className="col-lg-3">
              <div className="position-relative mt-1">
                <h4 className="candidate-name mb-0">
                  <a
                    className="tran3s"
                    style={{ cursor: 'pointer' }}
                    onClick={() => showModal(candidates.id)}
                  >
                    {candidates?.users?.name}
                  </a>
                </h4>
                <div className="candidate-info mt-2 mb-4">
                  <span>Last Position</span>
                  <div>{candidates?.working_experiences?.latest_experience}</div>
                </div>
                <div className="candidate-info mt-5">
                  <ul className="candidate-skills style-none d-flex align-items-center">
                    {candidates.candidate_skills.slice(0, 4).map((s: any, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                    {candidates.candidate_skills.length > 4 && (
                      <li className="more">
                        {candidates.candidate_skills.length - candidates.candidate_skills.slice(0, 4).length}+
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Last Education</span>
                <div>{candidates?.educations?.edu_level}</div>
              </div>

              <div className="candidate-info mt-2">
                <span>Expected Salary</span>
                <div>{candidates?.expected_salary}</div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Year of Experience</span>
                <div>{candidates?.working_experiences?.experiences_desc}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>Status</span>
                {/* <div>{item.status}</div> */}
              </div>
            </div>
            <div className="col-xl-1 col-md-4">
              <div className="d-flex justify-content-md-end align-items-center">
                <div className="action-dots float-end mt-10 ms-2">
                  <button
                    className="action-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>
                      <DynamicAction />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DynamicCandidateDetails
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        data={null}
        setDetails={setDetails}
      />
    </div>
  );
};

export default CandidatesItems;
