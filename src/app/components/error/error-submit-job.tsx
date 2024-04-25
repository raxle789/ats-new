'use client';

import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;

const ErrorSubmitJob = () => {
  return (
    <Result
      status="error"
      title="You Don't Have Any FPK That Can Be Used to Post a New Job!"
      subTitle="Please check and modify the following information before resubmitting."
    ></Result>
  );
};

export default ErrorSubmitJob;
