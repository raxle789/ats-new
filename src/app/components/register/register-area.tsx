'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '../forms/register-form';
import linkedin from '@/assets/images/icon/linkedin.png';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
/* libs */
// import { createdLinkedInOAuth } from '@/lib/Authentication';

const RegisterArea = () => {
  return (
    <section className="registration-section position-relative pt-75 lg-pt-80 pb-75 lg-pb-80">
      <div className="container">
        <div className="user-data-form user-register-form">
          <div>
            <h2 className="text-center login-title mb-0">Create Account</h2>
          </div>
          <div className="form-wrapper m-auto register-wrapper">
            <div className="tab-content mt-25">
              <div className={`tab-pane fade show active`} role="tabpanel">
                {/* First Form */}
                <RegisterForm />
                <div className="d-flex align-items-center mt-10 mb-5">
                  <div className="line"></div>
                  <span className="pe-3 ps-3">OR</span>
                  <div className="line"></div>
                </div>
                <div className="row mb-15">
                  <div className="col-sm-6">
                    {/* linkedin here */}
                    <Link
                      href={process.env.NEXT_PUBLIC_LIKEDIN_AUTHORIZATION_REQUEST_URL as string}
                      className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                    >
                      <Image src={linkedin} alt="linkedin-img" />
                      <span className="ps-2">Register with LinkedIn</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterArea;
