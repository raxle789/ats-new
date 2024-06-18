'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import logo from '@/assets/dashboard/images/logo_01.png';
import avatar from '@/assets/dashboard/images/avatar_03.jpg';
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
import nav_5 from '@/assets/dashboard/images/icon/icon_39.svg';
import nav_5_active from '@/assets/dashboard/images/icon/icon_39_active.svg';
import nav_6 from '@/assets/dashboard/images/icon/icon_6.svg';
import nav_6_active from '@/assets/dashboard/images/icon/icon_6_active.svg';
import nav_7 from '@/assets/dashboard/images/icon/icon_7.svg';
import nav_7_active from '@/assets/dashboard/images/icon/icon_7_active.svg';
import nav_9 from '@/assets/dashboard/images/icon/icon_40.svg';
import nav_9_active from '@/assets/dashboard/images/icon/icon_40_active.svg';
import nav_8 from '@/assets/dashboard/images/icon/icon_8.svg';
import LogoutModal from '../../common/popup/logout-modal';
import logo2 from '@/assets/images/logo/erajaya_logo4.jpg';

// import { ExpendableButton } from './expendable-button';
import { ExpendableButtonAside } from './expendable-button-aside';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import { setIsOpen } from '@/redux/features/sidebarSlice';
import { useAppSessionContext } from '@/libs/Sessions/AppSession';
import { DecryptSession } from '@/libs/Sessions/jwt';
import { authSession } from '@/libs/Sessions/utils';

type subLink = {
  link: string;
  title: string;
};

// nav data
const nav_data: {
  id: number;
  icon: any;
  icon_active: any;
  link: string;
  subLink?: subLink[];
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: '/dashboard/ta',
    title: 'Dashboard',
  },
  // {
  //   id: 2,
  //   icon: nav_2,
  //   icon_active: nav_2_active,
  //   link: '/dashboard/employ-dashboard/profile',
  //   title: 'My Profile',
  // },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: '/dashboard/ta/jobs',
    title: 'Job Vacancies',
  },
  // {
  //   id: 4,
  //   icon: nav_4,
  //   icon_active: nav_4_active,
  //   link: '/dashboard/employ-dashboard/messages',
  //   title: 'Messages',
  // },
  // {
  //   id: 5,
  //   icon: nav_5,
  //   icon_active: nav_5_active,
  //   link: '/dashboard/ta/submit-job',
  //   // subLink: [],
  //   title: 'Submit Job',
  // },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: '/dashboard/ta/candidates',
    subLink: [
      { link: '/dashboard/ta/candidates/blacklisted', title: 'Blacklisted' },
    ],
    title: 'Candidates',
  },
  {
    id: 7,
    icon: nav_9,
    icon_active: nav_9_active,
    link: '/dashboard/ta/fpk',
    title: 'FPK',
  },
  {
    id: 8,
    icon: nav_7,
    icon_active: nav_7_active,
    link: '/dashboard/ta/position-level-requirement',
    title: 'Level Requirement',
  },
];

// props type
// type IProps = {
//   isOpenSidebar: boolean;
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
// };

const EmployAside = () => {
  const pathname = usePathname();
  const isOpenSidebar = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  /* Session Context */
  const session = useAppSessionContext();
  const authSessionPayload = DecryptSession(session[`${authSession}`]);
  console.info('auth payload \t:', authSessionPayload);

  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 450) {
      dispatch(setIsOpen(false));
    }
  };

  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const toggleOpen = () => {
    setIsButtonOpen(!isButtonOpen);
  };
  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? 'show' : ''}`}>
        <div className="position-relative">
          <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
            <Link href="/dashboard/employ-dashboard">
              <Image
                src={logo2}
                alt="logo"
                priority
                style={{ height: '80px', width: 'auto' }}
              />
            </Link>
            <button
              className="close-btn d-block d-md-none"
              onClick={() => dispatch(setIsOpen(false))}
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
              <p className="user-name text-center">
                {/* {authSessionPayload?.user?.name ?? 'unknown'} */}
                {authSessionPayload?.user?.name
                  ? `${authSessionPayload?.user?.name.substring(0, 15)}...`
                  : 'unknown'}
              </p>
            </div>
          </div>
          <nav className="dasboard-main-nav">
            <ul className="style-none">
              {nav_data.map((m) => {
                let isActive = false;
                if (m.id === 3) {
                  isActive =
                    pathname === m.link ||
                    pathname === '/dashboard/ta/submit-job' ||
                    pathname.includes('/dashboard/ta/submit-job/edit') ||
                    pathname.includes('/dashboard/ta/submit-job/duplicate');
                } else if (m.id === 6) {
                  isActive =
                    pathname === m.link ||
                    pathname === '/dashboard/ta/candidates/blacklisted';
                } else {
                  isActive = pathname === m.link;
                }
                return (
                  <li key={m.id} onClick={handleClick}>
                    <Link
                      href={m.link}
                      className={`d-flex w-100 align-items-center ${isActive ? 'active' : ''}`}
                      style={
                        isButtonOpen
                          ? m.subLink
                            ? {
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                              }
                            : {}
                          : m.subLink
                            ? { paddingTop: '10px', paddingBottom: '10px' }
                            : {}
                      }
                    >
                      <Image
                        src={isActive ? m.icon_active : m.icon}
                        alt=""
                        className="lazy-img"
                      />
                      <span className="d-flex align-items-center">
                        {m.title}
                        {m.subLink && (
                          <ExpendableButtonAside
                            isActive={isActive}
                            isOpen={isButtonOpen}
                            toggle={toggleOpen}
                          />
                        )}
                      </span>
                    </Link>
                    {isButtonOpen &&
                      m.subLink &&
                      m.subLink.map((item, index) => (
                        <Link
                          key={index}
                          href={item.link}
                          className={`ml-3 sub-link ${isActive ? 'active' : ''}`}
                          style={
                            isButtonOpen
                              ? {
                                  borderTopLeftRadius: '0px',
                                  borderTopRightRadius: '0px',
                                }
                              : {}
                          }
                        >
                          <span>{item.title}</span>
                        </Link>
                      ))}
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
        </div>
      </aside>
      {/* LogoutModal star */}
      <LogoutModal />
      {/* LogoutModal end */}
    </>
  );
};

export default EmployAside;
