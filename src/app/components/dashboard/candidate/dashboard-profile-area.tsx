'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const DashboardProfileArea = () => {
  const router = useRouter();
  return (
    <>
      <h2 className="main-title">My Profile</h2>

      <div className="bg-white card-box border-20">
        {/* <div className="dash-input-wrapper">
          <label htmlFor="">Bio*</label>
          <textarea
            className="size-lg"
            placeholder="Write something interesting about you...."
          ></textarea>
          <div className="alert-text">
            Brief description for your profile. URLs are hyperlinked.
          </div>
        </div> */}
        <div>
          <a
            style={{
              fontSize: '17px',
              cursor: 'pointer',
              color: 'black',
              fontWeight: '500',
            }}
            onClick={() => {
              router.push('/dashboard/user/profile/document');
            }}
          >
            Personal Data
          </a>
        </div>
        <div className="mt-2">
          <a
            style={{
              fontSize: '17px',
              cursor: 'pointer',
              color: 'black',
              fontWeight: '500',
            }}
            onClick={() => {
              router.push('');
            }}
          >
            Background Experience
          </a>
        </div>
        <div className="mt-2">
          <a
            style={{
              fontSize: '17px',
              cursor: 'pointer',
              color: 'black',
              fontWeight: '500',
            }}
            onClick={() => {
              router.push('/dashboard/user/profile/document');
            }}
          >
            Document
          </a>
        </div>
      </div>

      {/* <div className="button-group d-inline-flex align-items-center mt-30">
        <a href="#" className="dash-btn-two tran3s me-3">
          Save
        </a>
        <a href="#" className="dash-cancel-btn tran3s">
          Cancel
        </a>
      </div> */}
    </>
  );
};

export default DashboardProfileArea;
