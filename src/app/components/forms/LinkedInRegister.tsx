'use client';

import { useAppSessionContext } from "@/libs/Sessions/AppSession";
import { Alert, Avatar, Button, DatePicker, Form, Input, message } from "antd";
import { linkedinSession } from "@/libs/Sessions/utils";
import { DecryptSession } from "@/libs/Sessions/jwt";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RegisterWithLinkedIn } from "@/libs/Registration/LinkedIn";
import { useAppDispatch } from "@/redux/hook";
import { setRegisterStep } from "@/redux/features/fatkhur/registerSlice";

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
  const [zodErrors, setZodErrors] = useState<{ [key: string]: string[] } | null>(null);
  const dispatch = useAppDispatch();

  /* ACTIONS */
  const onFinish = async (values: any) => {
    console.log(values);
    const plainObjects = JSON.parse(JSON.stringify(values));
    console.info('date:', plainObjects.dateOfBirth instanceof Date);
    const doRegisterPhase1 = await RegisterWithLinkedIn({
      ...plainObjects,
      dateOfBirth: new Date(plainObjects.dateOfBirth)
    });
    if(!doRegisterPhase1.success) {
      console.info('zodErrors:', doRegisterPhase1.errors);
      setZodErrors(doRegisterPhase1.errors);
      return message.error(doRegisterPhase1.message);
    };

    message.success(doRegisterPhase1.message);
    return dispatch(setRegisterStep(3));
  };
  /* END OF ACTIONS */

  useEffect(() => {
    form.setFieldsValue({
      fullname: decodedLinkedInSession.name,
      email: decodedLinkedInSession.email,
    })
  })
  return (
    <>
      {decodedLinkedInSession &&
        <>
          <h3>Your LinkedIn Account</h3>
          <Avatar
            src={`${decodedLinkedInSession.picture}`}
            size={80}
          />
          <Form
            form={form}
            name="reg-with-linkedin"
            onFinish={onFinish}
          >
            <Form.Item
              name={'fullname'}
              label='Full Name'
              validateStatus={zodErrors?.fullname ? 'error' : ''}
              help={zodErrors?.fullname?.toString()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'email'}
              label='Email Address'
              validateStatus={zodErrors?.email ? 'error' : ''}
              help={zodErrors?.email?.toString()}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name={'phoneNumber'}
              label='Phone Number'
              validateStatus={zodErrors?.phoneNumber ? 'error' : ''}
              help={zodErrors?.phoneNumber?.toString()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'dateOfBirth'}
              label="DatePicker"
              validateStatus={zodErrors?.dateOfBirth ? 'error' : ''}
              help={zodErrors?.dateOfBirth?.toString()}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={'password'}
              label="Password"
              validateStatus={zodErrors?.password ? 'error' : ''}
              help={zodErrors?.password?.toString()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'confirmPassword'}
              label="Confirm Password"
              validateStatus={zodErrors?.confirmPassword ? 'error' : ''}
              help={zodErrors?.confirmPassword?.toString()}
            >
              <Input />
            </Form.Item>
            <Form.Item>
            <button type="submit" className="dash-btn-two tran3s me-3">
              Submit
            </button>
          </Form.Item>
          </Form>
        </>
      }
      {isSearchParams &&
        <AccountAlreadyExist searchParams={searchParams} />
      }
    </>
  );
};

function AccountAlreadyExist({ searchParams } : { searchParams: URLSearchParams }) {
  return (
    <>
      <h3>{searchParams.get('error')}</h3>
      <Alert message={searchParams.get('error_description')} type="error" />
      <Button
        href="/"
        type="primary"
        style={{
          marginTop: '1rem'
        }}
      >
        Back to Home
      </Button>
    </>
  );
};