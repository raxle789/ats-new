import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree, Modal, Menu, Collapse } from 'antd';
import type { MenuProps } from 'antd';
import type { CollapseProps } from 'antd';
import CandidateRefCheckForm from '../../dashboard/employ/candidate-ref-check-form';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const assessmentItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Assessment 1',
    children: (
      <div className="row">
        <p className="col-lg-12 mb-1">Psikotes Online - 1</p>
        <p className="col-lg-5 mt-0 mb-0">Start Test: 22-02-2024 01:00:00</p>
        <p className="col-lg-5 mt-0 mb-0">End Test: 26-02-2024 23:59:59</p>
      </div>
    ),
  },
  {
    key: '2',
    label: 'Assessment 2',
    children: (
      <div className="row">
        <p className="col-lg-12 mb-1">Psikotes Offline - 2</p>
        <p className="col-lg-5 mt-0 mb-0">Start Test: 22-02-2024 01:00:00</p>
        <p className="col-lg-5 mt-0 mb-0">End Test: 26-02-2024 23:59:59</p>
      </div>
    ),
  },
  {
    key: '3',
    label: 'Assessment 3',
    children: (
      <div className="row">
        <p className="col-lg-12 mb-1">Psikotes Offline - 3</p>
        <p className="col-lg-5 mt-0 mb-0">Start Test: 22-02-2024 01:00:00</p>
        <p className="col-lg-5 mt-0 mb-0">End Test: 26-02-2024 23:59:59</p>
      </div>
    ),
  },
];

const interviewItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Interview 1',
    children: (
      <div className="row">
        <p className="col-lg-12 mb-1">Interview Title 1</p>
        <p className="col-lg-12 mt-0 mb-0">Date & Time: 22-02-2024 01:00:00</p>
        <p className="col-lg-12 mt-0 mb-0">
          Interviewer name: Daniela Sulistio, Fathur Rozak, Abdullah Al Fatih
        </p>
        <p className="col-lg-12 mt-0 mb-0">
          Link/Place of interview: Erajaya Gedong Panjang
        </p>
      </div>
    ),
  },
  {
    key: '2',
    label: 'Interview 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'Interview 3',
    children: <p>{text}</p>,
  },
];

const items: MenuProps['items'] = [
  {
    label: 'Assessment',
    key: 'assessment',
  },
  {
    label: 'Interview',
    key: 'interview',
  },
  {
    label: 'Ref Check',
    key: 'ref check',
  },
  {
    label: 'Offering',
    key: 'offering',
  },
  {
    label: 'MCU',
    key: 'mcu',
  },
  {
    label: 'Agreement',
    key: 'agreement',
  },
  {
    label: 'Boarding',
    key: 'boarding',
  },
];

interface IProps {
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
}

const JobPipelineModal: React.FC<IProps> = ({ isOpen, setIsOpenModal }) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const [current, setCurrent] = useState('assessment');
  const onClickHandle: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const onChangeAssessment = (key: string | string[]) => {
    console.log(key);
  };
  const onChangeInterview = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <>
      <Modal
        title="Applied Job Details"
        centered
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <Menu
          onClick={onClickHandle}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {current === 'assessment' && (
          <div className="mt-3">
            <Collapse
              items={assessmentItems}
              defaultActiveKey={['1']}
              onChange={onChangeAssessment}
            />
          </div>
        )}
        {current === 'interview' && (
          <div className="mt-3">
            <Collapse
              items={interviewItems}
              defaultActiveKey={['1']}
              onChange={onChangeInterview}
            />
          </div>
        )}
        {current === 'ref check' && (
          <div className="mt-3">
            <CandidateRefCheckForm />
          </div>
        )}
      </Modal>
    </>
  );
};

export default JobPipelineModal;
