'use client';
import React, { useState } from 'react';
// import CandidateDetailsModal from '../../common/popup/candidate-details-modal';
// import ActionCandidatesMenu from './action-candidates-menu';
import { ICandidate } from '@/data/candidate-data';
import Image from 'next/image';
// import { useAppDispatch } from '@/redux/hook';
// import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import dynamic from 'next/dynamic';

const CandidatesItems = ({ item }: { item: ICandidate }) => {
  const DynamicCandidateDetails = dynamic(
    () => import('../../common/popup/candidate-details-modal'),
  );
  const DynamicAction = dynamic(() => import('./action-candidates-menu'), {
    ssr: false,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const showModal = () => {
    setIsOpenModal(true);
  };
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto mt-auto mb-auto">
          <a href="#" className="rounded-circle">
            <Image
              src={item.img}
              alt="image"
              className="lazy-img rounded-circle"
              style={{ height: 'auto' }}
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
                    onClick={showModal}
                  >
                    {item.name}
                  </a>
                </h4>
                <div className="candidate-info mt-2 mb-4">
                  <span>Last Position</span>
                  <div>{item.latestPosition}</div>
                </div>
                {/* <div className="candidate-info mt-5">
                  <ul className="candidate-skills style-none d-flex align-items-center">
                    {item.skills.slice(0, 4).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                    {item.skills.length > 4 && (
                      <li className="more">
                        {item.skills.length - item.skills.slice(0, 4).length}+
                      </li>
                    )}
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Last Education</span>
                <div>{item.education}</div>
              </div>

              <div className="candidate-info mt-2">
                <span>Expected Salary</span>
                <div>{item.expectedSalary}</div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Year of Experience</span>
                <div>{item.yearExperience}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>Status</span>
                <div>{item.status}</div>
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
      />
    </div>
  );
};

export default CandidatesItems;
