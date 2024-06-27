import React from 'react';
import dayjs from 'dayjs';

type Props = {
  mainProfileData?: any;
};

const MainProfile: React.FC<Props> = ({ mainProfileData }) => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <p className="mb-0">
          <b>Date of Birth </b>
        </p>
        <p className="mb-0">
          {dayjs(mainProfileData?.date_of_birth).format('DD MMMM YYYY') || '-'}
        </p>
        <p className="mb-0">
          <b>Place of Birth </b>
        </p>
        <p className="mb-0">{mainProfileData?.birthCity || '-'}</p>
        <p className="mb-0">
          <b>Phone Number </b>
        </p>
        <p className="mb-0">{mainProfileData?.phone_number || '-'}</p>
        <p className="mb-0">
          <b>Gender </b>
        </p>
        <p className="mb-0">{mainProfileData?.gender || '-'}</p>
        <p className="mb-0">
          <b>Ethnicity </b>
        </p>
        <p className="mb-0">{mainProfileData?.ethnicity || '-'}</p>
      </div>
      <div className="col-lg-6">
        <p className="mb-0">
          <b>Religion </b>
        </p>
        <p className="mb-0">{mainProfileData?.religion || '-'}</p>
        <p className="mb-0">
          <b>Blood Type </b>
        </p>
        <p className="mb-0">{mainProfileData?.blood_type || '-'}</p>
        <p className="mb-0">
          <b>Marital Status </b>
        </p>
        <p className="mb-0">{mainProfileData?.maritalStatus || '-'}</p>
        <p className="mb-0">
          <b>Source Referer </b>
        </p>
        <p className="mb-0">{mainProfileData?.source_referer || '-'}</p>
        <p className="mb-0">
          <b>Is Blacklisted </b>
        </p>
        <p className="mb-0">{mainProfileData?.is_blacklisted ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default MainProfile;
