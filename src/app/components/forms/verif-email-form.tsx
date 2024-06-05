'use client';

import React, { useEffect, useState } from 'react';
import { Form, Typography, message, Spin } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { useAppDispatch } from '@/redux/hook';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppSessionContext } from '@/libs/Sessions/AppSession';
import { DecryptSession } from '@/libs/Sessions/jwt';
import { authSession, linkedinSession, regSession } from '@/libs/Sessions/utils';
import { compareOTP, sendOTP } from '@/libs/Registration/verifications';

const { Title } = Typography;

const VerificationForm = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string[]>([]); // Since the value will be array of string, the default value of state is empty array.
  const [spinning, setSpinning] = useState(false);
  
  /* Resend OTP */
  const [countdown, setCoundown] = useState<number>(120);
  const [resend, setResend] = useState<boolean>(false);
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setCoundown(prevState  => {
        if(prevState > 0) {
          return prevState - 1;
        } else {
          setResend(false);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resend]);

  /* Session Context */
  const session = useAppSessionContext();
  /* reg-session */
  const getRegSession = session[`${regSession}`];
  // console.log('reg-session: ', getRegSession);
  let decodedRegSession: any;
  if (getRegSession !== undefined) {
    decodedRegSession = DecryptSession(getRegSession);
  };
  // console.info('decoded reg-session:', decodedRegSession);
  /* auth-session */
  const authSessionValue = session[`${authSession}`];
  // console.info('auth session value', authSessionValue);
  /* linkedin-session */
  const linkedinSessionValue = session[`${linkedinSession}`];
  // console.info('linkedin session: ', linkedinSessionValue);
  /* End Session Context */

  const handleFinish = async (otp: any) => {
    setSpinning(true);
    const convertedOTP = otp.otpCode.join('');
    const compareClientOTP = await compareOTP(
      convertedOTP,
      decodedRegSession.user.email,
    );
    /* Guard check */
    if (compareClientOTP.success !== true) {
      /**
       * Set Error state here within that message
       */
      setSpinning(false);
      return message.error('OTP does not match!');
    };

    /* Delay dispatch */
    setTimeout(() => {
      dispatch(setRegisterStep(3));
      setSpinning(false);
      message.success('Next step: fill up your data');
    }, 500);
  };

  /**
   * Check user, is verified or not when the page refreshed.
   */
  const fetchCheckEmailVerifiedStatus = async () => {
    // if (getRegSession === undefined) return;
    console.info('is email verified? checking on user session...');
    if (
      decodedRegSession !== false &&
      decodedRegSession !== undefined &&
      'is_email_verified' in decodedRegSession.candidate &&
      decodedRegSession.candidate.is_email_verified === true
    ) {
      console.info('Using session...');
      console.info('user email is already verified...');
      dispatch(setRegisterStep(3));
    }
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
    if (authSessionValue !== undefined) {
      console.info('auth-session exist, it\'s means user have filled the required data...');
      dispatch(setRegisterStep(4));
    } else if(linkedinSessionValue !== undefined) {
      console.info('user create account using linkedin...');
      dispatch(setRegisterStep(1));
    };
  };

  useEffect(() => {
    /**
     * Fetch Email Verifications here ...
     */
    fetchCheckEmailVerifiedStatus();

    /* Page check */
    completeFillFormCheck();
  }, [resend]);

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
                <InputOTP onChange={setValue} value={value} />
              </Form.Item>
            </div>
          </div>
          <div>
            <p>Resend button will available in: <span style={{ color: 'blue' }}>{minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}</span>
            </p>
          </div>
          <div className="col-lg-5 m-auto d-flex align-items-center justify-content-center">
            <button type="submit" className="dash-btn-two tran3s me-3">
              Submit
            </button>
            {countdown === 0 &&
              <button
                type="button"
                className="dash-btn-two tran3s"
                onClick={async () => {
                  setSpinning(true);
                  const resend = await sendOTP({ email: decodedRegSession.user.email });
                  console.log(resend);
                  if(!resend.success) {
                    setSpinning(false);
                    return message.error(resend.message);
                  };
                  setResend(true);
                  setCoundown(120);
                  message.success(resend.message);
                  return setSpinning(false);
                  }
                }
              >
                Resend
              </button>
            }
          </div>
        </div>
      </Form>
      <Spin fullscreen spinning={spinning} />
    </>
  );
};

export default VerificationForm;
