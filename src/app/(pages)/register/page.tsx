// 'use client';
import React from 'react';
import { Metadata } from 'next';
import HeaderSix from '@/layouts/headers/header-6';
import Wrapper from '@/layouts/wrapper';
import CompanyBreadcrumb from '../../components/common/common-breadcrumb';
import FooterOne from '@/layouts/footers/footer-one';
import RegisterArea from '../../components/register/register-area';

export const metadata: Metadata = {
  title: 'Register',
};

const RegisterPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        {/* <Header /> */}
        <HeaderSix />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Register"
          subtitle="Create an account & find your dream job"
        />
        {/* <div className="header-register">
          <div className="container">
            <div className="position-relative">
              <div className="row">
                <div className="col-xl-6 m-auto text-center">
                  <div className="title-two">
                    <h2 className="text-white">Register</h2>
                  </div>
                  <p className="text-lg text-white mt-30 lg-mt-20">
                    Create an account & Start posting or hiring talents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/*breadcrumb end */}

        {/* register area start */}
        <RegisterArea />
        {/* register area end */}

        {/* footer start */}
        {/* <FooterOne /> */}
        <FooterOne style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
