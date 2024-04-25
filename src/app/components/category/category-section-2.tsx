import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import icon_1 from '@/assets/images/icon/icon_12.svg';
import icon_2 from '@/assets/images/icon/icon_13.svg';
import icon_3 from '@/assets/images/icon/icon_14.svg';
import icon_4 from '@/assets/images/icon/icon_15.svg';
import icon_5 from '@/assets/images/icon/icon_16.svg';
import icon_6 from '@/assets/images/icon/icon_17.svg';
import icon_7 from '@/assets/images/icon/icon_18.svg';
import icon_8 from '@/assets/images/icon/icon_19.svg';
import shape_1 from '@/assets/images/shape/shape_23.svg';
import shape_2 from '@/assets/images/shape/shape_22.svg';
import shape_3 from '@/assets/images/shape/shape_24.svg';
// import bg_11 from '@/assets/images/assets/img_16.jpg';
// import bg_2 from '@/assets/images/assets/img_17.jpg';
// import bg_3 from '@/assets/images/assets/img_18.jpg';
// import bg_4 from '@/assets/images/assets/img_19.jpg';
import bg_1 from '@/assets/images/home/Accounting.png';
import bg_2 from '@/assets/images/home/Business_&_Corporate_Service.png';
import bg_3 from '@/assets/images/home/Client_&_Customer_Service.png';
import bg_4 from '@/assets/images/home/Food_&_Beverage.png';
import bg_5 from '@/assets/images/home/Human_Resources.png';
import bg_6 from '@/assets/images/home/IT_&_Software.png';
import bg_7 from '@/assets/images/home/Law_&_Legal_Service.png';
import bg_8 from '@/assets/images/home/Media_&_Creative.png';
import bg_9 from '@/assets/images/home/Sales_&_Marketing.png';
import bg_10 from '@/assets/images/home/Supply_Chain_Management.png';
import { ICategoryTwo } from '@/types/category-type';

// category data
export const category_data: ICategoryTwo[] = [
  {
    id: 1,
    icon: icon_1,
    title: <>Accounting.</>,
    vacancy: 2340,
    bg_img: bg_1,
  },
  {
    id: 2,
    icon: icon_2,
    title: (
      <>
        Business &
        <br />
        Corporate Service.
      </>
    ),
    vacancy: 1560,
    bg_img: bg_2,
  },
  {
    id: 3,
    icon: icon_3,
    title: (
      <>
        Client & Customer <br />
        Service.
      </>
    ),
    vacancy: 2210,
    bg_img: bg_3,
  },
  {
    id: 4,
    icon: icon_4,
    title: <>Food & Beverage.</>,
    vacancy: 980,
    bg_img: bg_4,
  },
  {
    id: 5,
    icon: icon_5,
    title: <>Human Resources</>,
    vacancy: 1687,
    bg_img: bg_5,
  },
  {
    id: 6,
    icon: icon_6,
    title: <>IT & Software.</>,
    vacancy: 758,
    bg_img: bg_6,
  },
  {
    id: 7,
    icon: icon_7,
    title: (
      <>
        Law & Legal <br />
        Service.
      </>
    ),
    vacancy: 1452,
    bg_img: bg_7,
  },
  {
    id: 8,
    icon: icon_8,
    title: <>Media & Creative.</>,
    vacancy: 1452,
    bg_img: bg_8,
  },
  {
    id: 9,
    icon: icon_7,
    title: <>Sales & Marketing.</>,
    vacancy: 1452,
    bg_img: bg_9,
  },
  {
    id: 10,
    icon: icon_7,
    title: (
      <>
        Supply Chain <br />
        Management.
      </>
    ),
    vacancy: 1452,
    bg_img: bg_10,
  },
  {
    id: 11,
    icon: icon_8,
    title: <>13k+</>,
    sub_title: 'Job already posted',
    bg: 'bg-color',
    df: true,
  },
];
// CategoryCardWrapper
export function CategoryCardWrapper() {
  return (
    <div className="card-wrapper row mt-80 lg-mt-40">
      {category_data.map((item) => (
        <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 d-flex">
          <div
            className={`card-style-four ${item?.bg} tran3s w-100 mt-30 wow fadeInUp`}
          >
            {!item.df && (
              <Link href="/job-grid-v2" className="d-block">
                <div className="icon tran3s d-flex align-items-center justify-content-center">
                  <Image src={item.icon} alt="icon" className="lazy-img" />
                </div>
                <div className="title tran3s fw-500 text-lg">{item.title}</div>
                <div className="total-job">{item.vacancy} vacancy</div>
              </Link>
            )}
            {item.df && (
              <Link href="/job-grid-v2" className="d-block">
                <div className="title text-white">{item.title}</div>
                <div className="text-lg text-white">{item?.sub_title}</div>
                <div className="d-flex align-items-center justify-content-end mt-50">
                  <Image src={shape_2} alt="shape" className="lazy-img" />
                  <div className="icon tran3s d-flex align-items-center justify-content-center ms-5">
                    <Image src={item.icon} alt="icon" className="lazy-img" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const CategorySectionTwo = () => {
  return (
    <section className="category-section-two position-relative pt-150 lg-pt-100 pb-140 lg-pb-80">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-6 col-sm-8">
            <div
              className="title-one text-center text-sm-start wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <h2 className="fw-600">Most demanding job categories.</h2>
            </div>
          </div>
          <div className="col-md-5 col-sm-4">
            <div className="d-none d-sm-flex justify-content-sm-end mt-25">
              <Link href="/job-grid-v1" className="btn-six border-0">
                All Categories{' '}
                <Image src={shape_1} alt="shape" className="lazy-img shapes" />
              </Link>
            </div>
          </div>
        </div>
        {/* CategoryCardWrapper */}
        <CategoryCardWrapper />
        {/* CategoryCardWrapper */}
        <div className="text-center d-sm-none mt-50">
          <Link href="/job-grid-v1" className="btn-six border-0">
            All Categories{' '}
            <Image src={shape_1} alt="shape" className="lazy-img shapes" />
          </Link>
        </div>
      </div>
      <Image src={shape_3} alt="shape" className="lazy-img shapes shape_01" />
    </section>
  );
};

export default CategorySectionTwo;
