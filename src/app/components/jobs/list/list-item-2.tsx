'use client';

import React from 'react';
import Image from 'next/image';
import ApplyModal from '../../common/popup/apply-modal';
import Link from 'next/link';
import { IJobType } from '@/types/job-data-type';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { add_to_wishlist } from '@/redux/features/wishlist';

const ListItemTwo = ({ item }) => {
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const isActive = wishlist.some((p) => p.id === item.id);
  const dispatch = useAppDispatch();
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    dispatch(add_to_wishlist(item));
  };

  console.info(item);
  return (
    <div className="job-list-one style-two position-relative border-style mb-20">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-6">
          <div className="job-title d-flex align-items-center">
            {/* <Link href={`/main/job/${item.id}`} className="logo">
              <Image src={item.logo} alt="logo" className="lazy-img m-auto" />
            </Link> */}
            <div className="split-box1">
              <Link href={`/main/job`} className="title fw-500 tran3s">
                {item?.jobTitleAlias ? item?.jobTitleAlias?.slice(0, 30) : '-'}{' '}
                {item?.jobTitleAlias?.length > 30 ? '..' : ''}
              </Link>
              <p
                // href={`/main/job/${item.id}`}
                className="job-duration fw-500 m-0"
              >
                {item?.positionLevelName ?? '-'} -{' '}
                {item?.jobFunctionName ?? '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="job-location">
            <p className="place">{item?.workLocation ?? '-'}</p>
            <p>{item?.publishedDate ?? '-'}</p>
          </div>
          {/* <div className="job-salary">
            <span className="fw-500 text-dark">${item.salary}</span> /{' '}
            {item.salary_duration} . {item.experience}
          </div> */}
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
            <a
              onClick={() => handleAddWishlist(item)}
              className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${isActive ? 'active' : ''}`}
              title={`${isActive ? 'Remove Job' : 'Save Job'}`}
            >
              <i className="bi bi-bookmark-dash"></i>
            </a>
            <Link
              href={`/main/job/${item.id}`}
              className="apply-btn text-center tran3s"
              data-bs-toggle="modal"
              data-bs-target="#applyModal"
            >
              APPLY
            </Link>
          </div>
        </div>
      </div>

      {/* Apply Modal Start */}
      <ApplyModal />
      {/* Apply Modal End */}
    </div>
  );
};

export default ListItemTwo;
