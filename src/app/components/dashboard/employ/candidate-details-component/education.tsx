import React from 'react';
import dayjs from 'dayjs';

type Props = {
  educationData?: any;
};

const Education: React.FC<Props> = ({ educationData }) => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <p className="mb-0">
          <b>Education Level </b>
        </p>
        <p className="mb-0">{educationData?.edu_level || '-'}</p>
        <p className="mb-0">
          <b>Education Major </b>
        </p>
        <p className="mb-0">{educationData?.edu_major || '-'}</p>
        <p className="mb-0">
          <b>City </b>
        </p>
        <p className="mb-0">{educationData?.city || '-'}</p>
        <p className="mb-0">
          <b>Start Year </b>
        </p>
        <p className="mb-0">
          {dayjs(educationData?.start_year).format('DD MMMM YYYY') || '-'}
        </p>
      </div>
      <div className="col-lg-6">
        <p className="mb-0">
          <b>School/University Name </b>
        </p>
        <p className="mb-0">{educationData?.university_name || '-'}</p>
        <p className="mb-0">
          <b>GPA </b>
        </p>
        <p className="mb-0">{educationData?.gpa || '-'}</p>
        <p className="mb-0">
          <b>End Year </b>
        </p>
        <p className="mb-0">
          {dayjs(educationData?.end_year).format('DD MMMM YYYY') || '-'}
        </p>
      </div>
    </div>
  );
};

export default Education;
