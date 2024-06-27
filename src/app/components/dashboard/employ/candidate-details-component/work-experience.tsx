import React from 'react';
import { Divider } from 'antd';
import dayjs from 'dayjs';

type Props = {
  workExpData?: any;
  othersData?: any;
};

const WorkExperience: React.FC<Props> = ({ workExpData, othersData }) => {
  return (
    <>
      {workExpData !== null &&
        workExpData?.experiences?.map((item: any, index: number) => (
          <div key={index} className="row">
            <p className="fw-bold mb-1">Work Experience {index + 1}</p>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Job Title </b>
              </p>
              <p className="mb-0">{item?.job_title || '-'}</p>
              <p className="mb-0">
                <b>Job Function </b>
              </p>
              <p className="mb-0">{item?.job_function || '-'}</p>
              <p className="mb-0">
                <b>Job Description </b>
              </p>
              <p className="mb-0">{item?.job_description || '-'}</p>
              <p className="mb-0">
                <b>Salary </b>
              </p>
              <p className="mb-0">
                {`Rp. ${Number(item?.salary)}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.',
                ) || '-'}
              </p>
              <p className="mb-0">
                <b>Start Year </b>
              </p>
              <p className="mb-2">
                {dayjs(item?.start_at).format('MMMM, YYYY') || '-'}
              </p>
            </div>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Job Level </b>
              </p>
              <p className="mb-0">{item?.job_level || '-'}</p>
              <p className="mb-0">
                <b>Company Name </b>
              </p>
              <p className="mb-0">{item?.company_name || '-'}</p>
              <p className="mb-0">
                <b>Line Industry </b>
              </p>
              <p className="mb-0">{item?.line_industry || '-'}</p>
              <p className="mb-0">
                <b>End Year </b>
              </p>
              <p className="mb-2">
                {dayjs(item?.end_at).format('MMMM, YYYY') || 'Present'}
              </p>
            </div>
            <Divider className="mb-3" />
          </div>
        ))}
      <div className="row">
        <div className="col-lg-6">
          <p className="mb-0">
            <b>Expected Salary </b>
          </p>
          <p className="mb-0">
            {`Rp. ${Number(workExpData?.expected_salary)}`.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              '.',
            ) || '-'}
          </p>
        </div>
        <div className="col-lg-6">
          <p className="mb-0">
            <b>Notice Period </b>
          </p>
          <p className="mb-0">
            {othersData?.candidate_questions[0]?.answer || '-'}
          </p>
        </div>
      </div>
    </>
  );
};

export default WorkExperience;
