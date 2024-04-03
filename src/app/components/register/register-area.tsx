'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '../forms/register-form';
import RegisterFormStep1 from '../forms/register-step1';
import RegisterFormStep2 from '../forms/register-step2';
import linkedin from '@/assets/images/icon/linkedin.png';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { setStep } from '@/redux/features/stepSlice';
import ArrowBack from '@/assets/images/icon/arrow-left-solid.svg';
/* libs */
// import { createdLinkedInOAuth } from '@/lib/Authentication';

const RegisterArea = () => {
  const currentStep = useAppSelector((state) => state.step.step);
  const dispatch = useAppDispatch();
  // const [currentStep, setCurrentStep] = useState(1);

  // const handleBackStep = () => {
  //   setCurrentStep(currentStep - 1);
  // };
  // const handleNextStep = () => {
  //   setCurrentStep(currentStep + 1);
  // };
  return (
    <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
      <div className="container">
        <div className="user-data-form">
          <div>
            {/* <Image
              src={ArrowBack}
              alt="arrow-back"
              style={{ width: '30px', height: 'auto', position: 'relative' }}
            /> */}
            <h2 className="text-center">Create Account</h2>
          </div>
          <div className="form-wrapper m-auto">
            <ul
              className={`nav nav-tabs border-0 w-100 mt-30 ${currentStep === 2 || currentStep === 3 ? '' : 'd-none'}`}
              role="tablist"
            >
              <li
                className={`nav-item ${currentStep === 2 ? 'active step-1' : ''}`}
                role="presentation"
              >
                <button
                  className="nav-link"
                  aria-selected={currentStep === 2}
                  onClick={() => dispatch(setStep({ newStep: 2 }))}
                  // data-bs-toggle="tab"
                  // data-bs-target="#fc1"
                  role="tab"
                  tabIndex={-1}
                >
                  Step 1
                </button>
              </li>
              <li
                className={`nav-item ${currentStep === 3 ? 'active step-2' : ''}`}
                role="presentation"
              >
                <button
                  className="nav-link"
                  aria-selected={currentStep === 3}
                  onClick={() => dispatch(setStep({ newStep: 3 }))}
                  // data-bs-toggle="tab"
                  // data-bs-target="#fc2"
                  role="tab"
                  tabIndex={-1}
                >
                  Step 2
                </button>
              </li>
            </ul>
            <div className="tab-content mt-40">
              <div
                className={`tab-pane fade ${currentStep === 1 ? 'show active' : ''}`}
                role="tabpanel"
              >
                <RegisterForm />
                <div className="d-flex align-items-center mt-20 mb-10">
                  <div className="line"></div>
                  <span className="pe-3 ps-3">OR</span>
                  <div className="line"></div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    {/* linkedin here */}
                    <Link
                      href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86spngwvycqa3c&redirect_uri=http://localhost:3000/api/authorization&state=wearetaeb&scope=openid%20profile%20email"
                      className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                    >
                      <Image src={linkedin} alt="linkedin-img" />
                      <span className="ps-2">Signup with LinkedIn</span>
                    </Link>
                  </div>
                  <div className="col-sm-6">
                    <div className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
                      <div className="upload-apply-cv d-flex align-items-center justify-content-center">
                        <input
                          className="upload-photo-btn"
                          type="file"
                          id="apply-CV"
                          name="uploadCV"
                          accept=".pdf"
                        />
                        <label htmlFor="apply-CV" className="">
                          <Image
                            src={uploadIcon}
                            alt="upload-icon"
                            className="upload-img"
                          />
                          <span className="fw-500 ms-2 text-dark upload-label label-cv-apply">
                            Register with CV
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${currentStep === 2 ? 'show active' : ''}`}
                role="tabpanel"
              >
                <RegisterFormStep1 />
              </div>
              <div
                className={`tab-pane fade ${currentStep === 3 ? 'show active' : ''}`}
                role="tabpanel"
              >
                <RegisterFormStep2 />
              </div>
            </div>

            <p className="text-center mt-10">
              Have an account?{' '}
              <Link href="/auth/login" className="fw-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterArea;
