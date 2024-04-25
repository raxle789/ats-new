import React from 'react';
import type { UploadProps, FormProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message, Input, Form } from 'antd';

type FieldType = {
  idFile?: string;
  idNumber?: string;
  npwp?: string;
  npwpNumber?: string;
  kk?: string;
  latestEducation?: string;
  bankAccount?: string;
  bankAccountNumber?: string;
  healthCertificate?: string;
  bpjsKetenagakerjaan?: string;
  bpjsKesehatan?: string;
  vaccineCertificate?: string;
};

const props: UploadProps = {
  name: 'file',
  action: '',
  headers: {
    authorization: 'authorization-text',
  },
  listType: 'picture',
  accept: '.pdf',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const DocumentForm = () => {
  const handleSubmit: FormProps<FieldType>['onFinish'] = (values) => {
    // jalankan modal sebelum simpan data
    // showModal();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
      const errorMessage = errorInfo.errorFields
        .map((field) => field.errors.join(', '))
        .join('; ');
      message.error(`Failed: ${errorMessage}`);
    }
  };
  return (
    <>
      <h2 className="main-title">Document</h2>

      <div className="bg-white card-box border-20">
        <Form
          name="doc-form"
          variant="filled"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>ID/Pasport</label>
                <Form.Item<FieldType>
                  name="idFile"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>NO ID/Pasport</label>
                <Form.Item<FieldType>
                  name="idNumber"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Input placeholder="Your ID/Pasport Number" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>NPWP</label>
                <Form.Item<FieldType>
                  name="npwp"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>NO NPWP</label>
                <Form.Item<FieldType>
                  name="npwpNumber"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Input placeholder="Your NPWP Number" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Family Record</label>
                <Form.Item<FieldType>
                  name="kk"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Latest Education Certificate</label>
                <Form.Item<FieldType>
                  name="latestEducation"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Bank Account (BCA)</label>
                <Form.Item<FieldType>
                  name="bankAccount"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Bank Account Number</label>
                <Form.Item<FieldType>
                  name="bankAccountNumber"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Input placeholder="Your Bank Account Number" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Health Certicate/MCU Result</label>
                <Form.Item<FieldType>
                  name="healthCertificate"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>BPJS Ketenagakerjaan</label>
                <Form.Item<FieldType>
                  name="bpjsKetenagakerjaan"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>BPJS Kesehatan</label>
                <Form.Item<FieldType>
                  name="bpjsKesehatan"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Vaccine Certificate</label>
                <Form.Item<FieldType>
                  name="vaccineCertificate"
                  className="mb-0"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload id/pasport file!',
                  //   },
                  // ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
              <button type="submit" className="dash-btn-two tran3s me-3">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default DocumentForm;
