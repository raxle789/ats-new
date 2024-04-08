'use client';
import React from 'react';
import Image from 'next/image';
import icon from '@/assets/images/icon/icon_60.svg';
import { useState } from 'react';
import { createUser } from '@/libs/Registration';
import { useAppDispatch } from '@/redux/hook';
import uploadIcon from '@/assets/images/icon/icon_11.svg';

const source: string[] = ['Email', 'Erajaya Career Fest', 'Instagram'];
const lastEducation: string[] = ['SMA/SMK', 'D1', 'S1/Sarjana'];
const major: string[] = [
  'Accounting',
  'Accounting Information',
  'Acturial Science',
];
const jobFunction: string[] = ['Accounting', 'Business', 'Client'];
const jobTitle: string[] = [
  'Internship Announce Radio',
  'Internship Administration',
  'Internship Application Developer',
];
const lineIndustry: string[] = ['Agribusiness', 'Apparel', 'Automotive'];
const level: string[] = ['Director', 'VP', 'General Manager'];

// type FormData = {
//   education: {
//     level: string;
//     major: string;
//     university_name: string;
//     start_year: string;
//     end_year: string;
//     gpa: string;
//   };
//   experience: {
//     company_name: string;
//     job_function: string;
//     job_title: string;
//     job_level: string;
//     line_industry: string;
//     start_at: string;
//     end_at: string;
//     salary: string;
//   };
// };

const FormCV = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [hasLinkedIn, setHasLinkedIn] = useState('no');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: 'default',
    phone_number: 0,
    date_of_birth: '',
    source_referer: 'default',
    current_salary: 0,
    linkedin_profile_url: '',
    education: {
      level: 'default',
      major: 'default',
      university_name: '',
      start_year: '',
      end_year: '',
      gpa: '',
    },
    experience: {
      company_name: '',
      job_function: '',
      job_title: '',
      job_level: '',
      line_industry: '',
      start_at: '',
      end_at: '',
      salary: '',
    },
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

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({
    name: [''],
    email: [''],
    password: [''],
    confirm_password: [''],
    saveUser: [''],
  });

  const [hasExperience, setHasExperience] = useState('you-choose');
  const hasExperienceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasExperience(e.target.value);
  };

  // const [formData, setFormData] = useState<FormData>({

  // });

  const [agreement, setAgreement] = useState<boolean>(false);
  console.log(agreement);

  const agreementOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checked', e.target.checked);
    setAgreement(e.target.checked);
  };

  const [document, setDocument] = useState<File | null | string>(null);
  if (document !== null) {
    const { name, size, type } = document as File;
    console.info('name: ', name);
    console.info('name: ', size);
    console.info('name: ', type);
  }
  const documentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cv = e.target.files && e.target.files[0];
    setDocument(cv);
  };

  const inputOnChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.education) {
      setFormData((prevState) => ({
        ...prevState,
        education: {
          ...prevState.education,
          [name]: value,
        },
      }));
      return;
    } else if (name in formData.experience) {
      setFormData((prevState) => ({
        ...prevState,
        experience: {
          ...prevState.experience,
          [name]: value,
        },
      }));
      return;
    }
  };

  const selectOnChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in formData.education) {
      setFormData((prevState) => ({
        ...prevState,
        education: {
          ...prevState.education,
          [name]: value,
        },
      }));
      return;
    } else if (name in formData?.experience) {
      setFormData((prevState) => ({
        ...prevState,
        experience: {
          ...prevState.experience,
          [name]: value,
        },
      }));
      return;
    }
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
  };
  return (
    <section className="registration-section position-relative pt-50 lg-pt-80 pb-50 lg-pb-80">
      <div className="container">
        <div className="user-data-form user-register-form">
          <div>
            <h2 className="text-center login-title">Create Account</h2>
          </div>
          <div className="form-wrapper m-auto register-wrapper">
            <div className="tab-content mt-40">
              <form onSubmit={formOnSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Full Name*</label>
                      <input
                        type="text"
                        className="login-input"
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
                    <div className="input-group-meta position-relative mb-15">
                      <label>Email*</label>
                      <input
                        type="email"
                        className="login-input"
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

                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Phone Number*</label>
                      <input
                        type="number"
                        className="login-input"
                        placeholder="081234567890"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={inputOnChange}
                        style={{ paddingRight: '11px' }}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Date of Birth*</label>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control login-input"
                          id="date-of-birth"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={inputOnChange}
                          style={{ paddingRight: '11px' }}
                        />
                      </div>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Gender*</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="gender"
                        value={formData.gender}
                        onChange={selectOnChange}
                      >
                        <option value="default">Please choose</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
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
                    <div className="input-group-meta position-relative mb-15">
                      <label>Expected Salary (Gross / Month)*</label>
                      <input
                        type="number"
                        placeholder="Enter Expected Salary"
                        className="pass_log_id login-input"
                        name="current_salary"
                        value={formData.current_salary}
                        onChange={inputOnChange}
                        style={{ paddingRight: '11px' }}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="position-relative mb-15">
                      <label style={{ fontSize: '14px' }}>
                        Do you have a LinkedIn Account?*
                      </label>
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
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                          style={{ fontSize: '14px' }}
                        >
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
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                          style={{ fontSize: '14px' }}
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  {hasLinkedIn === 'yes' && (
                    <div className="col-6">
                      <div className="input-group-meta position-relative mb-15">
                        <label>LinkedIn URL*</label>
                        <input
                          type="text"
                          placeholder="Enter LinkedIn URL"
                          className="pass_log_id login-input"
                          name="linkedin_profile_url"
                          value={formData.linkedin_profile_url}
                          onChange={inputOnChange}
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                  )}
                  {hasLinkedIn === 'no' && <div className="col-6"></div>}
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Last Education Level*</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="level"
                        value={formData.education.level}
                        onChange={selectOnChange2}
                      >
                        <option value="choose-education">Please choose</option>
                        {lastEducation.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Major*</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="major"
                        value={formData.education.major}
                        onChange={selectOnChange2}
                      >
                        <option value="choose-major">Please choose</option>
                        {major.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-15">
                      <label>University/School*</label>
                      <input
                        type="text"
                        className="login-input"
                        placeholder="Universitas..."
                        name="university_name"
                        value={formData.education.university_name}
                        onChange={inputOnChange2}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Start Year*</label>
                      <input
                        type="number"
                        className="login-input"
                        placeholder="2020"
                        name="start_year"
                        value={formData.education.start_year}
                        onChange={inputOnChange2}
                        style={{ paddingRight: '11px' }}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>End Year*</label>
                      <input
                        type="number"
                        className="login-input"
                        placeholder="2024"
                        name="end_year"
                        value={formData.education.end_year}
                        onChange={inputOnChange2}
                        style={{ paddingRight: '11px' }}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>GPA*</label>
                      <input
                        type="text"
                        className="login-input"
                        name="gpa"
                        value={formData.education.gpa}
                        onChange={inputOnChange2}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Upload CV*</label>
                      <div className="upload-container">
                        <input
                          className="upload-photo-btn"
                          type="file"
                          id="upload-CV"
                          name="document"
                          accept=".pdf"
                          onChange={documentOnChange}
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
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="position-relative mb-15">
                      {/* <label>LinkedIn*</label> */}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="RadioFreshGraduate"
                          id="RadioFreshGraduateValue1"
                          value="no"
                          checked={hasExperience === 'no'}
                          onChange={hasExperienceOnChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="RadioFreshGraduateValue1"
                          style={{ fontSize: '14px' }}
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
                          value="yes"
                          checked={hasExperience === 'yes'}
                          onChange={hasExperienceOnChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="RadioFreshGraduateValue2"
                          style={{ fontSize: '14px' }}
                        >
                          Experience
                        </label>
                      </div>
                    </div>
                  </div>
                  {hasExperience === 'yes' && (
                    <>
                      <div className="col-12">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Company Name - Last*</label>
                          <input
                            type="text"
                            className="login-input"
                            placeholder="Company Name"
                            name="company_name"
                            value={formData.experience.company_name}
                            onChange={inputOnChange2}
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Job Function*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="job_function"
                            value={formData.experience.job_function}
                            onChange={selectOnChange2}
                          >
                            <option value="choose-job-function">
                              Please choose
                            </option>
                            {jobFunction.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Job Title*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="job_title"
                            value={formData.experience.job_title}
                            onChange={selectOnChange2}
                          >
                            <option value="choose-job-title">
                              Please choose
                            </option>
                            {jobTitle.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Line Industry*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="line_industry"
                            value={formData.experience.line_industry}
                            onChange={selectOnChange2}
                          >
                            <option value="choose-line-industry">
                              Please choose
                            </option>
                            {lineIndustry.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Level*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="job_level"
                            value={formData.experience.job_level}
                            onChange={selectOnChange2}
                          >
                            <option value="choose-level">Please choose</option>
                            {level.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Period Start*</label>
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control login-input"
                              id="period-start"
                              name="start_at"
                              value={formData.experience.start_at}
                              onChange={inputOnChange2}
                              style={{ paddingRight: '11px' }}
                            />
                          </div>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Period End*</label>
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control login-input"
                              id="period-end"
                              name="end_at"
                              value={formData.experience.end_at}
                              onChange={inputOnChange2}
                              style={{ paddingRight: '11px' }}
                            />
                          </div>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Current Salary (Gross / Month)*</label>
                          <input
                            type="text"
                            placeholder="Enter Current Salary"
                            className="pass_log_id login-input"
                            name="salary"
                            value={formData.experience.salary}
                            onChange={inputOnChange2}
                            style={{ paddingRight: '11px' }}
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Expected Salary (Gross / Month)*</label>
                          <input
                            type="text"
                            placeholder="Enter Expected Salary"
                            className="pass_log_id login-input"
                            // {...register('expectedSalary', {
                            //   required: `Expected Salary is required!`,
                            // })}
                            name="expected-salary"
                            style={{ paddingRight: '11px' }}
                          />
                          <div className="help-block with-errors">
                            {/* <ErrorMsg msg={errors.expectedSalary?.message!} /> */}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {hasExperience === 'no' && (
                    <>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-15">
                          <label>Expected Salary (Gross / Month)*</label>
                          <input
                            type="text"
                            placeholder="Enter Expected Salary"
                            className="pass_log_id login-input"
                            style={{ paddingRight: '11px' }}
                            // {...register('expectedSalary', {
                            //   required: `Expected Salary is required!`,
                            // })}
                            name="expected-salary"
                          />
                          <div className="help-block with-errors">
                            {/* <ErrorMsg msg={errors.expectedSalary?.message!} /> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </>
                  )}

                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Password*</label>
                      <input
                        type={`${showPass ? 'text' : 'password'}`}
                        placeholder="Enter Password"
                        className="pass_log_id login-input"
                        // {...register('password', { required: `Password is required!` })}
                        name="password"
                        value={formData.password}
                        onChange={inputOnChange}
                        autoComplete="off"
                      />
                      <span
                        className="placeholder_icon"
                        onClick={() => setShowPass(!showPass)}
                      >
                        <span
                          className={`passVicon ${showPass ? 'eye-slash' : ''}`}
                        >
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
                    <div className="input-group-meta position-relative mb-15">
                      <label>Confirm Password*</label>
                      <input
                        type={`${showConfirmPass ? 'text' : 'password'}`}
                        placeholder="Confirm Your Password"
                        className="pass_log_id login-input"
                        style={{ paddingRight: '40px' }}
                        // {...register('confirmPass', {
                        //   required: `Confirm Password is required!`,
                        // })}
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={inputOnChange}
                        autoComplete="off"
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
                        {errors.confirm_password && (
                          <span className="text-danger">
                            {errors.confirm_password}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-5 mb-5">
                    <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="check_agreement"
                          id="agreement"
                          checked={agreement === true}
                          onChange={agreementOnChange}
                        />
                        <label className="form-check-label" htmlFor="agreement">
                          By hitting the Register button, you agree to the{' '}
                          <a href="#">Terms conditions</a> &{' '}
                          <a href="#">Privacy Policy</a>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-10">
                    <button
                      type="submit"
                      className="btn-eleven btn-login fw-500 tran3s d-block mt-10"
                    >
                      Register
                    </button>
                  </div>
                  <div className="help-block text-center mt-2 with-errors">
                    {errors.saveUser && (
                      <span className="text-danger">{errors.saveUser}</span>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormCV;
