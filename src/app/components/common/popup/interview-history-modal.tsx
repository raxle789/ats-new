import React from 'react';
import { Modal } from 'antd';
import { Tag, Tree } from 'antd';
import type { TreeProps } from 'antd';
// import { AiOutlineRight } from 'react-icons/ai';
import { DownOutlined } from '@ant-design/icons';

type Props = {
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
  interviewHistoryData?: {} | any;
};

const InterviewHistoryModal: React.FC<Props> = ({
  isOpen,
  setIsOpenModal,
  interviewHistoryData,
}) => {
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
        centered
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={550}
        wrapClassName="custom-modal-wrapper"
      >
        <div className="overflow-hidden mt-3">
          {interviewHistoryData?.length &&
            interviewHistoryData?.map((item: {} | any, index: number) => (
              <div className="row" key={index}>
                <p className="col-lg-6 text-start mb-0">{`(${item?.title ?? '-'})`}</p>
                <p className="col-lg-6 text-end mb-0">
                  {item?.dateTime ?? '-'}
                </p>
                <Tree
                  showLine
                  switcherIcon={
                    <DownOutlined
                      onPointerEnterCapture={''}
                      onPointerLeaveCapture={''}
                    />
                  }
                  onSelect={onSelect}
                  treeData={[
                    {
                      title: 'Interviewer',
                      key: '0',
                      children: item?.interviewInterviewers?.map(
                        (interviewInterviewer: any, _: number) => {
                          return {
                            title: (
                              <>
                                {interviewInterviewer?.interviewerName ?? '-'}
                                {!interviewInterviewer?.interviewResult && (
                                  <Tag
                                    className="ms-1"
                                    color="#1e87f0"
                                    style={{ color: 'white' }}
                                  >
                                    Waiting
                                  </Tag>
                                )}
                                {interviewInterviewer?.interviewResult ===
                                  'Hire' && (
                                  <Tag
                                    className="ms-1"
                                    color="#29d259"
                                    style={{ color: 'white' }}
                                  >
                                    Hire
                                  </Tag>
                                )}
                                {interviewInterviewer?.interviewResult ===
                                  'Reject' && (
                                  <Tag
                                    className="ms-1"
                                    color="#ff2730"
                                    style={{ color: 'white' }}
                                  >
                                    Reject
                                  </Tag>
                                )}
                                {interviewInterviewer?.interviewResult ===
                                  'Keep In View' && (
                                  <Tag
                                    className="ms-1"
                                    color="#f0f000"
                                    style={{ color: 'white' }}
                                  >
                                    Keep in View
                                  </Tag>
                                )}
                                {interviewInterviewer?.interviewResult ===
                                  'Reschedule' && (
                                  <Tag
                                    className="ms-1"
                                    color="#1e87f0"
                                    style={{ color: 'white' }}
                                  >
                                    Reschedule
                                  </Tag>
                                )}
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
        </div>
      </Modal>
    </>
  );
};

export default InterviewHistoryModal;
