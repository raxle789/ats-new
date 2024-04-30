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
// import { createEducation_Experience } from '@/libs/Registration';
import { string } from 'zod';
import { fileToBase64 } from '@/libs/Registration/utils';
import { useRouter } from 'next/navigation';

const lastEducation: string[] = ['SMA/SMK', 'D1', 'S1/Sarjana'];
const major: string[] = [
  'Accounting',
  'Accounting Information',
  'Acturial Science',
];
const noticePeriodValue: string[] = [
  'Ready join now',
  'Less than 1 month',
  '1 month',
  '2 months',
  '3 months',
  'More than 3 months',
];

type FormData = {
  education: {
    level: string;
    major: string;
    university_name: string;
    start_year: string;
    end_year: string;
    gpa: string;
  };
  other_question: {
    noticePeriod: string;
    ever_worked_start_year: string;
    ever_worked_end_year: string;
    disease_name: string;
    disease_year: string;
    relation_name: string;
    relation_position: string;
  };
  // experience: {
  //   company_name: string;
  //   job_function: string;
  //   job_title: string;
  //   job_level: string;
  //   line_industry: string;
  //   start_at: string;
  //   end_at: string;
  //   salary: string;
  // };
};

const RegisterFormStep2 = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // const [noticePeriod, setNoticePeriod] = useState<string>('you-choose');
  // const noticePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNoticePeriod(e.target.value);
  // };

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

  const [formData, setFormData] = useState<FormData>({
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
    // experience: {
    //   company_name: '',
    //   job_function: '',
    //   job_title: '',
    //   job_level: '',
    //   line_industry: '',
    //   start_at: '',
    //   end_at: '',
    //   salary: '',
    // },
  });

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
    }
    // else if (name in formData.experience) {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     experience: {
    //       ...prevState.experience,
    //       [name]: value,
    //     },
    //   }));
    //   return;
    // }
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
    }
    // else if (name in formData?.experience) {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     experience: {
    //       ...prevState.experience,
    //       [name]: value,
    //     },
    //   }));
    //   return;
    // }
  };

  const formOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('form data', formData);
    console.log('document', document);
    console.log('agreement', agreement);

    let formattedValue: string = formData.education.university_name;
    // Format value to capitalize first letter of each word
    formattedValue = formattedValue.replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );
    // tolong tur nama universitasnya pake yg ini ya, soalnya udh keformat

    /* destructure */
    const { name, size, type } = document as File;
    const stringBase64 = await fileToBase64(document as File);
    const userDocument = {
      name: name,
      size: size,
      type: type,
      file_base: stringBase64,
    };

    /* call server-side function */
    // const send = await createEducation_Experience(
    //   formData,
    //   userDocument,
    //   agreement,
    // );
    // console.info(send);
    // if (!send.success) {
    //   return console.error(send.message);
    // }

    router.push('/');
  };

  return (
    <form onSubmit={formOnSubmit}>
      <div className="row mb-20">
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
              <option value="choose-notice-period">Please choose</option>
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
                        value={formData.other_question.ever_worked_start_year}
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
                        value={formData.other_question.ever_worked_end_year}
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
              Do you have any prior medical conditions, illnesses, or congenital
              diseases?*
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
              Do you have any friends, colleague, relative or family who is
              working at Erajaya Group Companies?*
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
                        value={formData.other_question.relation_position}
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
            className="btn-eleven btn-login btn-back fw-500 tran3s mt-20"
            onClick={() => dispatch(setRegisterStep('second'))}
          >
            Back
          </button>
        </div>
        <div className="col-5 col-sm-6">
          <button
            type="submit"
            className="btn-eleven btn-login btn-next fw-500 tran3s mt-20"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterFormStep2;
