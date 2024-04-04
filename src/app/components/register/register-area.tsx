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
import ArrowBack from '@/assets/images/icon/arrow-left-solid.svg';
/* libs */
// import { createdLinkedInOAuth } from '@/lib/Authentication';

const RegisterArea = () => {
  const registerStep = useAppSelector((state) => state.UserRegisterStep.next);
  return (
    <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
      <div className="container">
        <div className="user-data-form">
          <div>
            <h2 className="text-center">Create Account</h2>
          </div>
          <div className="form-wrapper m-auto">
            <ul
              className={`nav nav-tabs border-0 w-100 mt-30`}
              role="tablist">
                {/* step check */}
              {registerStep === 'second' ? (
                <li
                className={`nav-item active step-1`}
                role="presentation">
                <button
                  className="nav-link"
                  // aria-selected={currentStep === 2}
                  // onClick={() => dispatch(setStep({ newStep: 2 }))}
                  role="tab"
                  tabIndex={-1}>
                  Step 1
                </button>
              </li>
              ) : ('')}
              {/* step check */}
              {registerStep === 'third' ? (
                <li
                className={`nav-item active step-2`}
                role="presentation">
                <button
                  className="nav-link"
                  // aria-selected={currentStep === 3}
                  // onClick={() => dispatch(setStep({ newStep: 3 }))}
                  role="tab"
                  tabIndex={-1}>
                  Step 2
                </button>
              </li>
              ) : ('')}
            </ul>
            <div className="tab-content mt-40">
              {/* step check */}
              {registerStep === '' ? (
                <div
                className={`tab-pane fade show active`}
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
              ) : (
                ''
              ) }
              {/* step check */}
              {registerStep === 'second' ? (
                <div
                className={`tab-pane fade show active`}
                role="tabpanel"
              >
                <RegisterFormStep1 />
              </div>
              ) : ('')}
              {/* step check */}
              {registerStep === 'third' ? (
                <div
                className={`tab-pane fade show active`}
                role="tabpanel"
              >
                <RegisterFormStep2 />
              </div>
              ) : ('')}
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
