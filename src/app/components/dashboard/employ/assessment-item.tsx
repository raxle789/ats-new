'use client';

import React, { SetStateAction } from 'react';
import img_2 from '@/assets/images/candidates/img_02.jpg';
import ActionCandidate from './action-card-candidate';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hook';
import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import { Checkbox } from 'antd';

const AssessmentItems = ({
  item,
  status,
  checkboxState,
  checkboxAllValue,
  setCheckbox,
  setCheckboxAllValue,
  jobVacancyId,
  api,
  router,
  setLoading,
  handleApplicant,
}) => {
  const dispatch = useAppDispatch();
  const showModal = () => {
    dispatch(setIsOpen(true));
  };

  const onChangeCheckbox = (index: number) => {
    setCheckbox((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));

    if (checkboxAllValue || !checkboxState[index]) {
      setCheckboxAllValue(false);
    }
  };
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto mt-auto mb-auto">
          <div className="checkbox-pipeline-action">
            <Checkbox
              className="me-2"
              checked={checkboxState[item.id]}
              onChange={() => onChangeCheckbox(item.id)}
            ></Checkbox>
          </div>
          <a href="#" className="rounded-circle">
            <Image
              src={item?.candidatePhoto ?? img_2}
              alt="image"
              className="lazy-img rounded-circle"
              width="80"
              height="80"
              // style={{ width: '80', height: '80' }}
            />
          </a>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-start">
            <div className="col-lg-3">
              <div className="position-relative mt-1">
                <h4 className="candidate-name mb-0">
                  <a
                    className="tran3s"
                    style={{ cursor: 'pointer' }}
                    onClick={showModal}
                  >
                    {item?.candidateName ?? '-'}
                  </a>
                </h4>
                <div className="candidate-info mt-2 mb-4">
                  <span>Last Position</span>
                  <div>{item?.candidateLastPosition ?? '-'}</div>
                </div>
                <div className="candidate-info mt-5">
                  <ul className="candidate-skills style-none d-flex align-items-center">
                    {item?.candidateSkills
                      ? item?.candidateSkills
                          .slice(0, 4)
                          .map((s, i) => <li key={i}>{s}</li>)
                      : null}
                    {item?.candidateSkills?.length > 4 && (
                      <li className="more">
                        {item?.candidateSkills?.length -
                          item?.candidateSkills?.slice(0, 4).length}
                        +
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Start Test</span>
                <div>{item?.candidateAssessmentStartDate ?? '-'}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>End Test</span>
                <div>{item?.candidateAssessmentFinishedDate ?? '-'}</div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Test Name</span>
                <div>{item?.candidateAssessmentTestName ?? '-'}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>Status</span>
                <div>{item?.candidateAssessmentStatus ?? '-'}</div>
              </div>
              {/* <div className="candidate-info mt-2">
                <span>Score</span>
                <div>{item?.candidateScore ?? '-'}</div>
              </div> */}
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
                      <ActionCandidate
                        status={status}
                        candidateId={item?.candidateId}
                        jobVacancyId={jobVacancyId}
                        api={api}
                        router={router}
                        setLoading={setLoading}
                        handleApplicant={handleApplicant}
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentItems;
