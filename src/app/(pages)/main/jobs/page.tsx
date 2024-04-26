import React from 'react';
import { Metadata } from 'next';
import Header from '@/layouts/headers/header';
import HeaderSix from '@/layouts/headers/header-6';
import Wrapper from '@/layouts/wrapper';
import JobBreadcrumb from '../../../components/jobs/breadcrumb/job-breadcrumb';
import JobList from '../../../components/jobs/list/job-list-area';
import JobPortalIntro from '../../../components/job-portal-intro/job-portal-intro';
import FooterOne from '@/layouts/footers/footer-one';

const JobVacancies = ({ searchParams }) => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <JobBreadcrumb />

        <JobList />
      </div>
    </Wrapper>
  );
};

export default JobVacancies;
