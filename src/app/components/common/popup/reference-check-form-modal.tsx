'use client';

import React, { ReactNode } from 'react';
// import ReferenceCheckFormItem from '../../tab-items/reference-check-form-item';
// import dynamic from 'next/dynamic';
// import ReferenceCheckResultItem from '../../tab-items/reference-check-result-form-item';
// import RefereeFormItem from '../../tab-items/referee-form-item';
import { Modal } from 'antd';

// const { TabPane } = Tabs;

// const ReferenceCheckResultItem = dynamic(
//   () => import('../../tab-items/reference-check-result-item'),
// );

// const RefereeFormItem = dynamic(
//   () => import('../../tab-items/referee-form-item'),
// );

type Props = {
  titleModal?: string;
  children?: ReactNode;
  isOpenModal?: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
};

const ReferenceCheckFormModal: React.FC<Props> = ({
  titleModal,
  children,
  isOpenModal,
  setIsOpenModal,
}) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        title={titleModal}
        centered
        open={isOpenModal}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <div className="mt-3 overflow-x-hidden mb-5">{children}</div>
      </Modal>
    </>
  );
};

export default ReferenceCheckFormModal;
