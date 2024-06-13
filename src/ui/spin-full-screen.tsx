'use client';

import { Spin } from 'antd';

const SpinFullScreen = ({ loading }) => {
  return (
    <>
      <Spin spinning={loading} fullscreen />
    </>
  );
};

export default SpinFullScreen;
