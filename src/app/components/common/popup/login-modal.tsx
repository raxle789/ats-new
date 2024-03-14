import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../../forms/login-form';
// import google from "@/assets/images/icon/google.png";
// import google from '../../../../../public/assets/images/icon/google.png';
// import facebook from '../../../../../public/assets/images/icon/facebook.png';
import linkedin from '@/assets/images/icon/linkedin.png';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginModal = () => {
  const router = useRouter();

  const handleSignUpClick = () => {
    // Tutup modal sebelum navigasi
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.remove('fade');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    }

    // Navigasi ke halaman pendaftaran
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
  // const closeModal = () => {
  //   const modal = document.getElementById('loginModal');
  //   if (modal) {
  //     const bootstrapModal = new bootstrap.Modal(modal);
  //     bootstrapModal.hide();
  //   }
  // };
  return (
    <div
      className="modal fade"
      id="loginModal"
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
                <a id="signUpButton" className="fw-500">
                  Sign up
                </a>
                {/* <Link href="/auth/register">Sign up</Link> */}
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
                <div className="col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <Image src={linkedin} alt="linkedin-img" />
                    <span className="ps-2">Login with LinkedIn</span>
                  </a>
                </div>
                {/* <div className="col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <Image src={facebook} alt="facebook-img" />
                    <span className="ps-2">Login with Facebook</span>
                  </a>
                </div> */}
              </div>
              <p className="text-center mt-10">
                Do not have an account?{' '}
                <a id="signUpButton2" className="fw-500">
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

export default LoginModal;
