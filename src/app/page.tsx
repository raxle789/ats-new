import { Metadata } from 'next';
// import { Document, Page } from 'react-pdf';
// import prisma from '@/lib/services/connection/db';
// import { registerAssessment } from '@/lib/action/job-vacancies/job-vacancy-details/job-vacancy-details-assessment/action';
// import * as crypto from '@/lib/utils/utils';
// import CryptoJS from 'crypto-js';
// import { getAllApplicantDataByJobVacancyId } from '@/lib/action/job-vacancies/job-vacancy-details/action';
import Wrapper from '@/layouts/wrapper';
import HeaderSix from '@/layouts/headers/header-6';
import HeroBannerSix from './components/hero-banners/hero-banner-six';
// import CategorySectionSix from './components/category/category-section-6';
import { TrendingJobs } from './components/category/category-section-3';
import { JobListItems } from './components/jobs/list/job-list-one';
// import BlogFour from './components/blogs/blog-four';
// import SpiritSection from './components/home/spirit-section';
// import EngageSection from './components/home/engage-section';
// import VerticalSection from './components/home/vertical-section';
// import FancyBannerThree from './components/fancy-banner/fancy-banner-3';
// import EventSection from './components/home/event-section';
// import VisionSection from './components/home/vision-section';
// import FeatureNine from './components/features/feature-nine';
// import FeedbackFive from './components/feedBacks/feedback-five';
// import FancyBannerSix from './components/fancy-banner/fancy-banner-6';
// import FooterOne from '@/layouts/footers/footer-one';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// import { getFatkhur, migrateFromATS } from '@/libs/MsSQL/FETCH_EXISTING';
// import { getSession } from '@/libs/Authentication/session';
// import { proint } from '@/app/services/connection/db';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home() {
  const DynamicCategory = dynamic(
    () => import('./components/category/category-section-6'),
  );
  const DynamicSpirit = dynamic(
    () => import('./components/home/spirit-section'),
  );
  const DynamicMotto = dynamic(
    () => import('./components/features/feature-nine'),
  );
  const DynamicVertical = dynamic(
    () => import('./components/home/vertical-section'),
  );
  const DynamicFeedback = dynamic(
    () => import('./components/feedBacks/feedback-five'),
  );
  const DynamicEngage = dynamic(
    () => import('./components/home/engage-section'),
  );
  const DynamicBlog = dynamic(() => import('./components/blogs/blog-four'));
  const DynamicFooter = dynamic(() => import('@/layouts/footers/footer-one'));
  // const data = await getAllApplicantDataByJobVacancyId(2, 0, 10);

  // console.info(data);

  // const encryptedData = CryptoJS.Rabbit.encrypt(
  //   String(1),
  //   process.env.NEXT_PUBLIC_SECRET_KEY,
  // ).toString();

  // const encryptedData2 = CryptoJS.Rabbit.encrypt(
  //   String(1),
  //   process.env.NEXT_PUBLIC_SECRET_KEY,
  // ).toString();

  // const encryptedData3 = CryptoJS.Rabbit.encrypt(
  //   String(2),
  //   process.env.NEXT_PUBLIC_SECRET_KEY,
  // ).toString();
  // const encryptedData3 = CryptoJS.Rabbit.encrypt(
  //   String(2),
  //   process.env.NEXT_PUBLIC_SECRET_KEY,
  // ).toString();

  // const ayam = crypto.decryptData(encryptedData);
  // const ayam = crypto.decryptData(encryptedData);

  // console.info(ayam);
  // console.info(ayam);

  // console.info(encryptedData2);
  // console.info(encryptedData2);

  // console.info(encryptedData3);

  // const data = await registerAssessment(encryptedData, encryptedData2);

  // console.info(data);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderSix />
        {/* header end */}

        {/* hero banner start */}
        <HeroBannerSix />
        {/* hero banner end */}

        {/* category section start */}
        <DynamicCategory style_2={true} />
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
          </div>
        </section>
        {/* job list items end */}

        {/* spirit words start */}
        <DynamicSpirit />
        {/* spirit words end */}

        {/* text feature start */}
        <DynamicMotto />
        {/* text feature end */}

        {/* vertical section start */}
        <DynamicVertical />
        {/* vertical section end */}

        {/* feedback start */}
        <DynamicFeedback />
        {/* feedback end */}

        {/* blog start */}
        <DynamicBlog />
        {/* blog end */}

        {/* engage section start */}
        <DynamicEngage />
        {/* engage section end */}

        {/* footer start */}
        <DynamicFooter style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
}
