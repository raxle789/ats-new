'use client';

import React, { useState } from 'react';
import { Modal, Collapse } from 'antd';
import Link from 'next/link';
import type { RadioChangeEvent, CollapseProps } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'DISC',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'TIU',
    children: <p>{text}</p>,
  },
];

const AssessmentResultModal = ({ isOpenModal, setIsOpenModal, item }) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    console.log('success');
  };
  const onFinishFailed = () => {
    console.log('failed');
  };

  const [interviewType, setInterviewType] = useState('choose');
  const onChangeRadio = (e: RadioChangeEvent) => {
    setInterviewType(e.target.value);
  };

  const [interviewTemplate, setInterviewTemplate] = useState('');
  const handleTemplate = (value: string) => {
    setInterviewTemplate(value);
  };
  return (
    <>
      <Modal
        title="Assessment Result"
        maskClosable={false}
        centered
        open={isOpenModal}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper assessment-result-modal"
      >
        <div className="mt-20">
          <div className="row">
            <div className="col-lg-8"></div>
            <div className="col-lg-4">
              <button className="request-btn tran3s mb-5" type="button">
                Request result
              </button>
            </div>
            <div className="col-lg-3">
              <b>
                <p>Position</p>
                <p>Level</p>
                <p>Start Test</p>
                <p>End Test</p>
                <p>Status</p>
                <p>Test Name</p>
              </b>
            </div>
            <div className="col-lg-6">
              <p>{item?.jobTitle ?? '-'}</p>
              <p>{item?.positionLevel ?? '-'}</p>
              <p>{item?.candidateAssessmentStartDate ?? '-'}</p>
              <p>{item?.candidateAssessmentEndDate ?? '-'}</p>
              <p>{item?.candidateAssessmentStatus ?? '-'}</p>
              <p>{item?.candidateAssessmentTestName ?? '-'}</p>
            </div>
          </div>
          <div>
            <Collapse
              items={
                item?.candidateAssessmentResult?.length
                  ? item?.candidateAssessmentResult?.map((d) => {
                      const newData = {
                        key: d?.category_id,
                        label: d?.name,
                        children: <p>{d?.result}</p>,
                      };

                      return newData;
                    })
                  : []
              }
              defaultActiveKey={['0']}
            />
          </div>
          <div className="mt-30 d-flex align-items-center justify-content-center">
            <Link
              href="#"
              className="view-result-btn tran3s"
              style={{ width: '295px' }}
            >
              Download Assessment Result
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AssessmentResultModal;
