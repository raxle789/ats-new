'use client';
import React from 'react';
import UserDashboardArea from './dashboard-area';

const UserDashboardMain = () => {
  return (
    <div className="main-page-wrapper">
      {/* aside start */}
      {/* <EmployAside
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      /> */}
      {/* aside end 

      {/* dashboard area start */}
      <UserDashboardArea />
      {/* dashboard area end */}
    </div>
  );
};

export default UserDashboardMain;
