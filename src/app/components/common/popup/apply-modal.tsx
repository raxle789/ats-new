import React from 'react';
import Image from 'next/image';
import LoginForm from '../../forms/login-form';
import linkedin from '@/assets/images/icon/linkedin.png';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ApplyModal = () => {
  const router = useRouter();

  const handleSignUpClick = () => {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.remove('fade');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    }

    router.push('/register');
  };

  useEffect(() => {
    // Menambahkan event listener ke tombol sign up
    const signUpButton = document.getElementById('signUpButton');
    const signUpButton2 = document.getElementById('signUpButton2');
    if (signUpButton && signUpButton2) {
      signUpButton.addEventListener('click', handleSignUpClick);
      signUpButton2.addEventListener('click', handleSignUpClick);
    }

    // Membersihkan event listener saat komponen unmount
    // return () => ({
    //   if (signUpButton && signUpButton2) {
    //     signUpButton.removeEventListener('click', handleSignUpClick);
    //     signUpButton2.removeEventListener('click', handleSignUpClick);
    //   }
    // });
  }, [router]);
  return (
    <div
      className="modal fade"
      id="applyModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h2>Hi, Welcome Back!</h2>
              <p>
                Still do not have an account?{' '}
                <a id="signUpButton" className="fw-500 sign-up-link">
                  Sign up
                </a>
              </p>
            </div>
            <div className="form-wrapper m-auto">
              <LoginForm />
              <div className="d-flex align-items-center mt-30 mb-10">
                <div className="line"></div>
                <span className="pe-3 ps-3">OR</span>
                <div className="line"></div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <Image src={linkedin} alt="linkedin-img" />
                    <span className="ps-2">Login with LinkedIn</span>
                  </a>
                </div>
                <div className="col-lg-6 col-md-6">
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
                          Apply with CV
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-6 col-md-6">
                  <div className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
                    <input
                      className="upload-photo-btn"
                      type="file"
                      id="upload-CV"
                      name="uploadCV"
                      accept=".pdf"
                    />
                    <label htmlFor="photo-input" className="">
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
                </div> */}
              </div>
              <p className="text-center mt-10">
                Do not have an account?{' '}
                <a id="signUpButton2" className="fw-500 sign-up-link">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
