import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';

const ActionCheckboxJob = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        danger
        size="small"
        className="action-checkbox-job-vacancies-btn"
        onClick={showModal}
      >
        <MdDeleteOutline className="action-checkbox-icon" />
      </Button>

      {/* delete modal */}
      <Modal
        title="Delete Job Vacancy"
        open={open}
        centered
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure want to delete Job Vacancy?</p>
      </Modal>
    </>
  );
};

export default ActionCheckboxJob;
