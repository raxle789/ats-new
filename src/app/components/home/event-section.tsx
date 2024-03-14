'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import vertical_line from '@/assets/images/vertical-line.jpg';

const EventSection = () => {
  return (
    <>
      <div className="event-section container mt-75 ">
        <div className="row">
          <h2 className="text-center wow fadeInUp">Life at Erajaya</h2>
          <p className="text-center mt-5">
            Explore the latest events, news, and articles about Erajaya to stay
            updated with the most current information about our company.
          </p>
        </div>
        <div className="row gx-5 mt-10 mb-10">
          <div className="sub-container col-lg-4">
            <div className="event-unit-container d-flex flex-column align-items-center justify-content-center">
              <Image src={vertical_line} alt="event-image" />
              <Link href="#" className="mt-4 mb-4">
                Eraversary
              </Link>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="event-unit-container d-flex flex-column align-items-center justify-content-center">
              <Image src={vertical_line} alt="event-image" />
              <Link href="#" className="mt-4 mb-4">
                Erajaya Achievement Award
              </Link>
            </div>
          </div>
          <div className="sub-container col-lg-4">
            <div className="event-unit-container d-flex flex-column align-items-center justify-content-center">
              <Image src={vertical_line} alt="event-image" />
              <Link href="#" className="mt-4 mb-4">
                Kampus Merdeka Erajaya Batch 4
              </Link>
            </div>
          </div>
        </div>
        <div className="row d-flex align-item-center justify-content-center mt-25">
          <div className="col-lg-3 d-flex align-item-center justify-content-center">
            <Link href="#fancy-banner" className="btn-five">
              Find More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventSection;
