'use client';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Resolver, useForm } from 'react-hook-form';
import ErrorMsg from '../common/error-msg';
import icon from '@/assets/images/icon/icon_60.svg';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
import { useAppDispatch } from '@/redux/hook';
import { setStep } from '@/redux/features/stepSlice';

const domicile: string[] = ['Aceh', 'Jawa', 'Kalimantan'];
const lastEducation: string[] = ['SMA/SMK', 'D1', 'S1/Sarjana'];
const major: string[] = [
  'Accounting',
  'Accounting Information',
  'Acturial Science',
];
const source: string[] = ['Email', 'Erajaya Career Fest', 'Instagram'];
const jobFunction: string[] = ['Accounting', 'Business', 'Client'];
const jobTitle: string[] = [
  'Internship Announce Radio',
  'Internship Administration',
  'Internship Application Developer',
];
const lineIndustry: string[] = ['Agribusiness', 'Apparel', 'Automotive'];
const level: string[] = ['Director', 'VP', 'General Manager'];

// form data type
type IFormData = {
  gender: string;
  domicile: string;
  lastEducation: string;
  major: string;
  school: string;
  startYear: string;
  endYear: string;
  gpa: string;
  source: string;
  expectedSalary: string;
  companyName: string;
  jobFunction: string;
  jobTitle: string;
  lineIndustry: string;
  level: string;
  periodStart: string;
  periodEnd: string;
  currentSalary: string;
  uploadCV: string;
  linkedin: string;
  password: string;
  confirmPass: string;
  termsOfUse: string;
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
  return {
    values: values.gender ? values : {},
    errors: !values.gender
      ? {
          gender: {
            type: 'required',
            message: 'Gender is required.',
          },
          domicile: {
            type: 'required',
            message: 'Domicile is required.',
          },
          lastEducation: {
            type: 'required',
            message: 'Last Education Level is required.',
          },
          major: {
            type: 'required',
            message: 'Major is required.',
          },
          school: {
            type: 'required',
            message: 'School is required.',
          },
          startYear: {
            type: 'required',
            message: 'Start Year is required.',
          },
          endYear: {
            type: 'required',
            message: 'End Year is required.',
          },
          gpa: {
            type: 'required',
            message: 'GPA is required.',
          },
          source: {
            type: 'required',
            message: 'Source is required.',
          },
          expectedSalary: {
            type: 'required',
            message: 'Expected Salary is required.',
          },
          companyName: {
            type: 'required',
            message: 'Company Name is required.',
          },
          jobFunction: {
            type: 'required',
            message: 'Job Function is required.',
          },
          jobTitle: {
            type: 'required',
            message: 'Job Title is required.',
          },
          lineIndustry: {
            type: 'required',
            message: 'Line Industry is required.',
          },
          level: {
            type: 'required',
            message: 'Level is required.',
          },
          periodStart: {
            type: 'required',
            message: 'Period Start is required.',
          },
          periodEnd: {
            type: 'required',
            message: 'Period End is required.',
          },
          currentSalary: {
            type: 'required',
            message: 'Current Salary is required.',
          },
          uploadCV: {
            type: 'required',
            message: 'CV is required.',
          },
          linkedin: {
            type: 'required',
            message: 'LinkedIn URL is required.',
          },
          password: {
            type: 'required',
            message: 'Password is required.',
          },
          confirmPass: {
            type: 'required',
            message: 'Confirm Password is required.',
          },
          termsOfUse: {
            type: 'required',
            message: 'To continue, you must agree to our terms.',
          },
        }
      : {},
  };
};

const RegisterFormNext = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [linkedinValue, setLinkedinValue] = useState<string>('No');
  const [freshGraduate, setFreshGraduate] = useState<string>('Fresh Graduate');

  const handleLinkedInChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkedinValue(event.target.value);
  };
  const handleFreshGraduateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFreshGraduate(event.target.value);
  };
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
      // alert('Register successfully!');
      console.log('data sampai step 2', data);
      reset();
    }
  };
  return (
    <form>
      <div className="row">
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Gender*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('gender', { required: `Gender is required!` })}
            >
              <option value="choose-gender">Please choose gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.gender?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Domicile*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('domicile', { required: `Domicile is required!` })}
            >
              <option value="choose-domicile">Please choose domicile</option>
              {domicile.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              placeholder="James Brower"
              {...register('domicile', { required: `Domicile is required!` })}
              name="name"
            /> */}
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.domicile?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Last Education Level*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('lastEducation', {
                required: `Last Education Level is required!`,
              })}
            >
              <option value="choose-education">Please choose</option>
              {lastEducation.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.lastEducation?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Major*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('major', {
                required: `Major is required!`,
              })}
            >
              <option value="choose-major">Please choose</option>
              {major.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.major?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>University/School*</label>
            <input
              type="text"
              placeholder="Universitas..."
              {...register('school', { required: `School is required!` })}
              name="school"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.school?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Start Year*</label>
            <input
              type="number"
              placeholder="2020"
              {...register('startYear', {
                required: `Start Year is required!`,
              })}
              name="Start Year"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.startYear?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>End Year*</label>
            <input
              type="number"
              placeholder="2024"
              {...register('endYear', {
                required: `End Year is required!`,
              })}
              name="End Year"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.endYear?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>GPA*</label>
            <input
              type="text"
              {...register('gpa', {
                required: `GPA is required!`,
              })}
              name="GPA"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.gpa?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Source*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register('source', {
                required: `Source is required!`,
              })}
            >
              <option value="choose-source">Please choose</option>
              {source.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.source?.message!} />
            </div>
          </div>
        </div>
        <div className="position-relative mb-25">
          {/* <label>LinkedIn*</label> */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="RadioFreshGraduate"
              id="RadioFreshGraduateValue1"
              value="Fresh Graduate"
              checked={freshGraduate === 'Fresh Graduate'}
              onChange={handleFreshGraduateChange}
            />
            <label
              className="form-check-label"
              htmlFor="RadioFreshGraduateValue1"
            >
              Fresh Graduate
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="RadioFreshGraduate"
              id="RadioFreshGraduateValue2"
              value="Experience"
              checked={freshGraduate === 'Experience'}
              onChange={handleFreshGraduateChange}
            />
            <label
              className="form-check-label"
              htmlFor="RadioFreshGraduateValue2"
            >
              Experience
            </label>
          </div>
        </div>
        {freshGraduate === 'Fresh Graduate' ? (
          <div className="col-6">
            <div className="input-group-meta position-relative mb-20">
              <label>Expected Salary (Gross / Month)*</label>
              <input
                type="text"
                placeholder="Enter Expected Salary"
                className="pass_log_id"
                {...register('expectedSalary', {
                  required: `Expected Salary is required!`,
                })}
                name="expected-salary"
              />
              <div className="help-block with-errors">
                <ErrorMsg msg={errors.expectedSalary?.message!} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-25">
                <label>Company Name - Last*</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  {...register('companyName', {
                    required: `Company Name is required!`,
                  })}
                  name="company-name"
                />
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.companyName?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Job Function*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register('jobFunction', {
                    required: `Job Function is required!`,
                  })}
                >
                  <option value="choose-job-function">Please choose</option>
                  {jobFunction.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.jobFunction?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Job Title*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register('jobTitle', {
                    required: `Job Title is required!`,
                  })}
                >
                  <option value="choose-job-title">Please choose</option>
                  {jobTitle.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.jobTitle?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Line Industry*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register('lineIndustry', {
                    required: `Line Industry is required!`,
                  })}
                >
                  <option value="choose-line-industry">Please choose</option>
                  {lineIndustry.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.lineIndustry?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Level*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  {...register('level', {
                    required: `Level is required!`,
                  })}
                >
                  <option value="choose-level">Please choose</option>
                  {level.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.level?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Period Start*</label>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    id="period-start"
                    {...register('periodStart', {
                      required: `Period Start is required!`,
                    })}
                    name="period-start"
                  />
                </div>
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.periodStart?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Period End*</label>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    id="period-end"
                    {...register('periodEnd', {
                      required: `Period End is required!`,
                    })}
                    name="period-end"
                  />
                </div>
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.periodEnd?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-20">
                <label>Expected Salary (Gross / Month)*</label>
                <input
                  type="text"
                  placeholder="Enter Expected Salary"
                  className="pass_log_id"
                  {...register('expectedSalary', {
                    required: `Expected Salary is required!`,
                  })}
                  name="expected-salary"
                />
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.expectedSalary?.message!} />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-20">
                <label>Current Salary (Gross / Month)*</label>
                <input
                  type="text"
                  placeholder="Enter Current Salary"
                  className="pass_log_id"
                  {...register('currentSalary', {
                    required: `Current Salary is required!`,
                  })}
                  name="current-salary"
                />
                <div className="help-block with-errors">
                  <ErrorMsg msg={errors.currentSalary?.message!} />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="">
          <div className="input-group-meta position-relative mb-25">
            <label>Upload CV*</label>
            <div className="upload-container">
              <input
                className="upload-photo-btn"
                type="file"
                id="upload-CV"
                name="uploadCV"
                accept=".pdf"
              />
              <label htmlFor="photo-input" className="photo-input">
                <Image
                  src={uploadIcon}
                  alt="upload-icon"
                  className="upload-img"
                />
                <span className="fw-500 ms-2 text-dark upload-label">
                  Upload your CV
                </span>
              </label>
            </div>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.uploadCV?.message!} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="position-relative mb-25">
            <label>Do you have a LinkedIn Account?*</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="Yes"
                checked={linkedinValue === 'Yes'}
                onChange={handleLinkedInChange}
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
                value="No"
                checked={linkedinValue === 'No'}
                onChange={handleLinkedInChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                No
              </label>
            </div>
          </div>
        </div>
        {linkedinValue === 'Yes' ? (
          <div className="col-6">
            <div className="input-group-meta position-relative mb-20">
              <label>LinkedIn URL*</label>
              <input
                type="text"
                placeholder="Enter LinkedIn URL"
                className="pass_log_id"
                {...register('password', { required: `Password is required!` })}
                name="linkedin-url"
              />
              <div className="help-block with-errors">
                <ErrorMsg msg={errors.linkedin?.message!} />
              </div>
            </div>
          </div>
        ) : (
          <div className="col-6"></div>
        )}
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
              name="password"
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
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                name="agreement"
                id="agreement"
              />
              <label className="form-check-label" htmlFor="agreement">
                By hitting the Register button, you agree to the{' '}
                <a href="#">Terms conditions</a> &{' '}
                <a href="#">Privacy Policy</a>
              </label>
              {/* <input
                type="checkbox"
                name="remember"
                checked={termsState}
                onChange={handleTermsStateChange}
              />
              <label htmlFor="remember">
                By hitting the Register button, you agree to the{' '}
                <a href="#">Terms conditions</a> &{' '}
                <a href="#">Privacy Policy</a>
              </label> */}
            </div>
          </div>
        </div>
        <div className="col-5 col-sm-6">
          <button
            className="btn-eleven fw-500 tran3s mt-20"
            onClick={() => dispatch(setStep({ newStep: 1 }))}
          >
            Back
          </button>
        </div>
        <div className="col-5 col-sm-6">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s mt-20"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </button>
        </div>
        {/* <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
          >
            Register
          </button>
        </div> */}
      </div>
    </form>
  );
};

export default RegisterFormNext;
