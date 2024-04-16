'use client';

import { createCandidates } from '@/libs/Registration';
import { userRegister2 } from '@/libs/validations/Register';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppDispatch } from '@/redux/hook';
import { useState } from 'react';

const source: string[] = ['Email', 'Erajaya Career Fest', 'Instagram'];
const jobFunction: string[] = ['Accounting', 'Business', 'Client'];
const jobTitle: string[] = [
  'Internship Announce Radio',
  'Internship Administration',
  'Internship Application Developer',
];
const lineIndustry: string[] = ['Agribusiness', 'Apparel', 'Automotive'];
const level: string[] = ['Director', 'VP', 'General Manager'];

type FormData = {
  gender: string;
  phone_number: number;
  date_of_birth: string;
  source_referer: string;
  current_salary: number;
  linkedin_profile_url: string;
  experience: {
    company_name: string;
    job_function: string;
    job_title: string;
    job_level: string;
    line_industry: string;
    start_at: string;
    end_at: string;
    salary: string;
  };
};

const RegisterFormStep1 = () => {
  const dispatch = useAppDispatch();

  const [hasExperience, setHasExperience] = useState<string>('you-choose');
  const hasExperienceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasExperience(e.target.value);
  };

  const [formData, setFormData] = useState<FormData>({
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
  });

  const [hasLinkedIn, setHasLinkedIn] = useState<string>('you-choose');
  const linkedInRadiosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasLinkedIn(e.target.value);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.experience) {
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
    if (name in formData?.experience) {
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
      <div className="row mb-20">
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
        {/* <div className="col-12">
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
        </div> */}
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
            <label style={{ fontSize: '14px' }}>Work Experience*</label>
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
                  <option value="choose-job-function">Please choose</option>
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
                  <option value="choose-job-title">Please choose</option>
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
                  <option value="choose-line-industry">Please choose</option>
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

        <div className="col-5 col-sm-6">
          <button
            className="btn-eleven fw-500 tran3s mt-10 btn-login btn-back"
            onClick={(e) => {
              e.preventDefault;
              dispatch(setRegisterStep(''));
            }}
          >
            Back
          </button>
        </div>
        <div className="col-5 col-sm-6">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s mt-10 btn-login btn-next"
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
