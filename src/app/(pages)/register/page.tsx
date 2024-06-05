// 'use client';
import React from 'react';
import { Metadata } from 'next';
import HeaderSix from '@/layouts/headers/header-6';
import Wrapper from '@/layouts/wrapper';
import CompanyBreadcrumb from '../../components/common/common-breadcrumb';
// import FooterOne from '@/layouts/footers/footer-one';
// import RegisterArea from '../../components/register/register-area';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Register',
};

const RegisterPage = () => {
  const DynamicRegisterArea = dynamic(
    () => import('../../components/register/register-area'),
  );
  const DynamicFooter = dynamic(() => import('@/layouts/footers/footer-one'));
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSix />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Register"
          subtitle="Create an account & find your dream job"
        />
        {/*breadcrumb end */}

        {/* register area start */}
        <DynamicRegisterArea />
        {/* register area end */}

        {/* footer start */}
        <DynamicFooter style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
