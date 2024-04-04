'use client';

import { createCandidates } from '@/libs/Registration';
import { userRegister2 } from '@/libs/validations/Register';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppDispatch } from '@/redux/hook';
import { useState } from 'react';

const source: string[] = ['Email', 'Erajaya Career Fest', 'Instagram'];

const RegisterFormStep1 = () => {
  const dispatch = useAppDispatch();
  const [hasLinkedIn, setHasLinkedIn] = useState('no');

  const [formData, setFormData] = useState({
    gender: 'default',
    phone_number: 0,
    date_of_birth: '',
    source_referer: 'default',
    current_salary: 0,
    linkedin_profile_url: '',
  });

  const linkedInRadiosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasLinkedIn(e.target.value);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.info('the data', formData);
    const validate = userRegister2.safeParse(formData);
    if (!validate.success) {
      console.log('validate', validate.error.flatten());
    }

    const candidate = await createCandidates(formData);
    console.info(candidate);
    if (candidate.success === false) {
      return console.info('failed');
    }

    dispatch(setRegisterStep('third'));
  };

  return (
    <form onSubmit={formOnSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Gender*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="gender"
              value={formData.gender}
              onChange={selectOnChange}
            >
              <option value="default">Please choose gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="help-block with-errors"></div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Phone Number*</label>
            <input
              type="number"
              placeholder="081234567890"
              name="phone_number"
              value={formData.phone_number}
              onChange={inputOnChange}
            />
            <div className="help-block with-errors"></div>
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
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={inputOnChange}
              />
            </div>
            <div className="help-block with-errors"></div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Source*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="source_referer"
              value={formData.source_referer}
              onChange={selectOnChange}
            >
              <option value="default">Please choose</option>
              {source.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="help-block with-errors"></div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Expected Salary (Gross / Month)*</label>
            <input
              type="number"
              placeholder="Enter Expected Salary"
              className="pass_log_id"
              name="current_salary"
              value={formData.current_salary}
              onChange={inputOnChange}
            />
            <div className="help-block with-errors"></div>
          </div>
        </div>
        <div className="col-12 row row-cols-2">
          <div className="col-6">
            <div className="position-relative mb-25">
              <label>Do you have a LinkedIn Account?*</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={'yes'}
                  checked={hasLinkedIn === 'yes'}
                  onChange={linkedInRadiosChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="no"
                  checked={hasLinkedIn === 'no'}
                  onChange={linkedInRadiosChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
          </div>
          {hasLinkedIn === 'yes' && (
            <div className="col-6">
              <div className="input-group-meta position-relative mb-20">
                <label>LinkedIn URL*</label>
                <input
                  type="text"
                  placeholder="Enter LinkedIn URL"
                  className="pass_log_id"
                  name="linkedin_profile_url"
                  value={formData.linkedin_profile_url}
                  onChange={inputOnChange}
                />
                <div className="help-block with-errors"></div>
              </div>
            </div>
          )}
        </div>
        <div className="col-5 col-sm-6">
          <button
            className="btn-eleven fw-500 tran3s mt-20"
            onClick={() => dispatch(setRegisterStep(''))}
          >
            Back
          </button>
        </div>
        <div className="col-5 col-sm-6">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s mt-20"
            // onClick={() => dispatch(setRegisterStep('third'))}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterFormStep1;
