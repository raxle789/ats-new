'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import logo from '@/assets/images/logo/logo_06.png';
// import dark_logo from '@/assets/images/logo/logo_04.png';
import Menus from './component/menus';
import useSticky from '@/hooks/use-sticky';
import LoginModal from '@/app/components/common/popup/login-modal';
import { useAppSessionContext } from '@/libs/Sessions/AppSession';
// import { setAuthState } from '@/redux/features/authorizingSlice';
// import { useAppSelector, useAppDispatch } from '@/redux/hook';
import logo_era_putih from '@/assets/images/home/logo_era_putih.png';
import logo_era_career from '@/assets/images/home/logo_era_career.png';
import { authSession } from '@/libs/Sessions/utils';
import { userLoggedOut } from '@/libs/Login';
import { Spin } from 'antd';
/* server components */
// import { getSession } from '@/lib/Authentication';

const HeaderSix = ({ dark_style = false }: { dark_style?: boolean }) => {
  const { sticky } = useSticky();
  /**
   * Session Context
   */
  const session = useAppSessionContext();
  const authSessionValue = session[`${authSession}`];
  const [scrollDistance, setScrollDistance] = useState<number>(0);
  const [spinning, setSpinning] = useState(false);

  const handleLogout = async () => {
    setSpinning(true);
    await userLoggedOut();
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollDistance(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`theme-main-menu menu-overlay ${dark_style ? '' : 'menu-style-two'} sticky-menu ${sticky ? 'fixed' : ''}`}
      >
        {/* {("auth" in session) ? (<span className="">LoggedIn</span>) : (<span className="">Not LoggedIn</span>)} */}
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image
                    src={
                      scrollDistance > 100 ? logo_era_career : logo_era_putih
                    }
                    className={scrollDistance > 100 ? 'logo_era_career' : ''}
                    alt="logo"
                    priority
                  />
                </Link>
              </div>
              <div className="right-widget ms-auto ms-lg-0 order-lg-2">
                <ul className="d-flex align-items-center style-none">
                  {authSessionValue !== undefined ? (
                    <li>
                      <Link
                        href="/"
                        className="btn-five w-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <a
                          href="#"
                          className={`fw-500 login-btn-three ${dark_style ? 'dark-style' : ''} ${scrollDistance > 100 ? 'btn-when-scroll' : ''} tran3s`}
                          data-bs-toggle="modal"
                          data-bs-target="#loginModal"
                        >
                          Login
                        </a>
                      </li>
                      <li className="d-none d-md-block ms-3">
                        <Link
                          href="/register"
                          className="btn-five"
                          prefetch={true}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <nav className="navbar navbar-expand-lg p0 ms-3 ms-lg-5 order-lg-1">
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="d-block d-lg-none">
                      <div className="logo">
                        <Link href="/" className="d-block">
                          <Image
                            src={dark_style ? logo_era_career : logo_era_putih}
                            alt="logo"
                            priority
                            width="100"
                          />
                        </Link>
                      </div>
                    </li>
                    {/* menus start */}
                    <Menus />
                    {/* menus end */}
                    {authSessionValue !== undefined && (
                      <li className="d-md-none mt-5">
                        <Link
                          href="#"
                          className="btn-five w-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    )}
                    <li className="d-md-none mt-5">
                      <Link
                        href="/register"
                        className="btn-five w-100"
                        prefetch={true}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* loading component */}
      <Spin spinning={spinning} fullscreen />

      {/* login modal start */}
      <LoginModal setSpinning={setSpinning} />
      {/* login modal end */}
    </>
  );
};

export default HeaderSix;
