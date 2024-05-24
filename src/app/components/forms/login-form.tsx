'use client';
import React, { useState, useEffect, createRef } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Resolver, useForm, SubmitHandler } from 'react-hook-form';
import ErrorMsg from '../common/error-msg';
import icon from '@/assets/images/icon/icon_60.svg';
import { GReCaptchaV2Check, userAuth } from '@/libs/Login';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hook';
import { setAuthState } from '@/redux/features/authorizingSlice';
import { Input, Form, Checkbox, Spin, message } from 'antd';
import type { FormProps, CheckboxProps } from 'antd';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
/* Google ReCaptcha */
import ReCAPTCHA from "react-google-recaptcha";

type FieldType = {
  email?: string;
  password?: string;
  otp?: string;
  is_rememberOn: boolean;
};

type formData = {
  email: string;
  password: string;
  is_rememberOn: string;
  otp: string;
};

interface LoginFormProps {
  checkedEmployee: boolean;
  setSpinning: React.Dispatch<boolean>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  checkedEmployee,
  setSpinning,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checkedState, setCheckedState] = useState(false);
  const [form] = Form.useForm();
  const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
    setCheckedState(e.target.checked);
  };
  /* Captcha Verify */
  const recaptchaRef = createRef();
  const [token, setToken] = useState<any>('');

  const captchaOnChange = (value: string | null)  => {
    // console.log('callback token: ', value);
    setToken(value);
  };
  // const [spinning, setSpinning] = useState<boolean>(false);

  // const showLoader = () => {
  //   setSpinning(false);
  //   // setTimeout(() => {
  //   // }, 3000);
  // };
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setSpinning(true);
    console.log('Suubmitted data:', values);
    console.info('authorizing user...');
    /**
     * Verify captcha
     */
    const checkingCaptcha = await GReCaptchaV2Check(token);
    // console.log('result checking captcha: ', checkingCaptcha);
    if(!checkingCaptcha.success) {
      setSpinning(false);
      return message.error('Please verify that captcha!');
    }
    const authorizing = await userAuth(values);
    /* check and directing user stage */
    if (authorizing.success && 'data' in authorizing) {
      console.info('directing user to otp form or fill form...');
      router.push('/dashboard/user/stages');
      return dispatch(setRegisterStep(authorizing.data?.stage as number));
    }

    if (authorizing.success === false) {
      alert(authorizing.message);
      return setSpinning(false);
    }
    console.info('user required data is completed...');
    message.success(authorizing.message);
    /* Directing to job list */
    router.push('/dashboard/user');
    setSpinning(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const [showPass, setShowPass] = useState<boolean>(false);
  const clientKey = process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string;

  useEffect(() => {
    form.setFieldsValue({ is_rememberOn: false });
  }, []);
  return (
    <>
      {/* <Spin spinning={spinning} fullscreen /> */}

      <Form
        name="login-form"
        variant="filled"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta position-relative mb-10">
              <label>Email*</label>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta position-relative mb-10">
              <label>Password*</label>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </div>
          </div>
          {checkedEmployee && (
            <div className="col-12 mb-15">
              <div className="input-group-meta position-relative">
                <label>OTP*</label>
                <Form.Item<FieldType>
                  name="otp"
                  rules={[{ required: true, message: 'Please input otp!' }]}
                >
                  <Input placeholder="Your OTP" />
                </Form.Item>
              </div>
            </div>
          )}
          {!checkedEmployee && (
            <div className="col-12 mt-10 mb-10">
            {/* ReCaptcha */}
            <ReCAPTCHA
              ref={recaptchaRef as React.RefObject<ReCAPTCHA>}
              sitekey={clientKey}
              onChange={captchaOnChange}
            />
            {/* <form action="" method="POST">
                <div
                  className="g-recaptcha"
                  data-sitekey="6Lcjj6spAAAAAGhud3xFvVh6XVw8RgavGgyD_y4K"
                  data-callback='gCaptchaOnSubmit'>
                
                </div>
                <br/>
                <input type="hidden" value={'submit'} />
            </form> */}
              {/* <div
                className="g-recaptcha"
                data-sitekey={clientKey}
                data-action="LOGIN"
              ></div> */}
            </div>
          )}

          <div className="col-12">
            {/* <div className="agreement-checkbox d-flex justify-content-between align-items-center"> */}
            <div className="">
              <Form.Item<FieldType> name="is_rememberOn">
                <Checkbox onChange={onChangeCheckbox} checked={checkedState}>
                  Keep me logged in
                </Checkbox>
              </Form.Item>
            </div>
          </div>
          <div className="col-12 mb-3">
            <button
              type="submit"
              className="btn-eleven btn-login fw-500 tran3s d-block mt-20"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Login
            </button>
          </div>
          {/* {errors.userNotFound && (
            <span className="text-center text-danger">{errors.userNotFound}</span>
          )}
          {errors.invalidPassword && (
            <span className="text-center text-danger">
              {errors.invalidPassword}
            </span>
          )}
          {errors.login && (
            <span className="text-center text-success">{errors.login}</span>
          )} */}
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
