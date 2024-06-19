'use client';
import { Skeleton } from 'antd';
import React from 'react';

const DashboardPageSkeleton = () => {
  return (
    <>
      <Skeleton active />
      <div className="mt-20" style={{ width: '100%', height: '500px' }}>
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

export default DashboardPageSkeleton;
