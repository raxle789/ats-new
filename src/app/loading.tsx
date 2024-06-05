'use client';
import React, { useState } from 'react';
import { Spin } from 'antd';

const LoadingArea = () => {
  const [spinning, setSpinning] = useState(true);
  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
      <Spin fullscreen spinning={spinning} />
    </div>
  );
};

export default LoadingArea;
