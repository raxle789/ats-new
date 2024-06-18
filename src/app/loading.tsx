'use client';
import React from 'react';
import { Spin } from 'antd';

const LoadingArea = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Spin tip="Loading" spinning={true} />
    </div>
  );
};

export default LoadingArea;
