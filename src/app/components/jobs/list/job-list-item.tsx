'use client';

import { useState } from 'react';
import Pagination from '@/ui/pagination';
import { Spin } from 'antd';
import NiceSelect from '@/ui/nice-select';
import ListItemTwo from './list-item-2';

const JobListItem = ({
  jobVacancyData,
  perPage,
  candidateApplyJobVacancy,
}: any) => {
  const [loading, setLoading] = useState(false);
  // const DynamicPagination = dynamic(() => import('@/ui/pagination'));

  // const buttonRef = useRef({});

  // useEffect(() => {
  //   if (jobVacancyData?.data?.length) {
  //     jobVacancyData?.data?.map((d, index) => {
  //       if (d?.candidateAlreadyApply) {
  //         buttonRef.current[index].disabled = true;
  //       }

  //       buttonRef.current[index].disabled = true;
  //     });
  //   }
  // }, [jobVacancyData?.data, jobVacancyData?.total]);

  // const [filterItems, setFilterItems] = useState([]);

  const [shortValue, setShortValue] = useState('');

  // const [currentItems, setCurrentItems] = useState(null);

  // const [itemOffset, setItemOffset] = useState(0);

  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value);
  };

  //   console.info(jobVacancyData);

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <div className="col-xl-9 col-lg-8">
        {/* <div> */}
        <div className="job-post-item-wrapper ms-xxl-5 ms-xl-3">
          <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
            <div className="total-job-found">
              All{' '}
              <span className="text-dark">{jobVacancyData?.total ?? '0'}</span>{' '}
              jobs found
            </div>
            <div className="d-flex align-items-center">
              <div className="short-filter d-flex align-items-center">
                <div className="text-dark fw-500 me-2">Short:</div>
                <NiceSelect
                  options={[
                    { value: '', label: 'Price Short' },
                    { value: 'price-low-to-high', label: 'low to high' },
                    { value: 'price-high-to-low', label: 'High to low' },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleShort(item)}
                  name="Price Short"
                />
              </div>
            </div>
          </div>
          <div className="accordion-box list-style show">
            {jobVacancyData?.data?.map((data: [], index: number) => (
              <div key={index}>
                <ListItemTwo
                  item={data}
                  setLoading={setLoading}
                  candidateApplyJobVacancy={candidateApplyJobVacancy}
                />
              </div>
            ))}
          </div>

          {/* <div className={`accordion-box grid-style`}> */}
          {/* <div className="row">
            {currentItems &&
              currentItems.map((job) => (
                <div key={job.id} className="col-sm-6 mb-30">
                  <JobGridItem item={job} />
                </div>
              ))}
          </div> */}
          {/* </div> */}
        </div>
        <div>
          <Pagination
            pageRangeDisplayed={3}
            totalData={jobVacancyData?.total}
            disabled={
              !jobVacancyData.data || jobVacancyData?.total <= Number(perPage)
                ? true
                : false
            }
          />
        </div>
      </div>
    </>
  );
};

export default JobListItem;
