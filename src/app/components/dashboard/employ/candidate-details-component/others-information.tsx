import React from 'react';
import { Divider } from 'antd';
import dayjs from 'dayjs';

type Props = {
  othersData?: any;
};

const OthersInformation: React.FC<Props> = ({ othersData }) => {
  return (
    <div className="row">
      <p className="fw-bold mb-1">Emergency Contacs</p>
      <div className="col-lg-6">
        <p className="mb-0">
          <b>Relation Status </b>
        </p>
        <p className="mb-0">
          {othersData?.emergency_contacs?.relationStatus || '-'}
        </p>
        <p className="mb-0">
          <b>Name </b>
        </p>
        <p className="mb-2">{othersData?.emergency_contacs?.name || '-'}</p>
      </div>
      <div className="col-lg-6">
        <p className="mb-0">
          <b>Phone Number </b>
        </p>
        <p className="mb-0">
          {othersData?.emergency_contacs?.phoneNumber || '-'}
        </p>
      </div>
      <Divider className="mb-3" />
      <div className="col-lg-12">
        <p className="mb-0">
          <b>Have candidate ever worked in Erajaya group of companies? </b>
        </p>
        <p className="mb-0">
          {othersData?.candidate_questions[1]?.answer === 'no' && 'No'}
          {othersData?.candidate_questions[1]?.answer !== 'no' &&
            `Start Period: ${dayjs(othersData?.candidate_questions[1]?.answer.split(',')[0]).format('MMMM YYYY')}, End Period: ${dayjs(othersData?.candidate_questions[1]?.answer.split(',')[1]).format('MMMM YYYY')}`}
        </p>
        <p className="mb-0">
          <b>
            Does the candidate have any prior medical conditions, illnesses, or
            congenital diseases?
          </b>
        </p>
        <p className="mb-0">
          {othersData?.candidate_questions[2]?.answer === 'no' && 'No'}
          {othersData?.candidate_questions[2]?.answer !== 'no' &&
            `Disease Name: ${othersData?.candidate_questions[2]?.answer.split(',')[0]}, Year: ${dayjs(othersData?.candidate_questions[2]?.answer.split(',')[1]).format('YYYY')}`}
        </p>
        <p className="mb-0">
          <b>
            Does the candidate have any friends, colleagues, relatives, or
            family members working at Erajaya Group Companies?
          </b>
        </p>
        <p className="mb-0">
          {othersData?.candidate_questions[3]?.answer === 'no' && 'No'}
          {othersData?.candidate_questions[3]?.answer !== 'no' &&
            `Name: ${othersData?.candidate_questions[3]?.answer.split(',')[0]}, Position: ${othersData?.candidate_questions[3]?.answer.split(',')[1]}`}
        </p>
      </div>
    </div>
  );
};

export default OthersInformation;
