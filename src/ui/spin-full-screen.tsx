'use client';

import { Spin } from 'antd';

type Props = {
  loading?: boolean;
};

const SpinFullScreen: React.FC<Props> = ({ loading }) => {
  return (
    <>
      <Spin spinning={loading} fullscreen />
    </>
  );
};

export default SpinFullScreen;
