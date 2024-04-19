'use client';

import { useState } from 'react';
import { createUser } from '@/libs/Registration';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppDispatch } from '@/redux/hook';
import { Input, Form, DatePicker } from 'antd';
import type { DatePickerProps, FormProps } from 'antd';

type FieldType = {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  password?: string;
  confirmPassword?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({
    name: [''],
    email: [''],
    password: [''],
    confirm_password: [''],
    saveUser: [''],
  });

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('form-data', formData);
    /* server-side creating user */
    const store = await createUser(formData);
    console.log(store);
    if (!store.success) {
      setErrors(store.message as { [key: string]: string[] });
      return;
    }

    setErrors({});

    dispatch(setRegisterStep('second'));
  };
  return (
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
              rules={[{ required: true, message: 'Please input your email!' }]}
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
                { required: true, message: 'Please input your phone number!' },
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
                { required: true, message: 'Please input your date of birth!' },
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
  );
};

export default RegisterForm;
