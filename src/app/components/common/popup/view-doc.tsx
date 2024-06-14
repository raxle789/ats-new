'use client';
import React, { useEffect } from 'react';
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

  useEffect(() => {
    console.log('sources file: ', sourceFile);
  }, [sourceFile]);
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
        {sourceFile && (
          <div style={{ height: '95%' }}>
            <embed
              title="document"
              type="application/pdf"
              src={sourceFile}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default ViewDocModal;
