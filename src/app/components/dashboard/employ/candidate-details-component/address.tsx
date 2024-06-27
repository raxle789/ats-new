import React from 'react';

type Props = {
  addressData?: any;
};

const Address: React.FC<Props> = ({ addressData }) => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <p className="mb-0">
          <b>Country </b>
        </p>
        <p className="mb-0">{addressData?.country || '-'}</p>
        <p className="mb-0">
          <b>City </b>
        </p>
        <p className="mb-0">{addressData?.city || '-'}</p>
        <p className="mb-0">
          <b>Permanent Address </b>
        </p>
        <p className="mb-0">{addressData?.street || '-'}</p>
        <p className="mb-0">
          <b>Subdistrict </b>
        </p>
        <p className="mb-0">{addressData?.subdistrict || '-'}</p>
        <p className="mb-0">
          <b>Village: </b>
        </p>
        <p className="mb-0">{addressData?.village || '-'}</p>
      </div>
      <div className="col-lg-6">
        <p className="mb-0">
          <b>RT </b>
        </p>
        <p className="mb-0">{addressData?.rt || '-'}</p>
        <p className="mb-0">
          <b>RW </b>
        </p>
        <p className="mb-0">{addressData?.rw || '-'}</p>
        <p className="mb-0">
          <b>Zip Code </b>
        </p>
        <p className="mb-0">{addressData?.zipCode || '-'}</p>
        <p className="mb-0">
          <b>Current Address </b>
        </p>
        <p className="mb-0">{addressData?.currentAddress || '-'}</p>
      </div>
    </div>
  );
};

export default Address;
