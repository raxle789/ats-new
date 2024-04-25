'use client';
import React from 'react';
import Stage3Form from '../../forms/stage-3-form';
import {
  SafetyOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';

const ProfileStagesArea = () => {
  return (
    <>
      <h2 className="main-title">Stages</h2>

      <div className="bg-white card-box border-20">
        <div className="mb-25">
          <Steps
            items={[
              {
                title: 'Create Account',
                status: 'finish',
                icon: <UserOutlined />,
              },
              {
                title: 'Verification',
                status: 'finish',
                icon: <SafetyOutlined />,
              },
              {
                title: 'Fill Form',
                status: 'process',
                icon: <SolutionOutlined />,
              },
              {
                title: 'Done',
                status: 'wait',
                icon: <SmileOutlined />,
              },
            ]}
          />
        </div>
        <Stage3Form />
      </div>
    </>
  );
};

export default ProfileStagesArea;
