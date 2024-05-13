'use client';
import React from 'react';
import Slider from 'react-slick';
import Image, { StaticImageData } from 'next/image';
import logo_1 from '@/assets/images/home/partner-logo/ASICS.png';
import logo_2 from '@/assets/images/home/partner-logo/Erafone.png';
import logo_3 from '@/assets/images/home/partner-logo/Eraspace.png';
import logo_4 from '@/assets/images/home/partner-logo/Garmin.png';
import logo_5 from '@/assets/images/home/partner-logo/IT.png';
import logo_6 from '@/assets/images/home/partner-logo/JD.png';
import logo_7 from '@/assets/images/home/partner-logo/Nasa_Samsung.png';
// import logo_8 from '@/assets/images/home/partner-logo/TFS.png';
import logo_9 from '@/assets/images/home/partner-logo/UR.png';
import logo_10 from '@/assets/images/home/partner-logo/Wellings.png';
import logo_11 from '@/assets/images/home/partner-logo/dji.png';
import logo_12 from '@/assets/images/home/partner-logo/erablue-logo.png';
import logo_13 from '@/assets/images/home/partner-logo/ibox.png';
import logo_14 from '@/assets/images/home/partner-logo/xiaomi.png';
import logo_15 from '@/assets/images/home/partner-logo/paris_baguette.png';

// slider setting
const slider_setting = {
  dots: false,
  arrows: false,
  centerPadding: '0px',
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

// logo data
const logos: StaticImageData[] = [
  logo_1,
  logo_2,
  logo_3,
  logo_4,
  logo_5,
  logo_6,
  logo_7,
  // logo_8,
  logo_9,
  logo_10,
  logo_11,
  logo_12,
  logo_13,
  logo_14,
  logo_15,
];

const PartnersSlider = () => {
  return (
    <>
      <Slider {...slider_setting} className="partner-slider">
        {logos.map((logo, i) => (
          <div key={i} className="item" style={{ width: 'auto' }}>
            <div className="logo d-flex align-items-center justify-content-center">
              <Image
                src={logo}
                alt="logo"
                style={{ width: 'auto', height: '59px' }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default PartnersSlider;
