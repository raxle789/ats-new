import React from 'react';
// import Link from 'next/link';
import Image from 'next/image';
// import logo_era from '@/assets/images/logo/logo_erajaya2.jpg';
// import img_2 from '@/assets/images/assets/img_38.jpg';
import era_group from '@/assets/images/home/era_group.png';
// import img_4 from '@/assets/images/assets/img_42.png';
// import screen_1 from '@/assets/images/assets/screen_01.png';
// import screen_2 from '@/assets/images/assets/screen_02.png';
// import screen_3 from '@/assets/images/assets/screen_03.png';
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
          <div className="col-lg-6">
            <div className="wow fadeInLeft">
              <div className="title-two">
                <h2 className="main-font color-blue mb-3">About Erajaya</h2>
                <p>
                  Established in 1996, PT Erajaya Swasembada Tbk. (“Erajaya”)
                  has grown beyond an integrated mobile telecommunication device
                  importer, distributor and retailer. We are on the track to
                  become the largest smart retailer in Indonesia through 4
                  verticals.
                </p>
              </div>
              <div
                className="accordion accordion-style-one color-two mt-40"
                id="accordionOne"
              >
                <AccordionItem
                  id="one"
                  isShow={true}
                  title="Vision"
                  desc="To provide mobile products and solutions to improve the quality of life and lifestyle"
                  parent="accordionOne"
                />
                <AccordionItem
                  id="two"
                  title="Mission"
                  desc="Becoming a leading distribution and retail company with integrated direct access to consumers and retailers that offer a complete range of mobile products & solutions"
                  parent="accordionOne"
                />
                <AccordionItem
                  id="three"
                  title="ILEAD Core Values"
                  desc="desc"
                  parent="accordionOne"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-11 ms-auto me-auto me-lg-0 d-flex align-items-center justify-content-center">
            <div>
              <Image
                src={era_group}
                alt="image"
                className="lazy-img logo-img mb-4 wow fadeInRight"
                style={{ width: '700px', height: 'auto' }}
                loading="lazy"
              />
            </div>
            {/* <div className="img-data position-relative md-mt-50"> */}
            {/* <div className="row ms-5 mt-30">
                <div className="col-md-6 col-lg-12">
                  <Image
                    src={grey_bg}
                    alt="image"
                    className="about-image-2 mt-35 wow fadeInUp"
                    loading="lazy"
                  />
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureNine;
