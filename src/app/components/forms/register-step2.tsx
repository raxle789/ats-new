'use client';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
// import * as Yup from 'yup';
import { Resolver, useForm } from 'react-hook-form';
import ErrorMsg from '../common/error-msg';
import icon from '@/assets/images/icon/icon_60.svg';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
import { useAppDispatch } from '@/redux/hook';
import { setStep } from '@/redux/features/stepSlice';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { createEducation_Experience } from '@/libs/Registration';
import { string } from 'zod';
import { fileToBase64 } from '@/libs/Registration/utils';
import { useRouter } from 'next/navigation';

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

type FormData = {
    education: {
      level: string;
      major: string;
      university_name: string;
      start_year: string;
      end_year: string;
      gpa: string;
    },
    experience: {
      company_name: string;
      job_function: string;
      job_title: string,
      job_level: string;
      line_industry: string;
      start_at: string;
      end_at: string;
      salary: string;
    }
  }

const RegisterFormStep2 = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [hasExperience, setHasExperience] = useState('no');
  const hasExperienceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasExperience(e.target.value);
  };

  const [formData, setFormData] = useState<FormData>({
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
      salary: ''
    }
  });

  const [agreement, setAgreement] = useState<boolean>(false);
  console.log(agreement);

  const agreementOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checked', e.target.checked);
    setAgreement(e.target.checked);
  };

  const [document, setDocument] = useState<File | null | string>(null);
  if(document !== null) {
    const { name, size, type } = document as File;
    console.info('name: ', name);
    console.info('name: ', size);
    console.info('name: ', type);
  }
  const documentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cv = e.target.files && e.target.files[0];
    setDocument(cv);
  }

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name in formData.education) {
      setFormData((prevState) => ({
        ...prevState,
        education: {
          ...prevState.education,
          [name]: value
        }
      }));
      return;
    }else if(name in formData.experience) {
      setFormData((prevState) => ({
        ...prevState,
        experience: {
          ...prevState.experience,
          [name]: value
        }
      }));
      return;
    }
  };

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(name in formData.education) {
      setFormData((prevState) => ({
        ...prevState,
        education: {
          ...prevState.education,
          [name]: value
        }
      }));
      return;
    }else if(name in formData?.experience) {
      setFormData((prevState) => ({
        ...prevState,
        experience: {
          ...prevState.experience,
          [name]: value
        }
      }));
      return;
    };
  };

  const formOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('form data', formData);
    console.log('document', document);
    console.log('agreement', agreement);

    /* destructure */
    const { name, size, type } = document as File;
    const stringBase64 = await fileToBase64(document as File);
    const userDocument = {
      name: name,
      size: size,
      type: type,
      file_base: stringBase64
    }

    /* call server-side function */
    const send = await createEducation_Experience(formData, userDocument, agreement);
    console.info(send);
    if(!send.success) {
      return console.error(send.message);
    }

    router.push('/main/job');
  }

  return (
    <form
      onSubmit={formOnSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Last Education Level*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name='level'
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
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Major*</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name='major'
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
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>University/School*</label>
            <input
              type="text"
              placeholder="Universitas..."
              name="university_name"
              value={formData.education.university_name}
              onChange={inputOnChange}
            />
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>Start Year*</label>
            <input
              type="number"
              placeholder="2020"
              name="start_year"
              value={formData.education.start_year}
              onChange={inputOnChange}
            />
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>End Year*</label>
            <input
              type="number"
              placeholder="2024"
              name="end_year"
              value={formData.education.end_year}
              onChange={inputOnChange}
            />
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
            <label>GPA*</label>
            <input
              type="text"
              name="gpa"
              value={formData.education.gpa}
              onChange={inputOnChange}
            />
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="position-relative mb-25">
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
              >
                Experience
              </label>
            </div>
          </div>
        </div>
        {hasExperience === 'yes' &&
        <>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-25">
                <label>Company Name - Last*</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="company_name"
                  value={formData.experience.company_name}
                  onChange={inputOnChange}
                />
                <div className="help-block with-errors">
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Job Function*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name='job_function'
                  value={formData.experience.job_function}
                  onChange={selectOnChange}
                >
                  <option value="choose-job-function">Please choose</option>
                  {jobFunction.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="help-block with-errors">
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Job Title*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name='job_title'
                  value={formData.experience.job_title}
                  onChange={selectOnChange}
                >
                  <option value="choose-job-title">Please choose</option>
                  {jobTitle.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="help-block with-errors">
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Line Industry*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name='line_industry'
                  value={formData.experience.line_industry}
                  onChange={selectOnChange}
                >
                  <option value="choose-line-industry">Please choose</option>
                  {lineIndustry.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="help-block with-errors">
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-25">
                <label>Level*</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name='job_level'
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
                <div className="help-block with-errors">
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
                    name="start_at"
                    value={formData.experience.start_at}
                    onChange={inputOnChange}
                  />
                </div>
                <div className="help-block with-errors">
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
                    name="end_at"
                    value={formData.experience.end_at}
                    onChange={inputOnChange}
                  />
                </div>
                <div className="help-block with-errors">
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-20">
                <label>Salary (Gross / Month)*</label>
                <input
                  type="text"
                  placeholder="Enter Expected Salary"
                  className="pass_log_id"
                  name="salary"
                  value={formData.experience.salary}
                  onChange={inputOnChange}
                />
                <div className="help-block with-errors">
                </div>
              </div>
            </div>
          </>
        }
        <div className="col-6">
          <div className="input-group-meta position-relative mb-25">
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
            <div className="help-block with-errors">
            </div>
          </div>
        </div>
        <div className="col-12">
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
        <div className="col-5 col-sm-6">
          <button
            className="btn-eleven fw-500 tran3s mt-20"
            onClick={() => dispatch(setRegisterStep('second'))}
            // onClick={() => dispatch(setStep({ newStep: 2 }))}
          >
            Back
          </button>
        </div>
        <div className="col-5 col-sm-6">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s mt-20"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterFormStep2;
