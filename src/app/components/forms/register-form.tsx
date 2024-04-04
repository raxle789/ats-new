'use client';

import Image from 'next/image';
import icon from '@/assets/images/icon/icon_60.svg';
import { useState } from 'react';
import { createUser } from '@/libs/Registration';
import { useAppDispatch } from '@/redux/hook';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    <form onSubmit={formOnSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Full Name*</label>
            <input
              type="text"
              placeholder="James Brower"
              name="name"
              value={formData.name}
              onChange={inputOnChange}
            />
            <div className="help-block with-errors">
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              name="email"
              value={formData.email}
              onChange={inputOnChange}
              autoComplete="off"
            />
            <div className="help-block with-errors">
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={`password`}
              placeholder="Enter Password"
              className="pass_log_id"
              name="password"
              value={formData.password}
              onChange={inputOnChange}
              autoComplete="off"
            />
            <span
              className="placeholder_icon"
              // onClick={}
            >
              <span className={`passVicon eye-slash`}>
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-20">
            <label>Confirm Password*</label>
            <input
              type={`password`}
              placeholder="Confirm Your Password"
              className="pass_log_id"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={inputOnChange}
              autoComplete="off"
            />
            <span
              className="placeholder_icon"
              // onClick={}
            >
              <span className={`passVicon eye-slash`}>
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              {errors.confirm_password && (
                <span className="text-danger">{errors.confirm_password}</span>
              )}
            </div>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-10"
          >
            Next
          </button>
        </div>
        <div className="help-block text-center mt-2 with-errors">
          {errors.saveUser && (
            <span className="text-danger">{errors.saveUser}</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
