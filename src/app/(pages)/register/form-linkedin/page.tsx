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

const noticePeriodValue: string[] = [
  'Ready join now',
  'Less than 1 month',
  '1 month',
  '2 months',
  '3 months',
  'More than 3 months',
];

const FormLinkedin = () => {
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
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
    education: {
      level: 'default',
      major: 'default',
      university_name: '',
      start_year: '',
      end_year: '',
      gpa: '',
    },
    other_question: {
      noticePeriod: '',
      ever_worked_start_year: '',
      ever_worked_end_year: '',
      disease_name: '',
      disease_year: '',
      relation_name: '',
      relation_position: '',
    },
  });

  const [hasLinkedIn, setHasLinkedIn] = useState('you-choose');
  const linkedInRadiosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasLinkedIn(e.target.value);
  };

  const [hasExperience, setHasExperience] = useState('you-choose');
  const hasExperienceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasExperience(e.target.value);
  };

  const [everWorked, setEverWorked] = useState<string>('you-choose');
  const everWorkedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEverWorked(e.target.value);
  };

  const [disease, setdisease] = useState<string>('you-choose');
  const diseaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdisease(e.target.value);
  };

  const [haveRelation, setHaveRelation] = useState<string>('you-choose');
  const haveRelationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHaveRelation(e.target.value);
  };

  const [agreement, setAgreement] = useState<boolean>(false);
  console.log(agreement);
  const agreementOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checked', e.target.checked);
    setAgreement(e.target.checked);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } else if (name in formData.other_question) {
      setFormData((prevState) => ({
        ...prevState,
        other_question: {
          ...prevState.other_question,
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
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }
  };

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    } else if (name in formData.other_question) {
      setFormData((prevState) => ({
        ...prevState,
        other_question: {
          ...prevState.other_question,
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
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }
  };

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({
    name: [''],
    email: [''],
    password: [''],
    confirm_password: [''],
    saveUser: [''],
  });

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

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                        className="login-input"
                        type="number"
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

                  <div className="col-12">
                    <div className="position-relative mb-25">
                      <label style={{ fontSize: '14px' }}>
                        Work Experience*
                      </label>
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
                        <div className="input-group-meta position-relative mb-20">
                          <label>Company Name - Last*</label>
                          <input
                            type="text"
                            className="login-input"
                            placeholder="Company Name"
                            name="company_name"
                            value={formData.experience.company_name}
                            onChange={inputOnChange}
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-20">
                          <label>Job Function*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="job_function"
                            value={formData.experience.job_function}
                            onChange={selectOnChange}
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
                        <div className="input-group-meta position-relative mb-20">
                          <label>Job Title*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="job_title"
                            value={formData.experience.job_title}
                            onChange={selectOnChange}
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
                        <div className="input-group-meta position-relative mb-20">
                          <label>Line Industry*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="line_industry"
                            value={formData.experience.line_industry}
                            onChange={selectOnChange}
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
                        <div className="input-group-meta position-relative mb-20">
                          <label>Level*</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="job_level"
                            value={formData.experience.job_level}
                            onChange={selectOnChange}
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
                        <div className="input-group-meta position-relative mb-20">
                          <label>Period Start*</label>
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control login-input"
                              id="period-start"
                              name="start_at"
                              value={formData.experience.start_at}
                              onChange={inputOnChange}
                              style={{ paddingRight: '11px' }}
                            />
                          </div>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-20">
                          <label>Period End*</label>
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control login-input"
                              id="period-end"
                              name="end_at"
                              value={formData.experience.end_at}
                              onChange={inputOnChange}
                              style={{ paddingRight: '11px' }}
                            />
                          </div>
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-20">
                          <label>Current Salary (Gross / Month)*</label>
                          <input
                            type="text"
                            placeholder="Enter Expected Salary"
                            className="pass_log_id login-input"
                            name="salary"
                            value={formData.experience.salary}
                            onChange={inputOnChange}
                            style={{ paddingRight: '11px' }}
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta position-relative mb-20">
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
                        <div className="input-group-meta position-relative mb-20">
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
                      <label>Last Education Level*</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="level"
                        value={formData.education.level}
                        onChange={selectOnChange}
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
                        onChange={selectOnChange}
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
                        onChange={inputOnChange}
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
                        onChange={inputOnChange}
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
                        onChange={inputOnChange}
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
                        onChange={inputOnChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Upload CV*</label>
                      <div className="upload-container">
                        <input
                          className="upload-photo-btn btn-login"
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
                    <div className="input-group-meta position-relative mb-15">
                      <label>How long your notice period?*</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="noticePeriod"
                        value={formData.other_question.noticePeriod}
                        onChange={selectOnChange}
                      >
                        <option value="choose-notice-period">
                          Please choose
                        </option>
                        {noticePeriodValue.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="position-relative mb-20">
                      <label style={{ fontSize: '14px' }}>
                        Have you ever worked in Erajaya group of companies?*
                      </label>
                      <div className="row" style={{ paddingLeft: '11px' }}>
                        <div className="form-check col-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="RadioEverWorked"
                            id="RadioEverWorkedValue1"
                            value="no"
                            checked={everWorked === 'no'}
                            onChange={everWorkedChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RadioEverWorkedValue1"
                            style={{ fontSize: '14px' }}
                          >
                            No
                          </label>
                        </div>
                        <div className="col-10"></div>
                        <div className="form-check col-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="RadioEverWorked"
                            id="RadioEverWorkedValue2"
                            value="yes"
                            checked={everWorked === 'yes'}
                            onChange={everWorkedChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RadioEverWorkedValue2"
                            style={{ fontSize: '14px' }}
                          >
                            Yes
                          </label>
                        </div>
                        {everWorked === 'yes' ? (
                          <>
                            <div className="col-5">
                              <div className="input-group-meta position-relative mb-15">
                                <input
                                  type="number"
                                  className="login-input"
                                  placeholder="Start Year"
                                  name="ever_worked_start_year"
                                  value={
                                    formData.other_question
                                      .ever_worked_start_year
                                  }
                                  onChange={inputOnChange}
                                  style={{ paddingRight: '11px' }}
                                />
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="input-group-meta position-relative mb-15">
                                <input
                                  type="number"
                                  className="login-input"
                                  placeholder="End Year"
                                  name="ever_worked_end_year"
                                  value={
                                    formData.other_question.ever_worked_end_year
                                  }
                                  onChange={inputOnChange}
                                  style={{ paddingRight: '11px' }}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="col-10"></div>
                        )}
                      </div>
                      <div className="help-block with-errors">
                        {/* <ErrorMsg msg={errors.expectedSalary?.message!} /> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="position-relative mb-20">
                      <label style={{ fontSize: '14px' }}>
                        Do you have any prior medical conditions, illnesses, or
                        congenital diseases?*
                      </label>
                      <div className="row" style={{ paddingLeft: '11px' }}>
                        <div className="form-check col-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="RadioDisease"
                            id="RadioDiseaseValue1"
                            value="no"
                            checked={disease === 'no'}
                            onChange={diseaseChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RadioDiseaseValue1"
                            style={{ fontSize: '14px' }}
                          >
                            No
                          </label>
                        </div>
                        <div className="col-10"></div>
                        <div className="form-check col-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="RadioDisease"
                            id="RadioDiseaseValue2"
                            value="yes"
                            checked={disease === 'yes'}
                            onChange={diseaseChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RadioDiseaseValue2"
                            style={{ fontSize: '14px' }}
                          >
                            Yes
                          </label>
                        </div>
                        {disease === 'yes' ? (
                          <>
                            <div className="col-5">
                              <div className="input-group-meta position-relative mb-15">
                                <input
                                  type="text"
                                  className="login-input"
                                  placeholder="Medical Condition"
                                  name="disease_name"
                                  value={formData.other_question.disease_name}
                                  onChange={inputOnChange}
                                  style={{ paddingRight: '11px' }}
                                />
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="input-group-meta position-relative mb-15">
                                <input
                                  type="number"
                                  className="login-input"
                                  placeholder="Year"
                                  name="disease_year"
                                  value={formData.other_question.disease_year}
                                  onChange={inputOnChange}
                                  style={{ paddingRight: '11px' }}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="col-10"></div>
                        )}
                      </div>
                      <div className="help-block with-errors">
                        {/* <ErrorMsg msg={errors.expectedSalary?.message!} /> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="position-relative mb-20">
                      <label style={{ fontSize: '14px' }}>
                        Do you have any friends, colleague, relative or family
                        who is working at Erajaya Group Companies?*
                      </label>
                      <div className="row" style={{ paddingLeft: '11px' }}>
                        <div className="form-check col-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="RadioHaveRelation"
                            id="RadioHaveRelationValue1"
                            value="no"
                            checked={haveRelation === 'no'}
                            onChange={haveRelationChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RadioHaveRelationValue1"
                            style={{ fontSize: '14px' }}
                          >
                            No
                          </label>
                        </div>
                        <div className="col-10"></div>
                        <div className="form-check col-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="RadioHaveRelation"
                            id="RadioHaveRelationValue2"
                            value="yes"
                            checked={haveRelation === 'yes'}
                            onChange={haveRelationChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RadioHaveRelationValue2"
                            style={{ fontSize: '14px' }}
                          >
                            Yes
                          </label>
                        </div>
                        {haveRelation === 'yes' ? (
                          <>
                            <div className="col-5">
                              <div className="input-group-meta position-relative mb-15">
                                <input
                                  type="text"
                                  className="login-input"
                                  placeholder="Name"
                                  name="relation_name"
                                  value={formData.other_question.relation_name}
                                  onChange={inputOnChange}
                                  style={{ paddingRight: '11px' }}
                                />
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="input-group-meta position-relative mb-15">
                                <input
                                  type="text"
                                  className="login-input"
                                  placeholder="Position"
                                  name="relation_position"
                                  value={
                                    formData.other_question.relation_position
                                  }
                                  onChange={inputOnChange}
                                  style={{ paddingRight: '11px' }}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="col-10"></div>
                        )}
                      </div>
                      <div className="help-block with-errors">
                        {/* <ErrorMsg msg={errors.expectedSalary?.message!} /> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Password*</label>
                      <input
                        type={`${showPass ? 'text' : 'password'}`}
                        placeholder="Enter Password"
                        className="pass_log_id login-input"
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
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={inputOnChange}
                        autoComplete="off"
                        style={{ paddingRight: '40px' }}
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

export default FormLinkedin;
