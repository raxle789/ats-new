'use client';
import React, { useState, ReactNode, SetStateAction } from 'react';
import img_2 from '@/assets/images/candidates/img_02.jpg';
import ActionApplicant from '../../../../ui/action-card-applicant';
import Image from 'next/image';
// import { useAppDispatch } from '@/redux/hook';
// import { setIsOpen } from '@/redux/features/candidateDetailsSlice';
import { Checkbox, Tag, Button, Tooltip } from 'antd';
import { LuSend } from 'react-icons/lu';
import RefCheckFormModal from '../../common/popup/ref-check-form-modal';
import CandidateRefCheckForm from './candidate-ref-check-form';
import RefereeForm from './referee-form';

type Props = {
  item?:
    | {
        candidateId?: string;
        candidatePhoto?: string;
        candidateName?: string;
        candidateLastPosition?: string;
        candidateLastEducation?: string;
        candidateExpectedSalary?: string;
        candidateYearOfExperience?: number;
        candidateStatus?: string;
        candidateSkills?: string[];
        candidateScore?: string;
      }
    | any;
  status?: string | any;
  checkboxState?: { [key: string]: boolean };
  checkboxAllValue?: boolean;
  setCheckbox?: React.Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  setCheckboxAllValue?: React.Dispatch<boolean>;
  jobVacancyId?: number | any;
  api?: any;
  router?: any;
  setLoading?: any;
  handleApplicant?: (
    handleType:
      | 'assignAssessment'
      | 'detailAssessment'
      | 'resendAssessment'
      | 'assignInterview'
      | 'resendCandidateInterviewInvitation',
    candidateId: number,
    jobVacancyId: number | any,
    interviewId: number | null,
    api: any,
    router: any,
    setLoading: (loading: boolean) => void,
    status: string,
  ) => void | any;
};

const RefCheckItem: React.FC<Props> = ({
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
  // const dispatch = useAppDispatch();
  const [isOpenRefForm, setIsRefForm] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [childrenModal, setChildrenModal] = useState<ReactNode | null>(null);

  // const showModal = () => {
  //   dispatch(setIsOpen(true));
  // };

  const handleFormModal = (type: string) => {
    if (type === 'candidate-reference') {
      setTitleModal('Candidate Reference Check Form');
      setChildrenModal(<CandidateRefCheckForm />);
      setIsRefForm(true);
    } else {
      setTitleModal('Referee Form');
      setChildrenModal(<RefereeForm />);
      setIsRefForm(true);
    }
  };

  const onChangeCheckbox = (index: string) => {
    if (setCheckbox && setCheckboxAllValue && checkboxState) {
      setCheckbox((prevState: any) => ({
        ...prevState,
        [index]: !prevState[index],
      }));

      if (checkboxAllValue || !checkboxState[index]) {
        setCheckboxAllValue(false);
      }
    }
  };
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto mt-auto mb-auto">
          <div className="checkbox-pipeline-action">
            <Checkbox
              className="me-2"
              checked={checkboxState && checkboxState[item?.candidateId]}
              onChange={() => onChangeCheckbox(item?.candidateId)}
            ></Checkbox>
          </div>
          <a href="#" className="rounded-circle">
            <Image
              src={item?.candidatePhoto ?? img_2}
              alt="image"
              className="lazy-img rounded-circle"
              width="80"
              height="80"
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
                    // onClick={showModal}
                  >
                    {item?.candidateName ?? '-'}
                  </a>
                </h4>
                <div className="candidate-info mt-2 mb-4">
                  <span>Last Position</span>
                  <div>{item?.candidateLastPosition ?? '-'}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Last Education</span>
                <div>{item?.candidateLastEducation ?? '-'}</div>
              </div>
              <div className="candidate-info mt-2">
                <span>Expected Salary</span>
                <div>{item?.candidateExpectedSalary ?? '-'}</div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Reference Form Status</span>
                <div className="d-flex align-items-center justify-content-start">
                  <button
                    type="button"
                    onClick={() => handleFormModal('candidate-reference')}
                  >
                    <Tag color="#1e87f0" style={{ color: 'white' }}>
                      Waiting
                    </Tag>
                  </button>
                  <Tooltip placement="top" title={'Resend Form'} arrow={true}>
                    <Button
                      className=" ms-2"
                      // onClick={() =>
                      //   handleResendEmail('interviewer', candidateInterviewValue, nik)
                      // }
                    >
                      <LuSend
                        style={{
                          color: '#0c1d5c',
                          fontSize: '15px',
                        }}
                      />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div className="candidate-info mt-2">
                <span>Referee Form Status</span>
                <div className="d-flex align-items-center justify-content-start">
                  <button
                    type="button"
                    onClick={() => handleFormModal('referee-form')}
                  >
                    <Tag color="#29d259" style={{ color: 'white' }}>
                      Done
                    </Tag>
                  </button>
                  <Tooltip placement="top" title={'Resend Form'} arrow={true}>
                    {/* <Button
                      className=" ms-2"
                    >
                      <LuSend
                        style={{
                          color: '#0c1d5c',
                          fontSize: '15px',
                        }}
                      />
                    </Button> */}
                  </Tooltip>
                </div>
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
                      <ActionApplicant
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

      <RefCheckFormModal
        titleModal={titleModal}
        isOpen={isOpenRefForm}
        setIsOpenModal={setIsRefForm}
        children={childrenModal}
      />
    </div>
  );
};

export default RefCheckItem;
