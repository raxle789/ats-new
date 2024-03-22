'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import banner_1 from '@/assets/images/assets/banner_img_01.jpg';
import banner_2 from '@/assets/images/assets/banner_img_02.jpg';
import contoh from '@/assets/images/carousel-contoh.jpg';
// import shape_1 from '@/assets/images/shape/shape_01.svg';
// import shape_2 from '@/assets/images/shape/shape_02.svg';
// import shape_3 from '@/assets/images/shape/shape_03.svg';
// import main_img from '@/assets/images/assets/img_01.jpg';
// import SearchForm from '../forms/search-form';

const SpiritSection = () => {
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
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image src={contoh} className="d-block w-100" alt="" />
          </div>
          <div className="carousel-item">
            <Image src={contoh} className="d-block w-100" alt="" />
          </div>
          <div className="carousel-item">
            <Image src={contoh} className="d-block w-100" alt="" />
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
