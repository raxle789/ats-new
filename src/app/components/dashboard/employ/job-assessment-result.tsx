import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import Link from 'next/link';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'DISC',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'TIU',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'PAPIKOSTIK',
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: 'I-Lead A',
    children: <p>{text}</p>,
  },
];

const JobAssessmentResult = () => {
  return (
    <>
      <div className="d-sm-flex align-items-start justify-content-between mb-10 lg-mb-30">
        <div>
          <h4 className="sub-main-title">Detail Assessment</h4>
        </div>
      </div>

      <div className="bg-white card-box border-20 mb-20">
        <div className="mb-30 d-flex justify-content-end">
          <Link
            href="#"
            className="view-result-btn tran3s"
            style={{ width: '245px' }}
          >
            View Result Assessment
          </Link>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <b>
              <p>Full Name</p>
              <p>Email</p>
              <p>Phone</p>
              <p>Domicile</p>
              <p>Education</p>
              <p>University / School</p>
              <p>Education Major</p>
              <p>Position</p>
              <p>Level</p>
              <p>Source</p>
              <p>Start Test</p>
              <p>End Test</p>
              <p>Status</p>
              <p>Test Name</p>
              <p>Assessment</p>
              <p>Recruiter</p>
            </b>
          </div>
          <div className="col-lg-6">
            <p>Fatkhur Rozak</p>
            <p>oujakdev.rep@gmail.com</p>
            <p>085784464441</p>
            <p>-</p>
            <p>D4</p>
            <p>Jember State Polytechnic</p>
            <p>TEKNIK INFORMATIKA</p>
            <p>Testing Purpose - Assessment and Interview</p>
            <p>1</p>
            <p>database</p>
            <p>22-02-2024 01:00:00</p>
            <p>26-02-2024 23:59:59</p>
            <p>Tidak direkomendasikan</p>
            <p>Psikotes Online - 1</p>
            <p>ATS</p>
            <p>ATS</p>
          </div>
        </div>
        <div>
          <Collapse items={items} defaultActiveKey={['0']} />
        </div>
      </div>

      <div className="bg-white card-box border-20">
        <h5 className="sub-main-title">Review Assessment</h5>
        <br />
        <div className="row">
          <div className="col-lg-4">
            <b>
              <p>Apply for Vacancy</p>
              <p>Assessment User</p>
              <p>Assessment Recommendation</p>
            </b>
          </div>
          <div className="col-lg-6">
            <p>( internship ) Announcer Radio</p>
            <p>Test Assesment</p>
            <p>Data has not been set</p>
          </div>
          <div className="col-lg-12 mb-10">
            <div className="row">
              <div className="col-lg-4">
                <b>
                  <p>Doc 1</p>
                </b>
              </div>
              <div
                className="col-lg-6"
                style={{ width: '300px', height: '200px' }}
              >
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  {/* <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from
                    uploading company data or other banned files.
                  </p> */}
                </Dragger>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mb-10">
            <div className="row">
              <div className="col-lg-4">
                <b>
                  <p>Doc 2</p>
                </b>
              </div>
              <div
                className="col-lg-6"
                style={{ width: '300px', height: '200px' }}
              >
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  {/* <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from
                    uploading company data or other banned files.
                  </p> */}
                </Dragger>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4">
                <b>
                  <p>Doc 3</p>
                </b>
              </div>
              <div
                className="col-lg-6"
                style={{ width: '300px', height: '200px' }}
              >
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  {/* <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from
                    uploading company data or other banned files.
                  </p> */}
                </Dragger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobAssessmentResult;
