'use client';

import { useRouter } from 'next/navigation';
import { RegisterPhase1 } from '@/libs/Registration';
import { Input, Form, DatePicker, Spin, message } from 'antd';
import type { FormProps } from 'antd';
import React, { useState } from 'react';
export interface FieldType {
  fullname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: any;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  // const [fullname, setFullname] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
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
    if (!doRegisterPhase1.success) {
      console.info('Zod Error:', doRegisterPhase1.errors);
      setSpinning(false);
      setErrors(doRegisterPhase1.errors);
      return message.error(doRegisterPhase1.message);
    }
    console.info(doRegisterPhase1);
    message.success(doRegisterPhase1.message);
    setTimeout(() => {
      router.replace('/dashboard/user/stages'); // change to -> candidate
    }, 1500);
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

  const sanitizePhoneNumber = (input: string) => {
    let numericInput = input.replace(/\D/g, '');
    if (numericInput.length > 0 && numericInput[0] === '0') {
      numericInput = '0' + numericInput.slice(1);
    }
    form.setFieldsValue({
      phoneNumber: numericInput,
    });
  };

  const sanitizeFullname = (input: string) => {
    let nameInput = input.replace(/[^a-zA-Z\s]/g, '');
    form.setFieldsValue({
      fullname: nameInput,
    });
  };
  return (
    <>
      <Form
        name="form1"
        variant="filled"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta position-relative mb-15">
              <label>
                Full Name (as per ID/Passport)
                <span style={{ color: '#ff1818' }}>*</span>
              </label>
              <Form.Item<FieldType>
                name="fullname"
                /* Display Error */
                validateStatus={errors?.fullname ? 'error' : ''}
                help={errors && errors.fullname}
              >
                <Input
                  placeholder="Your Full Name"
                  onChange={(e) => sanitizeFullname(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group-meta position-relative mb-15">
              <label>
                Email<span style={{ color: '#ff1818' }}>*</span>
              </label>
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
              <label>
                Phone Number<span style={{ color: '#ff1818' }}>*</span>
              </label>
              <Form.Item<FieldType>
                name="phoneNumber"
                /* Display Error */
                validateStatus={errors?.phoneNumber ? 'error' : ''}
                help={errors && errors.phoneNumber}
              >
                <Input
                  placeholder="Your Phone Number"
                  onChange={(e) => sanitizePhoneNumber(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label>
                Date of Birth<span style={{ color: '#ff1818' }}>*</span>
              </label>
              <Form.Item<FieldType>
                name="dateOfBirth"
                /* Display Error */
                validateStatus={errors?.dateOfBirth ? 'error' : ''}
                help={errors && errors.dateOfBirth}
              >
                <DatePicker
                  className="w-100"
                  format={'DD-MMM-YYYY'}
                  placeholder="Select Date"
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label>
                Password<span style={{ color: '#ff1818' }}>*</span>
              </label>
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
              <label>
                Confirm Password<span style={{ color: '#ff1818' }}>*</span>
              </label>
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
