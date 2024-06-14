import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree, Modal, Menu, Collapse } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import type { MenuProps } from 'antd';
import type { CollapseProps } from 'antd';
import type { TableProps } from 'antd';
import Pagination from '@/ui/pagination';
// import { MentionProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'History',
    key: '0-0',
    children: [
      {
        title: 'Assessment',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'Interview',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
          {
            title: 'leaf',
            key: '0-0-1-1',
          },
          {
            title: 'leaf',
            key: '0-0-1-2',
          },
        ],
      },
      {
        title: 'Ref-Check',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
        ],
      },
      {
        title: 'Offering',
        key: '0-0-3',
        children: [
          {
            title: 'leaf',
            key: '0-0-3-0',
          },
          {
            title: 'leaf',
            key: '0-0-3-1',
          },
        ],
      },
      {
        title: 'MCU',
        key: '0-0-4',
        children: [
          {
            title: 'leaf',
            key: '0-0-4-0',
          },
        ],
      },
      {
        title: 'Agreement',
        key: '0-0-5',
        children: [
          {
            title: 'leaf',
            key: '0-0-5-0',
          },
          {
            title: 'leaf',
            key: '0-0-5-1',
          },
        ],
      },
      {
        title: 'Boarding',
        key: '0-0-6',
        children: [
          {
            title: 'leaf',
            key: '0-0-6-0',
          },
          {
            title: 'leaf',
            key: '0-0-6-1',
          },
        ],
      },
    ],
  },
];

interface DataType {
  key: string;
  title: string;
  applyDate: string;
  status: string;
}

// const data: DataType[] = [
//   {
//     key: '1',
//     title: 'Merchandising and Planning Assistant Manager',
//     applyDate: '22-04-2023',
//     status: 'Assessment',
//   },
//   {
//     key: '2',
//     title: 'Project Assistant Manager',
//     applyDate: '22-04-2023',
//     status: 'Interview',
//   },
//   {
//     key: '3',
//     title: 'Operation Development Assistant Manager',
//     applyDate: '22-04-2023',
//     status: 'Offering',
//   },
// ];

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const profileItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Main Profile',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'Address Information',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'Education History',
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: 'Language Abilities',
    children: <p>{text}</p>,
  },
  {
    key: '5',
    label: 'Work Experience',
    children: <p>{text}</p>,
  },
  {
    key: '6',
    label: 'Family Structure',
    children: <p>{text}</p>,
  },
  {
    key: '7',
    label: 'Main Family',
    children: <p>{text}</p>,
  },
  {
    key: '8',
    label: 'Additional Information',
    children: <p>{text}</p>,
  },
];

const documentItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Personal Information',
    children: <p>{text}</p>,
  },
];

const items: MenuProps['items'] = [
  {
    label: 'Profile',
    key: 'profile',
  },
  {
    label: 'Document',
    key: 'document',
  },
  {
    label: 'Applicant History',
    key: 'applicantHistory',
  },
  {
    label: 'Candidate History',
    key: 'candidateHistory',
  },
];

interface IProps {
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
}

const CandidateDetailsModal: React.FC<IProps> = ({
  isOpen,
  setIsOpenModal,
}) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const [current, setCurrent] = useState('profile');
  const onClickHandle: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <span>
          <a>{text}</a>
        </span>
      ),
    },
    {
      title: 'Apply Date',
      dataIndex: 'applyDate',
      key: 'applyDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // const tableProps: TableProps<DataType> = {
  //   columns,
  //   dataSource: data,
  //   pagination: false,
  //   rowClassName: () => 'ant-table-tbody no-hover-effect',
  // };
  return (
    <>
      <Modal
        title="Candidate Details"
        centered
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <Menu
          onClick={onClickHandle}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {current === 'profile' && (
          <div className="mt-3">
            <Collapse items={profileItems} defaultActiveKey={['1']} />
          </div>
        )}
        {current === 'document' && (
          <div className="mt-3">
            <Collapse items={documentItems} defaultActiveKey={['1']} />
          </div>
        )}
        {current === 'applicantHistory' && (
          <div className="mt-3 overflow-hidden">
            {/* <Table {...tableProps} /> */}
            <table className="table w-100 mb-25">
              <thead>
                <tr>
                  <th scope="col" style={{ backgroundColor: '#f6f6f6' }}>
                    Title
                  </th>
                  <th scope="col" style={{ backgroundColor: '#f6f6f6' }}>
                    Apply Date
                  </th>
                  <th scope="col" style={{ backgroundColor: '#f6f6f6' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      Merchandising and Planning Assistant Manager
                      <Tree
                        showLine
                        switcherIcon={
                          <DownOutlined
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                          />
                        }
                        defaultExpandedKeys={['0']}
                        onSelect={onSelect}
                        treeData={treeData}
                      />
                    </div>
                  </td>
                  <td>22-04-2023</td>
                  <td>Assessment</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      Project Assistant Manager
                      <Tree
                        showLine
                        switcherIcon={
                          <DownOutlined
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                          />
                        }
                        defaultExpandedKeys={['0']}
                        onSelect={onSelect}
                        treeData={treeData}
                      />
                    </div>
                  </td>
                  <td>22-04-2023</td>
                  <td>Interview</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      Operation Development Assistant Manager
                      <Tree
                        showLine
                        switcherIcon={
                          <DownOutlined
                            onPointerEnterCapture=""
                            onPointerLeaveCapture=""
                          />
                        }
                        defaultExpandedKeys={['0']}
                        onSelect={onSelect}
                        treeData={treeData}
                      />
                    </div>
                  </td>
                  <td>22-04-2023</td>
                  <td>Offering</td>
                </tr>
              </tbody>
            </table>
            <Pagination
              pageRangeDisplayed={1}
              totalData={20}
              disabled={false}
            />
          </div>
        )}
        {current === 'candidateHistory' && (
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
        )}
      </Modal>
    </>
  );
};

export default CandidateDetailsModal;
