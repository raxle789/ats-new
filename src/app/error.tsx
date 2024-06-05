'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import icon from '@/assets/images/icon/icon_61.svg';
import err_img from '@/assets/images/assets/404.svg';

const ErrorPageArea = () => {
  return (
    <div
      className="error-page d-flex align-items-center justify-content-center"
      style={{ marginTop: '8%' }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-md-6 ms-auto order-md-last">
            <h2>Something went wrong!</h2>
            <p className="text-md">
              Can not find what you need? Take a moment, start from our homepage
              or refresh the page.
            </p>
            <Link
              href="/"
              className="btn-one w-100 d-flex align-items-center justify-content-between mt-30"
            >
              <span>GO BACK</span>
              <Image src={icon} alt="icon" />
            </Link>
          </div>
          <div className="col-md-6 order-md-first">
            <Image src={err_img} alt="error-img" className="sm-mt-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageArea;
