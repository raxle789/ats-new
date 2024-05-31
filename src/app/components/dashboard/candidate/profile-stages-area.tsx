'use client';
import React from 'react';
import Stage3Form from '../../forms/stage-3-form';
import VerificationForm from '../../forms/verif-email-form';
import DoneRegisterPage from '../../forms/done-register';
import LinkedInRegisterPage from '../../forms/LinkedInRegister';
import {
  SafetyOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';
import { useAppSelector } from '@/redux/hook';

const ProfileStagesArea = () => {
  const stepState = useAppSelector((state) => state.userRegisterStep.next);
  const consolefunc = () => {
    console.log(';okee');
  };
  return (
    <>
      <h2 className="main-title">Stages</h2>

      <div className="bg-white card-box border-20">
        <div className="mb-25">
          <Steps
            items={[
              {
                title: 'Create Account',
                status:
                  stepState < 1
                    ? 'wait'
                    : stepState === 1
                      ? 'process'
                      : 'finish',
                icon: <UserOutlined />,
              },
              {
                title: 'Verification',
                status:
                  stepState < 2
                    ? 'wait'
                    : stepState === 2
                      ? 'process'
                      : 'finish',
                icon: <SafetyOutlined />,
              },
              {
                title: 'Fill Form',
                status:
                  stepState < 3
                    ? 'wait'
                    : stepState === 3
                      ? 'process'
                      : 'finish',
                icon: <SolutionOutlined />,
              },
              {
                title: 'Done',
                status:
                  stepState < 4
                    ? 'wait'
                    : stepState === 4
                      ? 'process'
                      : 'finish',
                icon: <SmileOutlined />,
              },
            ]}
          />
        </div>
        {stepState === 1 && <LinkedInRegisterPage />}
        {stepState === 2 && <VerificationForm />}
        {stepState === 3 && <Stage3Form />}
        {stepState === 4 && <DoneRegisterPage />}
      </div>
    </>
  );
};

export default ProfileStagesArea;
