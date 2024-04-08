'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import LoginForm from '../../forms/login-form';
import linkedin from '@/assets/images/icon/linkedin.png';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginModal = () => {
  const router = useRouter();
  const [isEmployeeChecked, setIsEmployeeChecked] = useState<boolean>(false);

  const handleEmployeeCheckboxChange = (event: any) => {
    setIsEmployeeChecked(event.target.checked);
  };

  useEffect(() => {
    const handleSignUpClick = () => {
      // Navigasi ke halaman pendaftaran
      router.push('/register');
    };
    // console.log('nilai check: ', isEmployeeChecked);

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
  }, [router, isEmployeeChecked]);
  return (
    <div
      id="loginModal"
      className="modal fade"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered vertical-center">
        <div className="container">
          <div className="user-data-form modal-content login-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h2 className="login-title">Hi, Welcome Back!</h2>
              {/* <p>
                Still do not have an account?{' '}
                <a
                  id="signUpButton"
                  className="fw-500 sign-up-link"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Sign up
                </a>
              </p> */}
              <div className="agreement-checkbox">
                <input
                  type="checkbox"
                  id="login-employee"
                  checked={isEmployeeChecked}
                  onChange={handleEmployeeCheckboxChange}
                />
                <label htmlFor="login-employee">Login as Employee</label>
              </div>
            </div>
            <div className="form-wrapper m-auto mt-5 login-pop-up">
              <LoginForm checkedEmployee={isEmployeeChecked} />
              {/* <div className="d-flex align-items-center mt-0 mb-10">
                <div className="line"></div>
                <span className="pe-3 ps-3">OR</span>
                <div className="line"></div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <Image src={linkedin} alt="linkedin-img" />
                    <span className="ps-2">Login with LinkedIn</span>
                  </a>
                </div>
              </div> */}
              {/* <p className="text-center mt-10">
                Do not have an account?{' '}
                <a
                  id="signUpButton2"
                  className="fw-500 sign-up-link"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Sign up
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
