'use client';

import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  Cascader,
  Spin,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
  Checkbox,
  Col,
  Row,
  Slider,
  Radio,
  Button,
  notification,
  Modal,
} from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ApplyModal from '../../common/popup/apply-modal';
import Link from 'next/link';
import { IJobType } from '@/types/job-data-type';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { add_to_wishlist } from '@/redux/features/wishlist';

const { confirm } = Modal;

const ListItemTwo = ({ item, setLoading, candidateApplyJobVacancy }) => {
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const { wishlist } = useAppSelector((state) => state.wishlist);

  const isActive = wishlist.some((p) => p.id === item.id);

  const dispatch = useAppDispatch();
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    dispatch(add_to_wishlist(item));
  };

  function handleCandidateApplyJobVacancy(jobId) {
    // setLoading(true);

    // confirm({
    //   title: 'Do you want to create new job parameter?',
    //   icon: <ExclamationCircleFilled />,
    //   centered: true,
    //   content:
    //     'When clicked the OK button, this dialog will be closed after 1 second',
    //   onOk() {
    //     return new Promise<void>((resolve, reject) => {
    //       setTimeout(() => {
    //         api.success({
    //           message: 'Notification',
    //           description: <p>Successfully Create New Job Parameter</p>,
    //           placement: 'topRight',
    //         });
    //         // console.info(values);
    //         candidateApplyJobVacancy(jobId)
    //           .then(() => {
    //             setLoading(false);

    //             router.refresh();
    //           })
    //           .catch((e: string) => {
    //             console.log('Error apply job vacancy: ', e);

    //             setLoading(false);
    //           });
    //         // router.replace('/dashboard/ta/parameter');
    //         resolve();
    //       }, 2000);
    //     }).catch(() => console.log('Oops errors!'));
    //   },
    //   onCancel() {
    //     setLoading(false);

    //     router.refresh();
    //   },
    // });
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        api.success({
          message: 'Notification',
          description: <p>Successfully Create New Job Parameter</p>,
          placement: 'topRight',
        });
        // console.info(values);
        candidateApplyJobVacancy(jobId)
          .then(() => {
            setLoading(false);

            router.refresh();
          })
          .catch((e: string) => {
            console.log('Error apply job vacancy: ', e);

            setLoading(false);
          });
        // router.replace('/dashboard/ta/parameter');
        resolve();
      }, 4000);
    }).catch(() => console.log('Oops errors!'));
  }

  return (
    <>
      {contextHolder}
      <div className="job-list-one style-two position-relative border-style mb-20">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6">
            <div className="job-title d-flex align-items-center">
              <div className="split-box1">
                <Link
                  href={`/main/jobs/${item?.jobId}`}
                  className="title fw-500 tran3s"
                >
                  {item?.jobTitleAlias
                    ? item?.jobTitleAlias?.slice(0, 30)
                    : '-'}{' '}
                  {item?.jobTitleAlias?.length > 30 ? '..' : ''}
                </Link>
                <p className="job-duration fw-500 m-0">
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
              <Form
                name={`candidateApplyJobVacancyForm${item?.jobId}`}
                layout="vertical"
                variant="filled"
                className="mt-20"
              >
                <Form.Item
                  name="candidateApplyBtn"
                  className="d-flex align-items-center"
                >
                  <Button
                    htmlType="button"
                    disabled={item?.candidateAlreadyApply}
                    className="apply-btn tran3s d-flex align-items-center justify-content-center"
                    onClick={() => handleCandidateApplyJobVacancy(item?.jobId)}
                  >
                    {item?.candidateAlreadyApply ? 'Applied' : 'Apply'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        {/* Apply Modal Start */}
        <ApplyModal />
        {/* Apply Modal End */}
      </div>
    </>
  );
};

export default ListItemTwo;
