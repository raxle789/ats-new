import React, { useEffect, useState } from 'react';
import { Modal, Spin } from 'antd';
import { AiOutlineFileDone } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const DoneRegisterPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [spinning, setSpinning] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    setSpinning(true);
    router.push('/main/jobs');
    setTimeout(() => {
      setSpinning(false);
    }, 500);
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
          <AiOutlineFileDone style={{ fontSize: '50px' }} />
          <p className="mt-2">Register is Completed</p>
        </div>
      </div>

      <Spin fullscreen spinning={spinning} />
    </>
  );
};

export default DoneRegisterPage;
