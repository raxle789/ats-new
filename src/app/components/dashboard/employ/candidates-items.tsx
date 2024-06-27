'use client';
import React, { useEffect, useState } from 'react';
// import CandidateDetailsModal from '../../common/popup/candidate-details-modal';
// import ActionCandidatesMenu from './action-candidates-menu';
import Image from 'next/image';
// import { useAppDispatch } from '@/redux/hook';
// import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

const CandidatesItems = ({ candidates }: { candidates: any }) => {
  // const router = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  // const newDetailParams = new URLSearchParams(searchParams);
  const DynamicCandidateDetails = dynamic(
    () => import('../../common/popup/candidate-details-modal'),
  );
  const DynamicAction = dynamic(() => import('./action-candidates-menu'), {
    ssr: false,
  });
  /* States */
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [details, setDetails] = useState<any>(null); // will be typed soon
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDetailCandidate = async (candidateId: number) => {
    setLoading(true);
    const request = await fetch(
      '/api/v1/talent-acq/candidates?for=' + String(candidateId),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    setLoading(false);
    const response = await request.json();
    /* Set Details State */
    setDetails(response);
  };

  const showModal = async (candidateId: number) => {
    setIsOpenModal(true);
    /* Get detail candidates by id */
    await fetchDetailCandidate(candidateId);
  };

  useEffect(() => {
    console.log('Details state data:', details);
  }, [details]);

  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto mt-auto mb-auto">
          <a href="#" className="rounded-circle">
            <Image
              src={candidates?.documents}
              alt="image"
              className="lazy-img rounded-circle"
              width={80}
              height={80}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          </a>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-start mb-0">
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
                <div className="candidate-info mt-30">
                  <span>Age</span>
                  <div>-</div>
                </div>
                <div className="candidate-info mt-2">
                  <span>City</span>
                  <div>-</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Last Education</span>
                <div>{candidates?.educations?.edu_level}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>Education Major</span>
                <div>-</div>
              </div>
              <div className="candidate-info mt-10">
                <span>Expected Salary</span>
                <div>
                  {`Rp. ${Number(candidates?.expected_salary)}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    '.',
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Year of Experience</span>
                <div>{candidates?.working_experiences?.experiences_desc}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>Last Position</span>
                <div>{candidates?.working_experiences?.latest_experience}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>Last Company</span>
                <div>-</div>
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
        data={details} // details candidate data
        setDetails={setDetails}
        loading={loading}
      />
    </div>
  );
};

export default CandidatesItems;
