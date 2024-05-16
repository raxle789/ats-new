'use client';

import { useRouter } from 'next/navigation';
import { createCandidate, createUser } from '@/libs/Registration';
import { Input, Form, DatePicker, Spin, message } from 'antd';
import type { DatePickerProps, FormProps } from 'antd';
import { useState } from 'react';
import { sendOTP } from '@/libs/Registration/verifications';
import { CANDIDATE, REGISTER } from '@/libs/validations/Register';

type FieldType = {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: any;
  password?: string;
  confirmPassword?: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  /* This should displayed when fail to storing data */
  const [errors, setErrors] = useState<{ [key: string]: string[] } | undefined>(
    { ['']: [''] },
  );
  /**
   *
   * @param values Form-Data from client.
   * @returns { object, void } Successful operation returned object that contains "success" property "true". Failed operation returns "void" that setErrors state.
   */
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setSpinning(true);
    console.info('begin create user...');
    const userData = {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword
    };
    const validateUser = REGISTER.safeParse(userData);
    if(!validateUser.success) {
      const validationError = validateUser.error.flatten().fieldErrors;
      console.log('field error:', validationError);
      for(const [key, value] of Object.entries(validationError)) {
        message.error(`field ${key}: ${value}`);
      };
      return setSpinning(false);
    };
    const candidateData = {
      phoneNumber: values.phoneNumber,
      dateOfBirth: new Date(values.dateOfBirth),
    };
    const validateAge = CANDIDATE.safeParse(candidateData);
    if(!validateAge.success) {
      const validationError = validateAge.error.flatten().fieldErrors;
      console.info(validationError)
      setSpinning(false);
      return message.error(validationError?.dateOfBirth?.toString());
    };
    const userStore = await createUser(userData, candidateData.phoneNumber);
    console.log(userStore);
    if (userStore.success !== true) {
      setSpinning(false);
      return message.error(userStore?.message?.saveUser.toString());
    };
    console.info('create user success, next...', userStore);
    const candidateStore = await createCandidate(candidateData);
    if (candidateStore.success !== true) {
      setSpinning(false)
      return setErrors(candidateStore.message);
    };
    console.info('create candidate successfully', candidateStore);
    /* Send OTP */
    const sendMailOTP = await sendOTP({ email: userData.email as string });
    console.info('Result sending OTP number...', sendOTP);
    if (sendMailOTP.success !== true) {
      setSpinning(false);
      return {
        success: false,
        message: 'Failed to send OTP to email!',
      };
    }
    console.info('Send OTP successfully', sendMailOTP);
    /* Navigating to user-stages */
    router.replace('/dashboard/user/stages');

    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };
  /**
   *
   * @param errorInfo Biar fatih yang kasih deskripsi - Anjay fatih tersangkut redux.
   */
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };
  /**
   *
   * @param date Biar fatih yang kasih deskripsi - Anjay fatih tersangkut redux.
   * @param dateString Biar fatih yang kasih deskripsi - Anjay fatih tersangkut redux.
   */
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Form
        name="form1"
        variant="filled"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta position-relative mb-15">
              <label>Full Name (as per ID/Passport)*</label>
              <Form.Item<FieldType>
                name="fullname"
                rules={[
                  { required: true, message: 'Please input your fullname!' },
                ]}
              >
                <Input placeholder="Your Full Name" />
              </Form.Item>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta position-relative mb-15">
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
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label>Phone Number*</label>
              <Form.Item<FieldType>
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input placeholder="Your Phone Number" />
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label>Date of Birth*</label>
              <Form.Item<FieldType>
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: 'Please input your date of birth!',
                  },
                ]}
              >
                <DatePicker
                  className="w-100"
                  onChange={onChange}
                  placeholder="Select Date"
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
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
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label>Confirm Password*</label>
              <Form.Item<FieldType>
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                ]}
              >
                <Input.Password placeholder="Confirm Your Password" />
              </Form.Item>
            </div>
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn-eleven fw-500 tran3s d-block mt-10 btn-login btn-next"
            >
              Next
            </button>
          </div>
        </div>
      </Form>

      <Spin fullscreen spinning={spinning} />
    </>
  );
};

export default RegisterForm;
