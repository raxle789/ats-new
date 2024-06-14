'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import carousel1 from '@/assets/images/home/carousel1.jpg';
import carousel2 from '@/assets/images/home/carousel2.jpg';
import carousel3 from '@/assets/images/home/carousel3.jpeg';
import carousel4 from '@/assets/images/home/carousel4.jpg';
import carousel5 from '@/assets/images/home/carousel5.jpg';
import carousel6 from '@/assets/images/home/carousel6.jpg';
import carousel7 from '@/assets/images/home/carousel7.jpg';
import carousel8 from '@/assets/images/home/carousel8.jpg';
import carousel9 from '@/assets/images/home/carousel9.jpg';
// import dynamic from 'next/dynamic';

const SpiritSection = () => {
  // const DynamicCarousel9 = dynamic(() => import('@/assets/images/home/carousel9.jpg'));
  // const imageSrc = require('@/assets/images/home/carousel9.jpg');
  return (
    <div className="spirit-section row">
      <div className="col-lg-4 spirit-words">
        <h1 className="wow fadeInUp">We Are ERAngers!</h1>
        <p className="wow fadeInUp">
          We endlessly strive to foster passion for our work, and we extend that
          very opportunity to you at Erajaya. With our core value, ILEAD, let us
          unite our forces and become the leading smart retailer!
        </p>
        <div>
          <Link href="#" className="btn-five w-100 wow fadeInUp">
            Join Us
          </Link>
        </div>
      </div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide col-lg-8"
        data-bs-ride="carousel"
      >
        <div
          className="carousel-inner"
          style={{ borderTopRightRadius: '20%', borderBottomLeftRadius: '20%' }}
        >
          <div className="carousel-item active">
            <Image
              src={carousel1}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel2}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel3}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel4}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel5}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel6}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel7}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel8}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item">
            <Image
              src={carousel9}
              className="d-block w-100"
              alt=""
              style={{ width: 'auto', height: '450px' }}
              loading="lazy"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default SpiritSection;
