import React from 'react';
import { Divider } from 'antd';
import dayjs from 'dayjs';

type Props = {
  certificationData?: any;
};

const Certification: React.FC<Props> = ({ certificationData }) => {
  return (
    <>
      {(certificationData?.length === 0 || certificationData === null) && (
        <div>No data</div>
      )}
      {certificationData !== null &&
        certificationData?.map((item: any, index: number) => (
          <div key={index} className="row">
            <p className="fw-bold mb-1">Certification {index + 1}</p>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Name </b>
              </p>
              <p className="mb-0">{item?.name || '-'}</p>
              <p className="mb-0">
                <b>Institution Name </b>
              </p>
              <p className="mb-2">{item?.institution_name || '-'}</p>
            </div>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Issue Date </b>
              </p>
              <p className="mb-0">
                {dayjs(item?.issued_at).format('MMMM, YYYY') || '-'}
              </p>
            </div>
            {index < certificationData.length - 1 && (
              <Divider className="mb-3" />
            )}
          </div>
        ))}
    </>
  );
};

export default Certification;
