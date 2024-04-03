'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Resolver, useForm, SubmitHandler } from 'react-hook-form';
import ErrorMsg from '../common/error-msg';
import icon from '@/assets/images/icon/icon_60.svg';

// form data type
type IFormData = {
  email: string;
  password: string;
  otp: string;
};

interface LoginFormProps {
  checkedEmployee: boolean;
}

// resolver
const resolver: Resolver<IFormData> = async (values) => {
  const errors: Record<string, any> = {};

  if (!values.email) {
    errors.email = {
      type: 'required',
      message: 'Email is required.',
    };
  }
  if (!values.password) {
    errors.password = {
      type: 'required',
      message: 'Password is required.',
    };
  }
  if (!values.otp) {
    errors.otp = {
      type: 'required',
      message: 'OTP is required.',
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

const LoginForm: React.FC<LoginFormProps> = ({ checkedEmployee }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const clientKey = process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY;
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = (data: IFormData) => {
    if (data) {
      console.log(data);
      alert('Login successfully!');
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10"
      action=""
      method="POST"
    >
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              {...register('email', { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={`${showPass ? 'text' : 'password'}`}
              placeholder="Enter Password"
              className="pass_log_id"
              {...register('password', { required: `Password is required!` })}
              name="password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? 'eye-slash' : ''}`}>
                <Image src={icon} alt="icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        {checkedEmployee && (
          <div className="col-12 mb-15">
            <div className="input-group-meta position-relative">
              <label>OTP*</label>
              <input
                type="text"
                placeholder="OTP Code"
                {...register('otp', { required: `OTP is required!` })}
                name="otp"
              />
              <div className="help-block with-errors">
                <ErrorMsg msg={errors.otp?.message!} />
              </div>
            </div>
          </div>
        )}
        {!checkedEmployee && (
          <div className="col-12 mb-10">
            <div
              className="g-recaptcha"
              data-sitekey={clientKey}
              data-action="LOGIN"
            ></div>
          </div>
        )}

        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <a href="#">Forget Password?</a>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
