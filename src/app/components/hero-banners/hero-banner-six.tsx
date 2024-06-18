'use client';
import React from 'react';
// import banner_1 from '@/assets/images/assets/banner_img_01.jpg';
// import banner_2 from '@/assets/images/assets/banner_img_02.jpg';
// import banner_1 from '@/assets/images/home/banner1.png';
// import banner_2 from '@/assets/images/home/banner2.png';
import banner_3 from '@/assets/images/home/banner3.jpg';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';
import PositionLevelSelect from '../select/position-level';
import JobCategorySelect from '../select/job-category';
// import CounterOne from '../counter/counter-one';

const HeroBannerSix = () => {
  const { handleSubmit, setCategoryVal, setLocationVal, setSearchText } =
    useSearchFormSubmit();
  // handleSearchInput
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="hero-banner-six position-relative pt-170 lg-pt-150 pb-60 lg-pb-40">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xxl-8 col-xl-9 col-lg-8 m-auto text-center">
              <h1 className="wow fadeInUp" data-wow-delay="0.3s">
                Erajaya Group of Companies
              </h1>
              <p
                className="text-md mt-25 mb-55 lg-mb-40 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Empower your career, exceed your ambitions. Join us on our
                journey to become the largest lifestyle smart retailer in
                Indonesia.
              </p>
            </div>
          </div>
          <div className="position-relative">
            <div className="row">
              <div className="col-xl-8 col-lg-9 m-auto">
                <div
                  className="job-search-one style-two position-relative me-xxl-3 ms-xxl-3 mb-100 lg-mb-50 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="input-box">
                          {/* <div className="label">Your job title, keyword</div>
                          <input
                            onChange={handleSearchInput}
                            type="text"
                            placeholder="Google"
                            className="keyword"
                          /> */}
                          <div className="label">Job Function</div>
                          <JobCategorySelect setCategoryVal={setCategoryVal} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-box border-left">
                          <div className="label">Position Level</div>
                          <PositionLevelSelect
                            setLocationVal={setLocationVal}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <button className="fw-500 text-md h-100 w-100 tran3s search-btn-two">
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-xl-8 m-auto">
                <div className="row">
                  <CounterOne style_2={true} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div
        id="banner-six-carousel"
        className="carousel slide pointer-event"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner w-100 h-100">
          <div
            className="carousel-item active"
            style={{ backgroundImage: `url(${banner_3.src})` }}
          ></div>
          {/* <div
            className="carousel-item"
            style={{ backgroundImage: `url(${banner_2.src})` }}
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroBannerSix;
