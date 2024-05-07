import React, { SetStateAction } from 'react';
import ActionApplicant from '../candidate/action-applicant';
import { ICandidate } from '@/data/candidate-data';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hook';
import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import { Checkbox } from 'antd';

interface IProps {
  item: ICandidate;
  checkboxState: { [key: string]: boolean };
  checkboxAllValue: boolean;
  setCheckbox: React.Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  setCheckboxAllValue: React.Dispatch<boolean>;
}

const CandidateAssessmentItem: React.FC<IProps> = ({
  item,
  checkboxState,
  checkboxAllValue,
  setCheckbox,
  setCheckboxAllValue,
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
                <div className="candidate-info mt-5">
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
                <span>Start Test</span>
                <div>22-02-2024 01:00:00</div>
              </div>
              <div className="candidate-info mt-2">
                <span>End Test</span>
                <div>26-02-2024 23:59:59</div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Test Name</span>
                <div>Psikotes Online - 1</div>
              </div>
              <div className="candidate-info mt-2 mb-40">
                <span>Status</span>
                <div>Tidak direkomendasikan</div>
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

export default CandidateAssessmentItem;
