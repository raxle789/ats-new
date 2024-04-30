'use client';

import { useState } from 'react';
import NiceSelect from '@/ui/nice-select';
import ListItemTwo from './list-item-2';

const JobListItem = ({ jobVacancyData }) => {
  const [filterItems, setFilterItems] = useState([]);

  const [shortValue, setShortValue] = useState('');

  const [currentItems, setCurrentItems] = useState(null);

  const [itemOffset, setItemOffset] = useState(0);

  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value);
  };

  //   console.info(jobVacancyData);

  return (
    <div className="col-xl-9 col-lg-8">
      <div className="job-post-item-wrapper ms-xxl-5 ms-xl-3">
        <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
          <div className="total-job-found">
            All <span className="text-dark">{filterItems.length}</span> jobs
            found
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
            {/* <button
              onClick={() => setJobType('list')}
              className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
                    ${jobType === 'grid' ? 'active' : ''}`}
              title="Active List"
            >
              <i className="bi bi-list"></i>
            </button> */}
            {/* <button
              onClick={() => setJobType('grid')}
              className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
                    ${jobType === 'list' ? 'active' : ''}`}
              title="Active Grid"
            >
              <i className="bi bi-grid"></i>
            </button> */}
          </div>
        </div>
        <div className="accordion-box list-style">
          {jobVacancyData &&
            jobVacancyData?.map((data, index) => (
              <ListItemTwo key={index} item={data} />
            ))}
        </div>

        <div className={`accordion-box grid-style`}>
          {/* <div className="row">
            {currentItems &&
              currentItems.map((job) => (
                <div key={job.id} className="col-sm-6 mb-30">
                  <JobGridItem item={job} />
                </div>
              ))}
          </div> */}
        </div>

        {/* {currentItems && (
          <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
            <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
              Showing <span className="text-dark fw-500">{itemOffset + 1}</span>{' '}
              to{' '}
              <span className="text-dark fw-500">
                {Math.min(itemOffset + itemsPerPage, currentItems.length)}
              </span>{' '}
              of <span className="text-dark fw-500">{filterItems.length}</span>
            </p>
            {filterItems.length > itemsPerPage && (
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default JobListItem;
