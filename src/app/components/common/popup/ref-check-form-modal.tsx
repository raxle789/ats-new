'use client';
import React, { ReactNode } from 'react';
import { Modal } from 'antd';

type Props = {
  titleModal?: string;
  children?: ReactNode;
  isOpen?: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
};

const RefCheckFormModal: React.FC<Props> = ({
  titleModal,
  children,
  isOpen,
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
        open={isOpen}
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

export default RefCheckFormModal;
