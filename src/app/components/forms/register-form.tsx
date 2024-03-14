'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Resolver, useForm, SubmitHandler } from 'react-hook-form';
import ErrorMsg from '../common/error-msg';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setStep } from '@/redux/features/stepSlice';
import { setRegister } from '@/redux/features/registerSlice';

// form data type
type IFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  uploadPhoto: FileList;
};

// schema
const schema = Yup.object().shape({
  fullName: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  // blm disetting
});

// resolver
const resolver: Resolver<IFormData> = async (values) => {
  const errors: Record<string, any> = {};

  if (!values.fullName) {
    errors.fullName = {
      type: 'required',
      message: 'Full Name is required.',
    };
  }
  if (!values.email) {
    errors.email = {
      type: 'required',
      message: 'Email is required.',
    };
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = {
      type: 'required',
      message: 'Phone Number is required.',
    };
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = {
      type: 'required',
      message: 'Date of Birth is required.',
    };
  }
  if (!values.uploadPhoto) {
    errors.uploadPhoto = {
      type: 'required',
      message: 'Photo is required.',
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
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
  const fullName = watch('fullName');

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    // const uploadedFiles = Array.from(data.uploadPhoto as FileList).map(
    //   (file) => file.name,
    // );

    console.log('watchedValues: ', watchedValues);
    dispatch(setRegister(data));
    // dispatch(setRegister({ ...data, uploadPhoto: uploadedFiles[0] }));
    console.log('data saat ini: ', data);
    console.log('fullname: ', fullName);
    dispatch(setStep({ newStep: 2 }));
  };

  useEffect(() => {
    // setValue('fullName', step1Data.fullName);
    // setValue('email', step1Data.email);
    // setValue('phoneNumber', step1Data.phoneNumber);
    // setValue('dateOfBirth', step1Data.dateOfBirth);
    reset(step1Data);
    console.log('coba data: ', step1Data);
  }, [step1Data]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Full Name*</label>
            <input
              type="text"
              placeholder="James Brower"
              {...register('fullName', { required: `Full Name is required!` })}
              name="fullName"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.fullName?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
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
          <div className="input-group-meta position-relative mb-25">
            <label>Phone Number*</label>
            <input
              type="text"
              placeholder="081234567890"
              {...register('phoneNumber', {
                required: `Phone Number is required!`,
              })}
              name="phoneNumber"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.phoneNumber?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Date of Birth*</label>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                id="date-of-birth"
                {...register('dateOfBirth', {
                  required: `Date of Birth is required!`,
                })}
                name="dateOfBirth"
              />
            </div>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.dateOfBirth?.message!} />
            </div>
          </div>
        </div>
        <div className="">
          <div className="input-group-meta position-relative mb-25">
            <label>Upload Photo*</label>
            <div className="upload-container">
              <input
                className="upload-photo-btn"
                type="file"
                id="upload-photo"
                accept="image/*"
                {...register('uploadPhoto', {
                  required: `Photo is required!`,
                })}
                name="uploadPhoto"
                onChange={handleFileChange}
              />
              <label htmlFor="photo-input" className="photo-input">
                <Image
                  src={uploadIcon}
                  alt="upload-icon"
                  className="upload-img"
                />
                <span className="fw-500 ms-2 text-dark upload-label">
                  Upload your Photo
                </span>
              </label>
            </div>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.uploadPhoto?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>}
        </div>

        <div className="col-12">
          {/* {isFormSubmitted && Object.keys(errors).length > 0 && (
            <div className="alert alert-danger" role="alert">
              Please fill in all required fields.
            </div>
          )} */}
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
