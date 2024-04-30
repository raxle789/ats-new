'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import { PiPath } from 'react-icons/pi';

const DashboardProfileArea = () => {
  const router = useRouter();
  return (
    <>
      <h2 className="main-title">My Profile</h2>

      <div className="bg-white card-box border-20">
        <div className="d-flex align-items-center">
          <AiOutlineUser
            style={{
              fontSize: '23px',
              marginBottom: '2px',
              marginRight: '5px',
            }}
          />
          <a
            style={{
              fontSize: '17px',
              cursor: 'pointer',
              color: 'black',
              fontWeight: '500',
            }}
            onClick={() => {
              router.push('/dashboard/user/profile/personal-data');
            }}
          >
            Personal Data
          </a>
        </div>
        <div className="mt-2 d-flex align-items-center">
          <PiPath
            style={{
              fontSize: '23px',
              marginBottom: '2px',
              marginRight: '5px',
            }}
          />
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
        <div className="mt-2 d-flex align-items-center">
          <IoDocumentTextOutline
            style={{
              fontSize: '23px',
              marginBottom: '2px',
              marginRight: '5px',
            }}
          />
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
    </>
  );
};

export default DashboardProfileArea;
