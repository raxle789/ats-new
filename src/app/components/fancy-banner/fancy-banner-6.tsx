'use client';
import Link from 'next/link';
import React from 'react';

const FancyBannerSix = () => {
  return (
    <section
      id="fancy-banner"
      className="fancy-banner-five bg-image position-relative pt-100 lg-pt-60 pb-100 lg-pb-60"
    >
      <div className="container">
        <div className="position-relative">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="title-one text-center text-lg-start">
                <h2 className="main-font text-white">
                  Join Our Talent Network
                </h2>
              </div>
            </div>
            <div className="col-lg-5 ms-auto">
              <p className="text-md text-white mb-35 lg-mb-20 md-mt-20 text-center text-md-start">
                Be the first to get the latest information about Erajaya vacancy
                and stay informed for interesting updates.{' '}
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
                {/* <Link href="/job-list-v1" className="btn-seven border6">
                    Looking for job?
                  </Link> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FancyBannerSix;
