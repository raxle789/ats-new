'use client';

import { useRouter } from 'next/navigation';
import { RegisterPhase1 } from '@/libs/Registration';
import { Input, Form, DatePicker, Spin, message } from 'antd';
import type { DatePickerProps, FormProps } from 'antd';
import { useState } from 'react';
export interface FieldType {
  fullname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: any;
  password: string;
  confirmPassword: string;
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
    console.info('Submitted Values: ', values);
    const plainObjects = JSON.parse(JSON.stringify(values));
    /**
     * @description Use JSON.Parse(JSON.stringify(values)) in order to send data into the server-action as a plain object;
     */
    const doRegisterPhase1 = await RegisterPhase1(plainObjects);
    console.info('Register Results: ', doRegisterPhase1);
    if(!doRegisterPhase1.success) {
      console.info('Zod Error:', doRegisterPhase1.errors);
      setSpinning(false);
      setErrors(doRegisterPhase1.errors);
      return message.error(doRegisterPhase1.message);
    };
    console.info(doRegisterPhase1);
    message.success(doRegisterPhase1.message);
    router.replace('/dashboard/user/stages');
    setSpinning(false);
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
                /* Display Error */
                validateStatus={errors?.fullname ? 'error' : ''}
                help={errors && errors.fullname}
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
                /* Display Error */
                validateStatus={errors?.email ? 'error' : ''}
                help={errors && errors.email}
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
                /* Display Error */
                validateStatus={errors?.phoneNumber ? 'error' : ''}
                help={errors && errors.phoneNumber}
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
                /* Display Error */
                validateStatus={errors?.dateOfBirth ? 'error' : ''}
                help={errors && errors.dateOfBirth}
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
                /* Display Error */
                validateStatus={errors?.password ? 'error' : ''}
                help={errors && errors.password}
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
                /* Display Error */
                validateStatus={errors?.confirmPassword ? 'error' : ''}
                help={errors && errors.confirmPassword}
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
