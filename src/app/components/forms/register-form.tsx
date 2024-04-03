'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
// import * as Yup from 'yup';
import { Resolver, useForm, SubmitHandler } from 'react-hook-form';
import ErrorMsg from '../common/error-msg';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setStep } from '@/redux/features/stepSlice';
import icon from '@/assets/images/icon/icon_60.svg';
import { setRegister } from '@/redux/features/registerSlice';

// form data type
type IFormData = {
  email: string;
  password: string;
  confirmPass: string;
};

// schema
// const schema = Yup.object().shape({
//   fullName: Yup.string().required().label('Name'),
//   email: Yup.string().required().email().label('Email'),
//   password: Yup.string().required().min(6).label('Password'),
// });

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
  if (!values.confirmPass) {
    errors.confirmPass = {
      type: 'required',
      message: 'Confirm Password is required.',
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const step1Data = useAppSelector((state) => state.register.dataCandidate);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUploadedFileName(file.name);
    }
  };

  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormData>({ resolver, defaultValues: step1Data });
  const watchedValues = watch();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    console.log('watchedValues: ', watchedValues);
    // dispatch(setRegister(data));
    // dispatch(setRegister({ ...data, uploadPhoto: uploadedFiles[0] }));
    console.log('data form 1: ', data);
    dispatch(setStep({ newStep: 2 }));
  };

  useEffect(() => {
    reset(step1Data);
    console.log('data form 1: ', step1Data);
  }, [step1Data]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="col-6">
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
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-20">
            <label>Confirm Password*</label>
            <input
              type={`${showConfirmPass ? 'text' : 'password'}`}
              placeholder="Confirm Your Password"
              className="pass_log_id"
              {...register('confirmPass', {
                required: `Confirm Password is required!`,
              })}
              name="confirmPass"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              <span
                className={`passVicon ${showConfirmPass ? 'eye-slash' : ''}`}
              >
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.confirmPass?.message!} />
            </div>
          </div>
        </div>

        <div className="col-12">
          {/* {isFormSubmitted && Object.keys(errors).length > 0 && (
            <div className="alert alert-danger" role="alert">
              Please fill in all required fields.
            </div>
          )} */}
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-10"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
