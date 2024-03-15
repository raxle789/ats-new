'use client';
import Link from 'next/link';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import icon_1 from '@/assets/images/icon/icon_37.svg';
import icon_2 from '@/assets/images/icon/icon_38.svg';
import icon_3 from '@/assets/images/icon/icon_39.svg';

const EngageSection = () => {
  return (
    <>
      <section className="fancy-banner-three mt-100">
        <div className="bg-wrapper pt-85 lg-pt-50 pb-80 lg-pb-50 position-relative wow fadeInUp">
          <div className="container">
            <div className="row">
              <div className="col-xxl-5 col-xl-6 col-lg-6 ms-auto">
                <div className="text-wrapper p0 mb-50 md-mb-20 wow fadeInRight">
                  <div className="title-one mt-25 mb-25 lg-mb-20">
                    <h2 className="text-white main-font">
                      Let's Engage with Us!
                    </h2>
                    <p className="text-white text-md">
                      Visit our social media and career page for more
                      information about Erajaya Group
                    </p>
                    <Link
                      href="/auth/login"
                      className="btn-five w-75 d-flex align-items-center mb-2"
                    >
                      <i className="bi bi-instagram me-2"></i>
                      <span>@erajaya_career</span>
                    </Link>
                    <Link
                      href="/auth/login"
                      className="btn-five w-75 d-flex align-items-center mb-2"
                    >
                      <i className="bi bi-linkedin me-2"></i>
                      <span>Erajaya Swasembada</span>
                    </Link>
                    <Link
                      href="/auth/login"
                      className="btn-five w-75 d-flex align-items-center mb-2"
                    >
                      <i className="bi bi-globe me-2"></i>
                      <span>www.erajaya.com</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EngageSection;
