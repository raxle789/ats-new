import { Metadata } from 'next';
import Wrapper from '@/layouts/wrapper';
import HeaderSix from '@/layouts/headers/header-6';
import HeroBannerSix from './components/hero-banners/hero-banner-six';
import CategorySectionSix from './components/category/category-section-6';
import { TrendingJobs } from './components/category/category-section-3';
import { JobListItems } from './components/jobs/list/job-list-one';
import BlogFour from './components/blogs/blog-four';
import SpiritSection from './components/home/spirit-section';
import EngageSection from './components/home/engage-section';
import VerticalSection from './components/home/vertical-section';
// import FancyBannerThree from './components/fancy-banner/fancy-banner-3';
// import EventSection from './components/home/event-section';
// import VisionSection from './components/home/vision-section';
import FeatureNine from './components/features/feature-nine';
import FeedbackFive from './components/feedBacks/feedback-five';
// import FancyBannerSix from './components/fancy-banner/fancy-banner-6';
import FooterOne from '@/layouts/footers/footer-one';
import Link from 'next/link';

import { getFatkhur, migrateFromATS } from '@/libs/MsSQL/FETCH_EXISTING';
import { getSession } from '@/libs/Authentication/session';
import { proint } from '@/app/services/connection/db';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home() {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSix />
        {/* header end */}

        {/* hero banner start */}
        <HeroBannerSix />
        {/* hero banner end */}

        {/* partners logo start*/}
        {/* <div className="partner-logos bg-color border-0 pt-45 pb-45 ps-3 pe-3">
          <PartnersSlider />
        </div> */}
        {/* partners logo end*/}

        {/* category section start */}
        <CategorySectionSix style_2={true} />
        {/* category section end */}

        {/* trending jobs start */}
        <section className="category-section-three pt-140 lg-pt-100">
          <div className="container">
            <div className="position-relative">
              <div className="title-one mb-60 lg-mb-40">
                <h2
                  className="main-font color-blue wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  Trending Job
                </h2>
              </div>
              <TrendingJobs />
            </div>
          </div>
        </section>
        {/* trending jobs end */}

        {/* job list items start */}
        <section className="job-listing-one mt-160 lg-mt-100 sm-mt-80">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6">
                <div className="title-one">
                  <h2
                    className="main-font color-blue wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    New job listing
                  </h2>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="d-flex justify-content-lg-end">
                  <Link
                    href="/job-list-v1"
                    className="btn-six d-none d-lg-inline-block"
                  >
                    Explore all jobs
                  </Link>
                </div>
              </div>
            </div>
            <div className="job-listing-wrapper mt-60 md-mt-40 wow fadeInUp">
              <JobListItems style_2={true} />
            </div>
            <div className="text-center mt-40 d-lg-none">
              <Link href="/job-list-v1" className="btn-six">
                Explore all jobs
              </Link>
            </div>
            {/* <div className="text-center mt-50 wow fadeInUp">
              <div className="btn-eight fw-500">
                Do you want to post a job for your company?{' '}
                <span>We can help.</span>{' '}
                <Link href="/auth/register">Click here</Link>
              </div>
            </div> */}
          </div>
        </section>
        {/* job list items end */}

        {/* spirit words start */}
        <SpiritSection />
        {/* spirit words end */}

        {/* fancy banner start */}
        {/* <FancyBannerThree style_2={true} /> */}
        {/* fancy banner end */}

        {/* text feature start */}
        <FeatureNine />
        {/* text feature end */}

        {/* vision section start */}
        {/* <VisionSection /> */}
        {/* vision section end */}

        {/* vertical section start */}
        <VerticalSection />
        {/* vertical section end */}

        {/* feedback start */}
        <FeedbackFive />
        {/* feedback end */}

        {/* kickstart section start */}
        {/* <KickstartSection /> */}
        {/* kickstart section end */}

        {/* text feature two start */}
        {/* <FeatureTwo /> */}
        {/* text feature two end */}

        {/* event section start */}
        {/* <EventSection /> */}
        {/* event section end */}

        {/* blog start */}
        <BlogFour />
        {/* blog end */}

        {/* engage section start */}
        <EngageSection />
        {/* engage section end */}

        {/* fancy banner start */}
        {/* <FancyBannerSix /> */}
        {/* fancy banner end */}

        {/* footer start */}
        <FooterOne style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
}
