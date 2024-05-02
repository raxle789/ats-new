import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { MdOutlineAssignment } from 'react-icons/md';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { RiDoorOpenLine } from 'react-icons/ri';
import { GrDocumentText } from 'react-icons/gr';

const ActionCheckboxPipeline = () => {
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
      <Tooltip placement="top" title="Assign to Assessment" arrow={true}>
        <Button
          type="primary"
          size="small"
          className="action-checkbox-btn me-2"
          onClick={showModal}
          // style={{ background: 'yellow' }}
        >
          <MdOutlineAssignment className="action-checkbox-icon" />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Assign to Interview" arrow={true}>
        <Button
          type="primary"
          size="small"
          className="action-checkbox-btn me-2"
          // onClick={showModal}
        >
          <GoPeople className="action-checkbox-icon" />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Assign to Ref Check" arrow={true}>
        <Button
          type="primary"
          size="small"
          className="action-checkbox-btn me-2"
          // onClick={showModal}
        >
          <MdOutlinePersonSearch className="action-checkbox-icon" />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Assign to Offering" arrow={true}>
        <Button
          type="primary"
          size="small"
          className="action-checkbox-btn me-2"
          // onClick={showModal}
        >
          <GrDocumentText className="action-checkbox-icon" />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Assign to MCU" arrow={true}>
        <Button
          type="primary"
          size="small"
          className="action-checkbox-btn me-2"
          // onClick={showModal}
        >
          <MdOutlineHealthAndSafety className="action-checkbox-icon" />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Assign to Agreement" arrow={true}>
        <Button
          type="primary"
          size="small"
          className="action-checkbox-btn me-2"
          // onClick={showModal}
        >
          <IoMdCheckmarkCircleOutline className="action-checkbox-icon" />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Assign to Boarding" arrow={true}>
        <Button
          type="primary"
          size="small"
          className="action-checkbox-btn"
          // onClick={showModal}
        >
          <RiDoorOpenLine className="action-checkbox-icon" />
        </Button>
      </Tooltip>

      {/* assessment modal */}
      <Modal
        title="Assessment Confirmation"
        open={open}
        centered
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure want to assess these candidates?</p>
      </Modal>
    </>
  );
};

export default ActionCheckboxPipeline;
