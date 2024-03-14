'use client';
import React from 'react';
import Link from 'next/link';

const KickstartSection = () => {
  return (
    <>
      <div className="kickstart-section container mt-75 mb-100">
        <div className="row">
          <h2 className="text-center wow fadeInUp">
            Ready to kickstart your career with us?
          </h2>
          <p className="text-center mt-5">
            Find you dream job and be part of us
          </p>
        </div>
        <div className="row gx-5 gy-5 mt-1">
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Accounting & Finance
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Human Resources & General Affairs
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                IT & Software
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Media & creative
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Sales & Marketing
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Law & Legal service
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Client & Customer
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Business & Corporate Services
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="unit-container d-flex flex-column align-items-center justify-content-center">
              <Link href="#" className="mt-4 mb-2">
                Supply Chain & Procurement
              </Link>
              <p>7 Vacancies</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KickstartSection;
