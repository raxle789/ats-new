import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo_era from '@/assets/images/logo/logo_erajaya2.jpg';
import img_1 from '@/assets/images/assets/img_37.jpg';
import img_2 from '@/assets/images/assets/img_38.jpg';
import img_3 from '@/assets/images/assets/img_04.jpg';
import screen_1 from '@/assets/images/assets/screen_01.png';
import screen_2 from '@/assets/images/assets/screen_02.png';
import screen_3 from '@/assets/images/assets/screen_03.png';
import AccordionItem from '../accordion/accordion-item';

// style
const imgStyle = {
  height: 'auto',
};

const FeatureNine = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="wow fadeInLeft">
              <div className="title-two">
                <Image
                  src={img_1}
                  alt="image"
                  className="lazy-img img01 mb-4"
                  style={imgStyle}
                />
                <h2 className="main-font color-blue mb-3">About Erajaya</h2>
                <p>
                  Established in 1996, PT Erajaya Swasembada Tbk. (“Erajaya”)
                  has grown beyond an integrated mobile telecommunication device
                  importer, distributor and retailer. We are on the track to
                  become the largest smart retailer in Indonesia through 4
                  verticals.
                </p>
              </div>
              <Link href="/candidates-v3" className="btn-five mt-45 lg-mt-20">
                Find out more about Erajaya
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-11 ms-auto me-auto me-lg-0">
            <div className="img-data position-relative md-mt-50">
              <div className="row mt-30">
                <div className="col-md-6 col-7">
                  <Image
                    src={img_3}
                    alt="image"
                    className="lazy-img img01 mt-35"
                    style={imgStyle}
                  />
                </div>
                <div className="col-md-6 col-7 mt-100">
                  <Image
                    src={img_3}
                    alt="image"
                    className="lazy-img img01 mt-35"
                    style={imgStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureNine;
