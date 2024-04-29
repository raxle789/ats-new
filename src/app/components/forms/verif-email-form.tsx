'use client';

import React, { useState } from 'react';
import { Form, Typography, message } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { useAppDispatch } from '@/redux/hook';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppSessionContext } from '@/libs/Sessions/AppSession';
import { DecryptSession } from '@/libs/Sessions/jwt';
import { regSession } from '@/libs/Sessions/utils';
import { compareOTP } from '@/libs/Registration/verifications';

const { Title } = Typography;

const VerificationForm = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string[]>([]); // Since the value will be array of string, the default value of state is empty array.

  /* Session Context */
  const session = useAppSessionContext();
  const getRegSession = session[`${regSession}`];
  const decodedRegSession = DecryptSession(getRegSession);
  /* End Session Context */

  const handleFinish = async (otp: any) => {
    const convertedOTP = otp.otpCode.join('');
    console.info(convertedOTP);
    const compareClientOTP = await compareOTP(Number(convertedOTP), decodedRegSession.user.email);
    /* Guard check */
    if(compareClientOTP.success !== true) {
      console.info('OTP does not match...');
      /**
       * Set Error state here within that message
       */
      return message.error('OTP does not match!');
    };

    console.info('OTP matches...');
    /**
     * Success message
     */
    message.success('OTP matches');

    /* Delay dispatch */
    setTimeout(() => {
      dispatch(setRegisterStep(3))
    }, 2000);
  };
  return (
    <Form onFinish={handleFinish}>
      <div className="row">
        <div className="col-12 mb-5">
          <div className="input-group-meta position-relative mb-10">
            <Title level={5}>OTP Code</Title>
            <Form.Item
              name="otpCode"
              rules={[{ required: true, message: 'Please input OTP code!' }]}
            >
              <InputOTP
                onChange={setValue}
                value={value}
                // autoSubmit={handleFinish}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-lg-5 m-auto d-flex align-items-center">
          
          <button
            type="submit"
            className="dash-btn-two tran3s m-auto"
            // onClick={() => handleFinish}
          >
            Submit
          </button>
          <button
            // type="submit"
            className="dash-btn-two tran3s"
            // onClick={() => handleFinish}
          >
            Resend
          </button>
        </div>
      </div>
    </Form>
  );
};

export default VerificationForm;
