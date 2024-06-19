'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as confirmations from '@/utils/confirmation';
import { useRouter } from 'next/navigation';
// import { ExclamationCircleFilled } from '@ant-design/icons';
import * as messages from '@/utils/message';
import Pagination from '@/ui/pagination';
import SearchBar from '@/ui/search-bar';
import EmployShortSelect from './short-select';
import { Spin, Modal, message } from 'antd';
import ActionJobVacancies from '../candidate/action-job-vacancies';
import { Checkbox, Popover } from 'antd';
import type { CheckboxProps } from 'antd';
import ActionCheckboxJob from '../../common/popup/action-checkbox-jobs';

// const moment = require('moment');

const { confirm } = Modal;

type Props = {
  jobVacancyData?: any;
  perPage?: string | any;
  deleteJobVacancyData?: any;
};

const EmployJobItem: React.FC<Props> = ({
  jobVacancyData,
  perPage,
  deleteJobVacancyData,
}) => {
  const router = useRouter();

  const [api, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const initialCheckboxState = jobVacancyData?.data?.reduce(
    (acc: { [key: string]: boolean }, _: any, index: string) => {
      return {
        ...acc,
        [index]: false,
      };
    },
    {},
  );
  const [checkboxAllValue, setCheckboxAllValue] = useState(false);
  const [popOverState, setPopOverState] = useState(false);
  const [checkbox, setCheckbox] = useState<{ [key: string]: boolean }>(
    initialCheckboxState,
  );
  const onChangeCheckboxAll: CheckboxProps['onChange'] = (e) => {
    const checked = e.target.checked;
    const updatedCheckbox: { [key: string]: boolean } = {};

    Object.keys(checkbox).forEach((key: string) => {
      updatedCheckbox[key] = checked;
    });

    setCheckbox(updatedCheckbox);
    setCheckboxAllValue(checked);
  };
  const onChangeCheckbox = (index: number) => {
    setCheckbox((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));

    if (checkboxAllValue || !checkbox[index]) {
      setCheckboxAllValue(false);
    }
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

  function handleJobVacancy(
    handleType: 'view' | 'edit' | 'duplicate' | 'delete',
    jobId: number | any,
  ) {
    setLoading(true);

    if (handleType === 'view') {
      confirm({
        ...confirmations?.viewConfirmation('jobVacancy'),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              resolve(router.push(`/main/jobs/${jobId}`));
            }, 2000);
          }).catch((e) => console.log('Failed Viewing Job Vacancy: ', e));
        },
        onCancel() {
          router.refresh();

          setLoading(false);
        },
      });
    } else if (handleType === 'edit') {
      confirm({
        ...confirmations?.editConfirmation('jobVacancy'),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              resolve(router.push(`/dashboard/ta/submit-job/edit/${jobId}}`));
            }, 2000);
          }).catch((e) => console.log('Failed Editing Job Vacancy: ', e));
        },
        onCancel() {
          router.refresh();

          setLoading(false);
        },
      });
    } else if (handleType === 'duplicate') {
      confirm({
        ...confirmations?.duplicateConfirmation('jobVacancy'),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              resolve(
                router.push(`/dashboard/ta/submit-job/duplicate/${jobId}`),
              );
            }, 2000);
          }).catch((e) => console.log('Failed Duplicating Job Vacancy: ', e));
        },
        onCancel() {
          router.refresh();

          setLoading(false);
        },
      });
    } else if (handleType === 'delete') {
      confirm({
        ...confirmations?.deleteConfirmation('jobVacancy'),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              const validate = await deleteJobVacancyData(jobId);

              if (validate?.success) {
                messages.success(api, validate?.message);

                router.refresh();
              } else {
                messages.error(api, validate?.message);

                router.refresh();
              }

              resolve(setLoading(false));
            }, 2000);
          }).catch((e) => console.log('Failed Deleting Job Vacancy: ', e));
        },
        onCancel() {
          router.refresh();

          setLoading(false);
        },
      });
    }
  }

  return (
    <>
      {contextHolder}

      <Spin spinning={loading} fullscreen />

      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Job Vacancies</h2>
        </div>
        <div className="d-flex xs-mt-30 justify-content-end align-items-center">
          <SearchBar />
          <div className="short-filter d-flex align-items-center ms-3">
            <div className="text-dark fw-500 me-2">Filter by:</div>
            <EmployShortSelect />
          </div>
        </div>
      </div>

      <div
        className="bg-white card-box border-20"
        style={{ padding: '45px 40px 50px' }}
      >
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
              <table
                className="table job-alert-table job-vacancies-table w-100"
                style={{ tableLayout: 'fixed' }}
              >
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>
                      <Popover
                        content={<ActionCheckboxJob />}
                        trigger="click"
                        open={popOverState}
                      >
                        <Checkbox
                          onChange={onChangeCheckboxAll}
                          checked={checkboxAllValue}
                        ></Checkbox>
                      </Popover>
                    </th>
                    <th scope="col" style={{ width: '200px' }}>
                      Job Title
                    </th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Assessment</th>
                    <th scope="col">Interview</th>
                    <th scope="col">SLA</th>
                    <th scope="col">User</th>
                    <th scope="col">Recruiter</th>
                    <th scope="col">EFPK</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobVacancyData?.data?.map((data: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <Checkbox
                            className="me-2"
                            checked={checkbox[index]}
                            onChange={() => onChangeCheckbox(index)}
                          ></Checkbox>
                        </td>
                        <td
                          className="text-start"
                          style={{
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                          }}
                        >
                          <Link
                            className="job-title-item"
                            href={`/dashboard/ta/jobs/${data?.jobId}`}
                            onClick={() => setLoading(true)}
                          >{`${data?.jobTitleName ?? '-'}`}</Link>
                          <br />
                          {`${data?.departmentName ?? '-'}`} <br />
                          Status:
                          {` ${data?.status ?? '-'}`}
                          <br />
                          End Posted:
                          <span style={{ color: '#ff2730' }}>
                            {` ${data?.endPosted ?? '-'}`}
                          </span>
                        </td>
                        <td>{`${data?.applicants ?? 0}`}</td>
                        <td>{`${data?.assessment ?? 0}`}</td>
                        <td>{`${data?.interview ?? 0}`}</td>
                        <td>{`${data?.sla ?? '-'}`}</td>
                        <td>{`${data?.user ?? '-'}`}</td>
                        <td>{`${data?.recruiter ?? '-'}`}</td>
                        <td>{`${data?.efpkStatus ?? '-'}`}</td>
                        <td>
                          <div className="action-dots float-end">
                            <button
                              className="action-btn dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span></span>
                            </button>
                            {/* action dropdown start */}
                            <ActionJobVacancies
                              jobId={data?.jobId}
                              setLoading={setLoading}
                              handleJobVacancy={handleJobVacancy}
                            />
                            {/* action dropdown end */}
                          </div>
                        </td>
                        {/* <td>
                        <ExpendableButton
                          isOpen={expandedRows[index]}
                          toggle={() => toggleRowExpansion(index)}
                        />
                      </td> */}
                      </tr>
                      {/* {expandedRows[index] && (
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <div
                            className={
                              expandedRows[index]
                                ? 'expanded-row-open'
                                : 'expanded-row-close'
                            }
                          >
                            <div className="row">
                              <div className="col-6">
                                <p>
                                  <b>Applications: </b>
                                  {`${data?.jobApplicants ?? ''}`}
                                </p>
                                <p>
                                  <b>Assessment: </b>
                                  {`${data.jobApplicantsAssessment ?? ''}`}
                                </p>
                                <p>
                                  <b>Interview: </b>
                                  {`${data?.jobApplicantsInterview ?? ''}`}
                                </p>
                              </div>
                              <div className="col-lg-6">
                                <p>
                                  <b>Offering: </b>
                                  {`${data?.jobApplicantsOffering ?? ''}`}
                                </p>
                                <p>
                                  <b>Job Status: </b>
                                  {`${data?.jobStatus ?? ''}`}
                                </p>
                                <p>
                                  <b>Job End Posted: </b>
                                  {`${data?.jobEndPosted ?? ''}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                    )} */}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={jobVacancyData?.total}
          disabled={
            !jobVacancyData.data || jobVacancyData?.total <= Number(perPage)
              ? true
              : false
          }
        />
      </div>
    </>
  );
};

export default EmployJobItem;
