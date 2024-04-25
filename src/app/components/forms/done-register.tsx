import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const DoneRegisterPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    router.push('/main/job');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    showModal();
  }, []);
  return (
    <>
      <Modal
        title="Apply"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you want to apply for a job?</p>
      </Modal>

      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: '100%', height: '350px' }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <FileDoneOutlined style={{ fontSize: '50px' }} />
          <p className="mt-2">Register is Completed</p>
        </div>
      </div>
    </>
  );
};

export default DoneRegisterPage;
