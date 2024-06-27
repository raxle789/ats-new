import React from 'react';
import { Divider } from 'antd';

type Props = {
  languageData?: any;
};

const Language: React.FC<Props> = ({ languageData }) => {
  return (
    <>
      {languageData === null && <div>No data</div>}
      {languageData !== null &&
        languageData?.map((item: any, index: number) => (
          <div key={index} className="row">
            <p className="fw-bold mb-1">Language {index + 1}</p>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Name </b>
              </p>
              <p className="mb-2">{item?.name || '-'}</p>
            </div>
            <div className="col-lg-6">
              <p className="mb-0">
                <b>Proficiency </b>
              </p>
              <p className="mb-2">{item?.proficiency || '-'}</p>
            </div>

            {index < languageData.length - 1 && <Divider className="mb-3" />}
          </div>
        ))}
    </>
  );
};

export default Language;
