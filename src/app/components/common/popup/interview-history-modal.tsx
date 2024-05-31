import React from 'react';
// import { DownOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
// import type { TreeDataNode, TreeProps } from 'antd';
// import type { MenuProps } from 'antd';
// import type { CollapseProps } from 'antd';
// import type { TableProps } from 'antd';
// import Pagination from '@/ui/pagination';
// import { MentionProps } from 'antd';

interface IProps {
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
}

const InterviewHistoryModal: React.FC<IProps> = ({
  isOpen,
  setIsOpenModal,
}) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };

  // const [current, setCurrent] = useState('profile');
  // const onClickHandle: MenuProps['onClick'] = (e) => {
  //   setCurrent(e.key);
  // };

  // const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info);
  // };
  return (
    <>
      <Modal
        title="Interview History Candidate"
        centered
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
        wrapClassName="custom-modal-wrapper"
      >
        <div>
          <div className="d-flex justify-content-center align-items-center flex-column overflow-x-hidden mt-3">
            <p className="text-center mb-0">Mon, 08/04/2024</p>
            <div className="row">
              <p className="col-lg-6 text-start mb-0">
                Lorem ipsum dolor sit amet
              </p>
              <p className="col-lg-6 text-end mb-0">10.00</p>
              <p className="col-lg-6 text-start mb-0">
                Lorem ipsum dolor sit amet
              </p>
              <p className="col-lg-6 text-end mb-0">09.00</p>
              <p className="col-lg-6 text-start mb-0">
                Lorem ipsum dolor sit amet
              </p>
              <p className="col-lg-6 text-end mb-0">08.00</p>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column overflow-x-hidden mt-3">
            <p className="text-center mb-0">Sun, 07/04/2024</p>
            <div className="row">
              <p className="col-lg-6 text-start mb-0">
                Lorem ipsum dolor sit amet
              </p>
              <p className="col-lg-6 text-end mb-0">14.00</p>
              <p className="col-lg-6 text-start mb-0">
                Lorem ipsum dolor sit amet
              </p>
              <p className="col-lg-6 text-end mb-0">12.00</p>
              <p className="col-lg-6 text-start mb-0">
                Lorem ipsum dolor sit amet
              </p>
              <p className="col-lg-6 text-end mb-0">09.00</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InterviewHistoryModal;
