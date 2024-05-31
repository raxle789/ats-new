'use client';

import { useAppSessionContext } from '@/libs/Sessions/AppSession';
import { Alert, Avatar, Button, DatePicker, Form, Input, message } from 'antd';
import { linkedinSession } from '@/libs/Sessions/utils';
import { DecryptSession } from '@/libs/Sessions/jwt';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RegisterWithLinkedIn } from '@/libs/Registration/LinkedIn';
import { useAppDispatch } from '@/redux/hook';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';

export interface FieldType {
  fullname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: any;
  password: string;
  confirmPassword: string;
}

export default function LinkedInRegisterPage() {
  /* Use session context here */
  const session = useAppSessionContext();
  const linkedInSession = session[`${linkedinSession}`];
  const decodedLinkedInSession = DecryptSession(linkedInSession);
  // console.info('decoded linkedin-session', decodedLinkedInSession);

  /* search-params */
  const searchParams = useSearchParams();
  const isSearchParams = searchParams.toString();
  /* antd */
  const [form] = Form.useForm();

  /* zodErrors-state */
  const [zodErrors, setZodErrors] = useState<{
    [key: string]: string[];
  } | null>(null);
  const dispatch = useAppDispatch();

  /* ACTIONS */
  const onFinish = async (values: any) => {
    console.log(values);
    const plainObjects = JSON.parse(JSON.stringify(values));
    console.info('date:', plainObjects.dateOfBirth instanceof Date);
    const doRegisterPhase1 = await RegisterWithLinkedIn({
      ...plainObjects,
      dateOfBirth: new Date(plainObjects.dateOfBirth),
    });
    if (!doRegisterPhase1.success) {
      console.info('zodErrors:', doRegisterPhase1.errors);
      setZodErrors(doRegisterPhase1.errors);
      return message.error(doRegisterPhase1.message);
    }

    message.success(doRegisterPhase1.message);
    // return dispatch(setRegisterStep(3));
    return setTimeout(() => {
      dispatch(setRegisterStep(3));
    }, 2000);
  };
  /* END OF ACTIONS */

  useEffect(() => {
    form.setFieldsValue({
      fullname: decodedLinkedInSession.name,
      email: decodedLinkedInSession.email,
    });
  }, []);
  return (
    <>
      {decodedLinkedInSession?.success && (
        <>
          <h3 className="section-page-title">Your LinkedIn Account</h3>
          <Form form={form} name="reg-with-linkedin" onFinish={onFinish}>
            <div className="row">
              <div className="col-4">
                <Avatar src={decodedLinkedInSession?.picture} size={80} />
              </div>
              <div className="col-4">
                <div className="input-group-meta position-relative mb-15">
                  <label>Full Name*</label>
                  <Form.Item<FieldType>
                    name={'fullname'}
                    validateStatus={zodErrors?.fullname ? 'error' : ''}
                    help={zodErrors?.fullname?.toString()}
                  >
                    <Input placeholder="Your Full Name" />
                  </Form.Item>
                </div>
                <div className="input-group-meta position-relative mb-15">
                  <label>Email*</label>
                  <Form.Item<FieldType>
                    name={'email'}
                    validateStatus={zodErrors?.email ? 'error' : ''}
                    help={zodErrors?.email?.toString()}
                  >
                    <Input disabled placeholder="Your Email" />
                  </Form.Item>
                </div>
              </div>

              <div className="col-4">
                <div className="input-group-meta position-relative mb-15">
                  <label>Phone Number*</label>
                  <Form.Item<FieldType>
                    name={'phoneNumber'}
                    validateStatus={zodErrors?.phoneNumber ? 'error' : ''}
                    help={zodErrors?.phoneNumber?.toString()}
                  >
                    <Input placeholder="Your Phone Number" />
                  </Form.Item>
                </div>
                <div className="input-group-meta position-relative mb-15">
                  <label>Date of Birth*</label>
                  <Form.Item<FieldType>
                    name={'dateOfBirth'}
                    validateStatus={zodErrors?.dateOfBirth ? 'error' : ''}
                    help={zodErrors?.dateOfBirth?.toString()}
                  >
                    <DatePicker className="w-100" placeholder="Select Date" />
                  </Form.Item>
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Password*</label>
                  <Form.Item<FieldType>
                    name={'password'}
                    validateStatus={zodErrors?.password ? 'error' : ''}
                    help={zodErrors?.password?.toString()}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label>Confirm Password*</label>
                  <Form.Item<FieldType>
                    name={'confirmPassword'}
                    validateStatus={zodErrors?.confirmPassword ? 'error' : ''}
                    help={zodErrors?.confirmPassword?.toString()}
                  >
                    <Input.Password placeholder="Confirm Your Password" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <Form.Item>
              <button type="submit" className="dash-btn-two tran3s me-3">
                Submit
              </button>
            </Form.Item>
          </Form>
        </>
      )}
      {isSearchParams && <AccountAlreadyExist searchParams={searchParams} />}
    </>
  );
}

function AccountAlreadyExist({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(10);
  console.info('countdown: ', countdown);
  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      return router.replace('/');
    }
  });
  return (
    <>
      <h3 className="section-page-title">{searchParams.get('error')}</h3>
      <Alert message={searchParams.get('error_description')} type="error" />
      <h5>You will be directed into homepage on {countdown} seconds</h5>
      <p>OR</p>
      <Button
        href="/"
        type="primary"
        style={{
          marginTop: '1rem',
        }}
      >
        Back to Home
      </Button>
    </>
  );
}
