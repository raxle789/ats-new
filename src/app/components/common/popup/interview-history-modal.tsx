import React from 'react';
import { Modal } from 'antd';
import { Tag, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { AiOutlineRight } from 'react-icons/ai';

// interface IProps {
//   isOpen: boolean;
//   setIsOpenModal: React.Dispatch<boolean>;
// }

const InterviewHistoryModal = ({
  isOpen,
  setIsOpenModal,
  interviewHistoryData,
}) => {
  const treeData: TreeDataNode[] = [
    {
      title: 'Interviewer',
      key: '0',
      children: [
        {
          title: (
            <>
              Mas Vladimir{' '}
              <Tag className="ms-1" color="#1e87f0" style={{ color: 'white' }}>
                Waiting
              </Tag>
            </>
          ),
          key: '0-0',
        },
        {
          title: (
            <>
              Mas Gusti{' '}
              <Tag className="ms-1" color="#29d259" style={{ color: 'white' }}>
                Hire
              </Tag>
            </>
          ),
          key: '0-1',
        },
        {
          title: (
            <>
              Mas Virgi{' '}
              <Tag className="ms-1" color="#ff2730" style={{ color: 'white' }}>
                Reject
              </Tag>
            </>
          ),
          key: '0-2',
        },
        {
          title: (
            <>
              Sharon{' '}
              <Tag className="ms-1" color="#f0f000" style={{ color: 'white' }}>
                Keep in View
              </Tag>
            </>
          ),
          key: '0-3',
        },
        {
          title: (
            <>
              Kak Tina{' '}
              <Tag className="ms-1" color="#1e87f0" style={{ color: 'white' }}>
                Reschedule
              </Tag>
            </>
          ),
          key: '0-4',
        },
      ],
    },
  ];

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <>
      <Modal
        title="Interview History Candidate"
        maskClosable={false}
        centered
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={550}
        wrapClassName="custom-modal-wrapper"
      >
        <div className="overflow-hidden mt-3">
          {/* <div className="row">
            <p className="col-lg-6 text-start mb-0">(Interview Title)</p>
            <p className="col-lg-6 text-end mb-0">Mon, 08 Apr 2024</p>
            <Tree
              showLine
              switcherIcon={<AiOutlineRight />}
              // defaultExpandedKeys={['0-0']}
              onSelect={onSelect}
              treeData={treeData}
            />
          </div> */}
          {interviewHistoryData?.length &&
            interviewHistoryData?.map((item, index) => (
              <div className="row" key={index}>
                <p className="col-lg-6 text-start mb-0">{`(${item?.title ?? '-'})`}</p>
                <p className="col-lg-6 text-end mb-0">
                  {item?.dateTime ?? '-'}
                </p>
                <Tree
                  showLine
                  switcherIcon={<AiOutlineRight />}
                  // defaultExpandedKeys={['0-0']}
                  onSelect={onSelect}
                  treeData={[
                    {
                      title: 'Interviewer',
                      key: '0',
                      children: item?.interviewInterviewers?.map(
                        (interviewInterviewer, index) => {
                          return {
                            title: (
                              <>
                                {interviewInterviewer?.interviewerName ?? '-'}
                                <Tag
                                  className="ms-1"
                                  color="#29d259"
                                  style={{ color: 'white' }}
                                >
                                  {interviewInterviewer?.interviewResult ??
                                    'Waiting'}
                                </Tag>
                              </>
                            ),
                          };
                        },
                      ),
                    },
                  ]}
                />
              </div>
            ))}
          {/* <div className="row">
            <p className="col-lg-6 text-start mb-0">(Interview Title)</p>
            <p className="col-lg-6 text-end mb-0">Mon, 08 Apr 2024</p>
            <Tree
              showLine
              switcherIcon={<AiOutlineRight />}
              // defaultExpandedKeys={['0-0']}
              onSelect={onSelect}
              treeData={treeData}
            />
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default InterviewHistoryModal;
