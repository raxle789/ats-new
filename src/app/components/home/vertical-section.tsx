'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import logo from '@/assets/images/logo/logo_03.png';
import logo_2 from '@/assets/images/logo/logo_04.png';
import logo_w from '@/assets/images/logo/logo_06.png';
import shape from '@/assets/images/shape/shape_28.svg';
import vertical_line from '@/assets/images/vertical-line.jpg';
import PartnersSlider from '../partners/partners-slider';

const VerticalSection = () => {
  return (
    <div className="footer-one vertical-section">
      <div className="container">
        <div className="inner-wrapper mb-30">
          <div className="row">
            <h2 className="text-center wow fadeInUp">Our Line of Verticals</h2>
            {/* widget one */}
            <div className="col-lg-3 col-md-3 col-sm-4 mb-20 wow fadeInUp">
              <Image
                src={vertical_line}
                alt="Vertical-Line"
                className="mb-25 rounded-3"
              ></Image>
              <h5 className="footer-title vertical-title">Erajaya Digital</h5>
              <p>
                Focuses on 3C products (Communication: Computers, and Consumer
                Electronics)
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 mb-20 wow fadeInUp">
              <Image
                src={vertical_line}
                alt="Vertical-Line"
                className="mb-25 rounded-3"
              ></Image>
              <h5 className="footer-title vertical-title">
                Erajaya Active Lifestyle​
              </h5>
              <p>
                Focuses on products and accessories related to lifestyle through
                a variety of products, such as IoT, accessories, sport fashion
                apparel: and others
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 mb-20 wow fadeInUp">
              <Image
                src={vertical_line}
                alt="Vertical-Line"
                className="mb-25 rounded-3"
              ></Image>
              <h5 className="footer-title vertical-title">
                Erajaya Food & Nourishment
              </h5>
              <p>Focuses on food, beverages, & groceries products</p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 mb-20 wow fadeInUp">
              <Image
                src={vertical_line}
                alt="Vertical-Line"
                className="mb-25 rounded-3"
              ></Image>
              <h5 className="footer-title vertical-title">
                Erajaya Beauty & Wellness
              </h5>
              <p>Focuses on health and beauty products and services</p>
            </div>
          </div>
        </div>
        <PartnersSlider />
        <div className="d-flex justify-content-center mt-30">
          <Link href="/auth/login" className="btn-five w-25">
            More About Erajaya Vertical
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerticalSection;
