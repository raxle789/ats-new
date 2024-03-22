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
        <div className="bg-wrapper pt-85 lg-pt-50 pb-80 lg-pb-50 position-relative">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="title-one">
                  <h2 className="text-white main-font">
                    Let's Engage with Us!
                  </h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="text-wrapper p0 mb-50 md-mb-20">
                  <div className="title-one mt-5 mb-25 lg-mb-20">
                    <p className="text-white text-md">
                      Visit our social media and career page for more
                      information about Erajaya Group
                    </p>
                    <Link
                      href="/auth/login"
                      className="btn-five w-50 d-flex align-items-center mb-2"
                    >
                      <i className="bi bi-instagram me-2"></i>
                      <span>@erajaya_career</span>
                    </Link>
                    <Link
                      href="/auth/login"
                      className="btn-five w-50 d-flex align-items-center mb-2"
                    >
                      <i className="bi bi-linkedin me-2"></i>
                      <span>Erajaya Swasembada</span>
                    </Link>
                    <Link
                      href="/auth/login"
                      className="btn-five w-50 d-flex align-items-center mb-2"
                    >
                      <i className="bi bi-globe me-2"></i>
                      <span>www.erajaya.com</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                {/* <div className="title-one text-center text-lg-start">
                  <h2 className="main-font text-white">
                    Join Our Talent Network
                  </h2>
                </div> */}
              </div>
              <div className="col-lg-6 mt-5 ms-auto">
                <p className="text-md text-white mb-35 lg-mb-20 md-mt-20 text-center text-md-start">
                  Be the first to get the latest information about Erajaya
                  vacancy and stay informed for interesting updates.{' '}
                </p>
                <ul className="btn-group style-none d-flex justify-content-center justify-content-lg-start">
                  <form className="d-flex">
                    <input
                      className="form-control subscribe-email me-2 focus-ring focus-ring-light"
                      type="email"
                      placeholder="Submit your Email"
                      name="email"
                    />
                    <button className="btn-five border6">Subscribe</button>
                  </form>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="container">
        <div className="position-relative">
          
        </div>
      </div> */}
        </div>
      </section>
    </>
  );
};

export default EngageSection;
