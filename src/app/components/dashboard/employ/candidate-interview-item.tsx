import React, { useState } from 'react';
import ActionApplicant from '../candidate/action-applicant';
import { ICandidate } from '@/data/candidate-data';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hook';
import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import { Select } from 'antd';
import { Tag } from 'antd';

type TSub = {
  name: string;
  status: string;
};

type TInterviewer = {
  [key: string]: {
    date: string;
    names: TSub[];
  };
};

const interview: TInterviewer = {
  interview1: {
    date: '20-04-2023',
    names: [
      { name: 'Gusti', status: 'Hire' },
      { name: 'Vladimir', status: 'Reject' },
      { name: 'Gusti', status: 'Keep In View' },
    ],
  },
  interview2: {
    date: '14-04-2023',
    names: [
      { name: 'Aji', status: 'Waiting' },
      { name: 'Vladimir', status: 'Waiting' },
    ],
  },
  interview3: {
    date: '10-04-2023',
    names: [{ name: 'Gusti', status: 'Keep In View' }],
  },
};

const CandidateInterviewItem = ({ item }: { item: ICandidate }) => {
  const dispatch = useAppDispatch();
  const showModal = () => {
    dispatch(setIsOpen(true));
  };

  const [value, setValue] = useState<string>('interview1');
  const handleChange = (value: string) => {
    setValue(value);
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
          <div className="row gx-1 align-items-start">
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
                <div className="candidate-info mt-5 mb-65">
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
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Interview Title</span>
                <div>
                  <Select
                    defaultValue="interview1"
                    style={{ width: '230px' }}
                    onChange={handleChange}
                    options={[
                      { value: 'interview1', label: 'Interview1' },
                      { value: 'interview2', label: 'Interview2' },
                      { value: 'interview3', label: 'Interview3' },
                    ]}
                  />
                </div>
              </div>
              <div className="candidate-info mt-2">
                <span>Date</span>
                <div>{interview[value]?.date}</div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Interviewer</span>
                <div>
                  {interview[value] &&
                    interview[value].names.map((interviewItem, index) => (
                      <div key={index} className="row">
                        <div className="col-lg-9">
                          <p className="d-inline me-3">{interviewItem.name}</p>
                        </div>
                        <div className="col-lg-3">
                          {interviewItem.status === 'Waiting' && (
                            <Tag color="#1e87f0" style={{ color: 'white' }}>
                              Waiting
                            </Tag>
                          )}
                          {interviewItem.status === 'Hire' && (
                            <Tag color="#29d259" style={{ color: 'white' }}>
                              Hire
                            </Tag>
                          )}
                          {interviewItem.status === 'Reject' && (
                            <Tag color="#ff2730" style={{ color: 'white' }}>
                              Reject
                            </Tag>
                          )}
                          {interviewItem.status === 'Keep In View' && (
                            <Tag color="#f0f000" style={{ color: 'white' }}>
                              Keep In View
                            </Tag>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
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
                      <ActionApplicant />
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

export default CandidateInterviewItem;
