import React from 'react';
import { Metadata } from 'next';
import Wrapper from '@/layouts/wrapper';
import HeaderSix from '@/layouts/headers/header-6';
import FooterOne from '@/layouts/footers/footer-one';
import Link from 'next/link';
import Header from '@/layouts/headers/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <HeaderSix />
        {children}
        {/* footer start */}
        <FooterOne style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
}
