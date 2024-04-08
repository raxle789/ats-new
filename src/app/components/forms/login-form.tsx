'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Resolver, useForm, SubmitHandler } from 'react-hook-form';
import ErrorMsg from '../common/error-msg';
import icon from '@/assets/images/icon/icon_60.svg';
import { userAuth } from '@/libs/Login';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hook';
import { setAuthState } from '@/redux/features/authorizingSlice';
import { Input } from 'antd';

type formData = {
  email: string;
  password: string;
  is_rememberOn: string;
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const clientKey = process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY;

  const [formData, setFormData] = useState<formData>({
    email: '',
    password: '',
    is_rememberOn: 'off',
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({
    email: [''],
    password: [''],
    userNotFound: [''],
    invalidPassword: [''],
    login: [''],
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
    console.log(formData);

    const authorizing = await userAuth(formData);
    if (!authorizing.success) {
      setErrors(authorizing.message as { [key: string]: string[] });
      return;
    }

    console.log('check if user logged in successfully', authorizing);
    setErrors(authorizing.message as { [key: string]: string[] });

    setTimeout(() => {
      router.push('/main/job');
      if (authorizing) {
        dispatch(setAuthState({ newAuthState: true }));
      }
    }, 3000);
  };

  useEffect(() => {
    // if (!checkedEmployee) {
    //   console.log('merefresh');
    //   router.refresh();
    // }
  }, [checkedEmployee]);
  return (
    <form onSubmit={formOnSubmit} className="mt-10" action="" method="POST">
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-10">
            <label>Email*</label>
            <input
              className="login-input"
              type="email"
              placeholder="james@example.com"
              name="email"
              value={formData.email}
              onChange={inputOnChange}
            />
            {/* <Input /> */}
            <div className="help-block with-errors">
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-10">
            <label>Password*</label>
            <input
              type={`${showPass ? 'text' : 'password'}`}
              placeholder="Enter Password"
              className="pass_log_id login-input"
              name="password"
              value={formData.password}
              onChange={inputOnChange}
            />
            {/* <Input.Password /> */}
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? 'eye-slash' : ''}`}>
                <Image src={icon} alt="icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
          </div>
        </div>
        {checkedEmployee && (
          <div className="col-12 mb-15">
            <div className="input-group-meta position-relative">
              <label>OTP*</label>
              <input
                type="text"
                className="login-input"
                placeholder="OTP Code"
                // {...register('otp', { required: `OTP is required!` })}
                name="otp"
              />
              <div className="help-block with-errors">
                {/* <ErrorMsg msg={errors.otp?.message!} /> */}
              </div>
            </div>
          </div>
        )}
        {!checkedEmployee && (
          <div className="col-12 mt-10 mb-10">
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
              <input
                type="checkbox"
                id="remember"
                name="is_rememberOn"
                onChange={inputOnChange}
              />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <a href="#">Forget Password?</a>
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
        {errors.userNotFound && (
          <span className="text-center text-danger">{errors.userNotFound}</span>
        )}
        {errors.invalidPassword && (
          <span className="text-center text-danger">
            {errors.invalidPassword}
          </span>
        )}
        {errors.login && (
          <span className="text-center text-success">{errors.login}</span>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
