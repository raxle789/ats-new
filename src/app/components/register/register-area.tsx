'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '../forms/register-form';
import RegisterFormNext from '../forms/register-form-next';
// import google from "@/assets/images/icon/google.png";
// import facebook from "@/assets/images/icon/facebook.png";
import linkedin from '@/assets/images/icon/linkedin.png';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { setStep } from '@/redux/features/stepSlice';

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
          <div className="text-center">
            <h2>Create Account</h2>
          </div>
          <div className="form-wrapper m-auto">
            <ul className="nav nav-tabs border-0 w-100 mt-30" role="tablist">
              {/* <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#fc1"
                  role="tab"
                  aria-selected="true"
                  tabIndex={-1}
                >
                  Candidates
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#fc2"
                  role="tab"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  Employer
                </button>
              </li> */}
              <li
                className={`nav-item ${currentStep === 1 ? 'active step-1' : ''}`}
                role="presentation"
              >
                <button
                  className="nav-link"
                  aria-selected={currentStep === 1}
                  onClick={() => dispatch(setStep({ newStep: 1 }))}
                  // data-bs-toggle="tab"
                  // data-bs-target="#fc1"
                  role="tab"
                  tabIndex={-1}
                >
                  Step 1
                </button>
              </li>
              <li
                className={`nav-item ${currentStep === 2 ? 'active step-2' : ''}`}
                role="presentation"
              >
                <button
                  className="nav-link"
                  aria-selected={currentStep === 2}
                  onClick={() => dispatch(setStep({ newStep: 2 }))}
                  // data-bs-toggle="tab"
                  // data-bs-target="#fc2"
                  role="tab"
                  tabIndex={-1}
                >
                  Step 2
                </button>
              </li>
            </ul>
            {/* <div className="tab-content mt-40">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
                id="fc1"
              >
                <RegisterForm />
              </div>
              <div className="tab-pane fade" role="tabpanel" id="fc2">
                <RegisterForm />
              </div>
            </div> */}
            <div className="tab-content mt-40">
              <div
                className={`tab-pane fade ${currentStep === 1 ? 'show active' : ''}`}
                role="tabpanel"
              >
                <RegisterForm />
              </div>
              <div
                className={`tab-pane fade ${currentStep === 2 ? 'show active' : ''}`}
                role="tabpanel"
              >
                <RegisterFormNext />
              </div>
            </div>

            {/* {currentStep === 1 && (
              <div className="col-12">
                <button
                  type="submit"
                  className="btn-eleven fw-500 tran3s d-block mt-20"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="d-flex flex-row row">
                <div className="col-5 col-sm-6">
                  <button
                    type="submit"
                    className="btn-eleven fw-500 tran3s mt-20"
                    onClick={handleBackStep}
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
            )} */}

            <div className="d-flex align-items-center mt-30 mb-10">
              <div className="line"></div>
              <span className="pe-3 ps-3">OR</span>
              <div className="line"></div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <a
                  href="#"
                  className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                >
                  <Image src={linkedin} alt="linkedin-img" />
                  <span className="ps-2">Signup with LinkedIn</span>
                </a>
              </div>
              {/* <div className="col-sm-6">
                <a
                  href="#"
                  className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                >
                  <Image src={facebook} alt="facebook-img" />
                  <span className="ps-2">Signup with Facebook</span>
                </a>
              </div> */}
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
