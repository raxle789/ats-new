import React, { useState } from 'react';
import Image from 'next/image';
import LoginForm from '../../forms/login-form';
import linkedin from '@/assets/images/icon/linkedin.png';
import uploadIcon from '@/assets/images/icon/icon_11.svg';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ApplyModal = () => {
  const router = useRouter();
  const [isEmployeeChecked, setIsEmployeeChecked] = useState<boolean>(false);
  const [fileCv, setFilCv] = useState<File | null | string>(null);

  const documentOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cv = e.target.files && e.target.files[0];
    setFilCv(cv);
  };

  // const handleSignUpClick = () => {
  //   const modal = document.getElementById('loginModal');
  //   if (modal) {
  //     modal.classList.remove('fade');
  //     modal.setAttribute('aria-hidden', 'true');
  //     modal.style.display = 'none';
  //   }

  //   router.push('/register');
  // };

  useEffect(() => {
    // if (fileCv !== null) {
    //   router.push('/register');
    // }
    if (fileCv !== null) {
      const applyModal = document.getElementById('applyModal');
      if (applyModal) {
        applyModal.classList.remove('fade');
        // applyModal.classList.add('fade-out');

        // Tambahkan delay sebelum mengarahkan ke halaman register
        setTimeout(() => {
          router.push('/register');
        }, 300); // Sesuaikan dengan durasi transisi CSS (0.3s)
      }
    }
  }, [fileCv]);
  return (
    <div
      className="modal fade"
      id="applyModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered vertical-center">
        <div className="container">
          <div className="user-data-form modal-content user-apply-form">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h2 className="login-title">Apply Job</h2>
              {/* <p>
                Still do not have an account?{' '}
                <a id="signUpButton" className="fw-500 sign-up-link">
                  Sign up
                </a>
              </p> */}
            </div>
            <div className="form-wrapper m-auto apply-wrapper">
              <LoginForm checkedEmployee={isEmployeeChecked} />
              <div className="d-flex align-items-center mt-0 mb-10">
                <div className="line"></div>
                <span className="pe-3 ps-3">OR</span>
                <div className="line"></div>
              </div>
              <div className="row mb-15">
                <div className="col-lg-6 col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <Image src={linkedin} alt="linkedin-img" />
                    <span className="ps-2">Apply with LinkedIn</span>
                  </a>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
                    <div className="upload-apply-cv d-flex align-items-center justify-content-center">
                      <button
                        data-bs-dismiss={fileCv ? 'modal' : ''}
                        aria-label={fileCv ? 'Close' : ''}
                      >
                        <input
                          className="upload-photo-btn"
                          type="file"
                          id="apply-CV"
                          name="uploadCV"
                          accept=".pdf"
                          onChange={documentOnChange}
                        />
                      </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
