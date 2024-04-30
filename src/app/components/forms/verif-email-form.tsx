'use client';

import React, { useEffect, useState } from 'react';
import { Form, Typography, message } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { useAppDispatch } from '@/redux/hook';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppSessionContext } from '@/libs/Sessions/AppSession';
import { DecryptSession } from '@/libs/Sessions/jwt';
import { authSession, regSession } from '@/libs/Sessions/utils';
import { compareOTP, sendOTP } from '@/libs/Registration/verifications';

const { Title } = Typography;

const VerificationForm = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string[]>([]); // Since the value will be array of string, the default value of state is empty array.

  /* Session Context */
  const session = useAppSessionContext();
  const getRegSession = session[`${regSession}`];
  let decodedRegSession: any;
  if(getRegSession !== undefined) {
    decodedRegSession = DecryptSession(getRegSession)
  };
  const authSessionValue = session[`${authSession}`];
  console.info('auth session value', authSessionValue);
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
      message.success('Next step: fill up your data');
    }, 500);
  };

  

  /**
   * Check user, is verified or not when the page refreshed.
   */
  const fetchCheckEmailVerifiedStatus = async () => {
    console.info('reg-session -> ', decodedRegSession);
    if(getRegSession === undefined) return;
    if("is_email_verified" in decodedRegSession.candidate && decodedRegSession.candidate.is_email_verified === true) {
      console.info('Using session...');
      console.info("user email is already verified...");
      dispatch(setRegisterStep(3));
    };
    /*
    else {
      console.info('Using direct check database...');
      const emailVerifiedStatus = await checkEmailVerifiedStatus();
      console.info('Email verified status...', emailVerifiedStatus);
      if(!emailVerifiedStatus) {
        return;
      };
      dispatch(setRegisterStep(3));
    };
    */
  };

  const completeFillFormCheck = () => {
    if(authSessionValue !== undefined) {
      dispatch(setRegisterStep(4));
    };
  };

  useEffect(() => {
    /**
     * Fetch Email Verifications here ...
     */
    fetchCheckEmailVerifiedStatus();

    /* Page check */
    completeFillFormCheck();
  });

  return (
    <>
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
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-5 m-auto d-flex align-items-center">
            
            <button
              type="submit"
              className="dash-btn-two tran3s m-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
      <button
        className="dash-btn-two tran3s"
        onClick={async () => await sendOTP({ email: decodedRegSession.user.email })}
      >
          Resend
      </button>
    </>
  );
};

export default VerificationForm;
