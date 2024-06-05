'use client';
import React, { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import Slider from 'react-slick';
// internal
// import user_1 from '@/assets/images/assets/img_14.jpg';
// import user_2 from '@/assets/images/assets/img_15.jpg';
// import user_3 from '@/assets/images/assets/img_14.jpg';
import jonathan from '@/assets/images/home/jonathan.png';
import saras from '@/assets/images/home/saras.png';
import septi from '@/assets/images/home/septi.png';

// slider setting
const slider_setting = {
  dots: false,
  arrows: false,
  centerPadding: '0px',
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// slider data
const slider_data: {
  id: number;
  review_text: string;
  review_start: number[];
  desc: string;
  name: string;
  position: string;
  user: StaticImageData;
}[] = [
  {
    id: 1,
    review_text: 'Impressive!',
    review_start: [1, 2, 3, 4, 5],
    desc: 'I’m so lucky to be blessed with an incredibly supportive support system – line managers that acknowledge my needs,both personal and professional, and Erajaya, a company that gives the same career opportunities to all employees regardless the gender.',
    name: 'Septi Dini',
    position: 'Strategy & Planning Lead',
    user: septi,
  },
  {
    id: 2,
    review_text: 'Great work!!',
    review_start: [1, 2, 3, 4, 5],
    desc: "As a millennial who gets bored easily and always jumps around, I'm quite surprised that I can survive. Of course this is because I feel that there is equality and career opportunities for all Erajaya employees.",
    name: 'Saras Ina',
    position: 'Lead Product Management',
    user: saras,
  },
  {
    id: 3,
    review_text: 'Impressive!',
    review_start: [1, 2, 3, 4, 5],
    desc: 'Erajaya provides a positive working environment that emphasizes a culture of collaboration and teamwork, creating a sense of belonging and purpose. The working environment encourages open and safe communication, which will keep you motivated at work and push you beyond your comfort zone. #LifeatErajaya',
    name: 'Jonathan Mulia',
    position: 'Talent Acquisition & Employer Branding',
    user: jonathan,
  },
];

const FeedbackFive = () => {
  const sliderRef = useRef<Slider | null>(null);

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };
  return (
    <section className="feedback-section-five position-relative mt-180 xl-mt-150 pt-90 md-pt-60 pb-130 xl-pb-100 md-pb-70">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-md-6">
              <div className="title-one mb-55 lg-mb-40">
                <h2
                  className="main-font text-white wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  Grow your career with us
                </h2>
              </div>
            </div>
          </div>
          <Slider
            ref={sliderRef}
            {...slider_setting}
            className="row feedback-slider-one"
          >
            {slider_data.map((item) => (
              <div key={item.id} className="col-lg-4 item m-0">
                <div className="feedback-block-three position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="review fw-500">
                      {item.review_text}
                      <ul className="style-none d-flex rating">
                        {item.review_start.map((r: any, i: any) => (
                          <li key={i}>
                            <a href="#">
                              <i className="bi bi-star-fill"></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Image
                      src={item.user}
                      alt="user"
                      className="author-img rounded-circle"
                      width="50"
                      height="50"
                    />
                  </div>
                  <blockquote className="mt-50 lg-mt-20 mb-15 lg-mb-10 text-dark">
                    <div>{item.desc}</div>
                  </blockquote>
                  <div className="block-footer pt-35 lg-pt-10">
                    <div className="sub-block-footer d-flex flex-column align-items-start justify-content-start">
                      <div className="name fw-500 text-dark">{item.name}</div>
                      <span className="opacity-50">{item.position}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <ul className="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-30">
            <li onClick={sliderPrev} className="prev_b slick-arrow text-white">
              <i className="bi bi-arrow-left"></i>
            </li>
            <li onClick={sliderNext} className="next_b slick-arrow text-white">
              <i className="bi bi-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeedbackFive;
