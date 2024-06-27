import React from 'react';
// import { Metadata } from 'next';
// import Header from '@/layouts/headers/header';
// import HeaderSix from '@/layouts/headers/header-6';
import Wrapper from '@/layouts/wrapper';
import JobBreadcrumb from '../../../components/jobs/breadcrumb/job-breadcrumb';
import { Metadata } from 'next';
import JobList from '../../../components/jobs/list/job-list-area';
// import dynamic from 'next/dynamic';
// import JobPortalIntro from '../../../components/job-portal-intro/job-portal-intro';
// import FooterOne from '@/layouts/footers/footer-one';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Job Vacancy',
};

type Props = {
  searchParams: {} | any;
};

const JobVacancies: React.FC<Props> = async ({ searchParams }) => {
  // const DynamicJobList = dynamic(
  //   () => import('../../../components/jobs/list/job-list-area'),
  // );
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <JobBreadcrumb />

        <JobList searchParams={searchParams} />
      </div>
    </Wrapper>
  );
};

export default JobVacancies;
