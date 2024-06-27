import React from 'react';
import { Divider } from 'antd';
import dayjs from 'dayjs';

type Props = {
  familyData?: any;
};

const Family: React.FC<Props> = ({ familyData }) => {
  return (
    <>
      {(familyData?.length === 0 || familyData === null) && <div>No data</div>}
      {familyData !== null &&
        familyData.map((item: any, index: number) => (
          <div key={index} className="row">
            <p className="fw-bold mb-1">Family Relation {index + 1}</p>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Relation </b>
              </p>
              <p className="mb-0">{item?.relation || '-'}</p>
              <p className="mb-0">
                <b>Name </b>
              </p>
              <p className="mb-2">{item?.name || '-'}</p>
            </div>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Gender </b>
              </p>
              <p className="mb-0">{item?.gender || '-'}</p>
              <p className="mb-0">
                <b>Date of Birth </b>
              </p>
              <p className="mb-2">
                {dayjs(item?.dateOfBirth).format('DD MMMM YYYY') || '-'}
              </p>
            </div>
            {index < familyData.length - 1 && <Divider className="mb-3" />}
          </div>
        ))}
    </>
  );
};

export default Family;
