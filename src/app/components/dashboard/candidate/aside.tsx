'use client';
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
// import logo from '@/assets/dashboard/images/logo_01.png';
import avatar from '@/assets/dashboard/images/avatar_01.jpg';
import profile_icon_1 from '@/assets/dashboard/images/icon/icon_23.svg';
import profile_icon_2 from '@/assets/dashboard/images/icon/icon_24.svg';
import profile_icon_3 from '@/assets/dashboard/images/icon/icon_25.svg';
import logout from '@/assets/dashboard/images/icon/icon_9.svg';
import nav_1 from '@/assets/dashboard/images/icon/icon_1.svg';
import nav_1_active from '@/assets/dashboard/images/icon/icon_1_active.svg';
import nav_2 from '@/assets/dashboard/images/icon/icon_2.svg';
import nav_2_active from '@/assets/dashboard/images/icon/icon_2_active.svg';
import nav_3 from '@/assets/dashboard/images/icon/icon_3.svg';
import nav_3_active from '@/assets/dashboard/images/icon/icon_3_active.svg';
import nav_4 from '@/assets/dashboard/images/icon/icon_4.svg';
import nav_4_active from '@/assets/dashboard/images/icon/icon_4_active.svg';
// import nav_5 from '@/assets/dashboard/images/icon/icon_5.svg';
// import nav_5_active from '@/assets/dashboard/images/icon/icon_5_active.svg';
// import nav_6 from '@/assets/dashboard/images/icon/icon_6.svg';
// import nav_6_active from '@/assets/dashboard/images/icon/icon_6_active.svg';
// import nav_7 from '@/assets/dashboard/images/icon/icon_7.svg';
// import nav_7_active from '@/assets/dashboard/images/icon/icon_7_active.svg';
// import nav_8 from '@/assets/dashboard/images/icon/icon_8.svg';
import LogoutModal from '../../common/popup/logout-modal';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setIsOpen } from '@/redux/features/sidebarSlice';
import logo2 from '@/assets/images/logo/erajaya_logo4.jpg';
import { useAppSessionContext } from '@/libs/Sessions/AppSession';
import {
  authSession,
  linkedinSession,
  regSession,
} from '@/libs/Sessions/utils';
import { DecryptSession } from '@/libs/Sessions/jwt';

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: '/dashboard/user',
    title: 'Dashboard',
  },
  {
    id: 2,
    icon: nav_2,
    icon_active: nav_2_active,
    link: '/dashboard/user/profile',
    title: 'My Profile',
  },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: '/dashboard/user/stages',
    title: 'Stages',
  },
  {
    id: 4,
    icon: nav_4,
    icon_active: nav_4_active,
    link: '/dashboard/user/applied-jobs',
    title: 'Applied Jobs',
  },
  // {
  //   id: 5,
  //   icon: nav_5,
  //   icon_active: nav_5_active,
  //   link: '/dashboard/candidate-dashboard/job-alert',
  //   title: 'Job Alert',
  // },
  // {
  //   id: 6,
  //   icon: nav_6,
  //   icon_active: nav_6_active,
  //   link: '/dashboard/candidate-dashboard/saved-job',
  //   title: 'Saved Job',
  // },
  // {
  //   id: 7,
  //   icon: nav_7,
  //   icon_active: nav_7_active,
  //   link: '/dashboard/user/ss',
  //   title: 'Account Settings',
  // },
];

export type TypeSessionValue = {
  regSession: any;
  authSession: any;
  linkedinSession: any;
};

const CandidateAside = () => {
  /**
   * Session Context
   */
  const session = useAppSessionContext();
  const authSessionPayload = DecryptSession(session[`${authSession}`]);
  console.info('auth payload \t:', authSessionPayload);
  /* END SESSION */

  const pathname = usePathname();
  const isOpenSidebar = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 450) {
      dispatch(setIsOpen(false));
    }
  };
  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? 'show' : ''}`}>
        <div className="position-relative">
          <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
            <Link href="/dashboard/candidate-dashboard">
              <Image
                src={logo2}
                alt="logo"
                priority
                style={{ height: '80px', width: 'auto' }}
              />
            </Link>
            <button
              onClick={() => dispatch(setIsOpen(false))}
              className="close-btn d-block d-md-none"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="user-data">
            <div className="user-avatar online position-relative rounded-circle">
              <Image
                src={avatar}
                alt="avatar"
                className="lazy-img"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="user-name-data">
              <p className="user-name">
                {authSessionPayload?.user?.name ?? 'unknown'}
              </p>
            </div>
          </div>
          <nav className="dasboard-main-nav">
            <ul className="style-none">
              {nav_data.map((m) => {
                // const isActive = pathname === m.link;
                let isActive = false;
                if (m.id === 2) {
                  isActive =
                    pathname === m.link ||
                    pathname === '/dashboard/user/profile/document' ||
                    pathname === '/dashboard/user/profile/personal-data' ||
                    pathname ===
                      '/dashboard/user/profile/background-experience';
                } else {
                  isActive = pathname === m.link;
                }
                return (
                  <li key={m.id} onClick={handleClick}>
                    <Link
                      href={m.link}
                      className={`d-flex w-100 align-items-center ${isActive ? 'active' : ''}`}
                    >
                      <Image
                        src={isActive ? m.icon_active : m.icon}
                        alt="icon"
                        className="lazy-img"
                      />
                      <span>{m.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                {/* <a
                  href="#"
                  className="d-flex w-100 align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <Image src={nav_8} alt="icon" className="lazy-img" />
                  <span>Delete Account</span>
                </a> */}
                <Link href="#" className="d-flex w-100 align-items-center">
                  <Image src={logout} alt="icon" className="lazy-img" />
                  <span style={{ color: '#ff2730' }}>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* <div className="profile-complete-status">
            <div className="progress-value fw-500">87%</div>
            <div className="progress-line position-relative">
              <div className="inner-line" style={{ width: '80%' }}></div>
            </div>
            <p>Profile Complete</p>
          </div>

          <a href="#" className="d-flex w-100 align-items-center logout-btn">
            <Image src={logout} alt="icon" className="lazy-img" />
            <span>Logout</span>
          </a> */}
        </div>
      </aside>
      {/* LogoutModal star */}
      <LogoutModal />
      {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;
