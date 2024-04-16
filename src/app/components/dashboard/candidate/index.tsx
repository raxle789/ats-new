'use client';
import React from 'react';
// import CandidateAside from './aside';
import DashboardArea from './dashboard-area';

const CandidateDashboardMain = () => {
  return (
    <div className="main-page-wrapper">
      {/* aside start */}
      {/* <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} /> */}
      {/* aside end  */}

      {/* dashboard area start */}
      <DashboardArea />
      {/* dashboard area end */}
    </div>
  );
};

export default CandidateDashboardMain;
