'use client';
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

type Props = {
  sourceFile?: string | any;
  isOpen?: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
};

const ViewDocModal: React.FC<Props> = ({
  sourceFile,
  isOpen,
  setIsOpenModal,
}) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        title="View File"
        centered
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <div>
          <p>Tes</p>
        </div>
      </Modal>
    </>
  );
};

export default ViewDocModal;
