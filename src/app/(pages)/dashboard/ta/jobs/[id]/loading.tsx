'use client';
import { Skeleton } from 'antd';
import React from 'react';

const JobDetailsPageSkeleton = () => {
  return (
    <>
      <div className="mt-5" style={{ width: '100%', height: '200px' }}>
        <Skeleton.Button
          className="w-100 h-100"
          active={true}
          block={true}
          shape="round"
        />
      </div>
      <div className="mt-20" style={{ width: '100%', height: '200px' }}>
        <Skeleton.Button
          className="w-100 h-100"
          active={true}
          block={true}
          shape="round"
        />
      </div>
    </>
  );
};

export default JobDetailsPageSkeleton;
