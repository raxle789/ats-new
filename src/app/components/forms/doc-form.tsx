'use client';
import React, { useEffect, useState } from 'react';
import type { UploadProps, FormProps } from 'antd';
import { Upload, Button, message, Input, Form } from 'antd';
import { MdOutlineModeEdit } from 'react-icons/md';
import { AiOutlineUpload } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import ViewDocModal from '../common/popup/view-doc';
// import { getCandidateDocuments } from '@/libs/Candidate/retrieve-data';
// import { Document, Page } from 'react-pdf';
// import { StyleSheet } from '@react-pdf/renderer';

type FieldType = {
  idFile?: string;
  idNumber?: string;
  npwp?: string;
  npwpNumber?: string;
  kkNumber?: string;
  kk?: string;
  latestEducation?: string;
  bankAccount?: string;
  bankAccountNumber?: string;
  healthCertificate?: string;
  // bpjsKetenagakerjaan?: string;
  // bpjsKesehatan?: string;
  vaccineCertificate?: string;
  uploadCV?: string;
};

const props: UploadProps = {
  name: 'file',
  action: '',
  maxCount: 1,
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
  const [editState, setEditState] = useState(false);
  const [documentPDF, setDocumentPDF] = useState<string>('');
  const [displayPDF, setDisplayPDF] = useState<File | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  console.info('pdf-file:', displayPDF);

  // const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: 'row',
  //     backgroundColor: '#E4E4E4',
  //   },
  //   section: {
  //     margin: 10,
  //     padding: 10,
  //     flexGrow: 1,
  //   },
  // });

  // const fetchDocumentPDF = async () => {
  //   const stringBase64 = await getCandidateDocuments();
  //   const toReqFile = await fetch(stringBase64.data as string);

  //   const blob = await toReqFile.blob();
  //   console.info('blob: ', blob);
  //   const toFile = new File([blob], 'newFile.pdf', {
  //     type: blob.type,
  //     lastModified: Date.now()
  //   });
  //   setDisplayPDF(toFile);
  //   console.info('new-file: ', toFile);
  // };

  const handleView = () => {
    setIsOpenModal(true);
  };

  const editOnChange = () => {
    setEditState(!editState);
  };
  const handleSubmit: FormProps<FieldType>['onFinish'] = (values) => {
    if (editState) {
      // jalankan simpan data
    }
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

  // useEffect(() => {
  //   fetchDocumentPDF();
  // }, []);
  return (
    <div>
      <div className="mb-25">
        <button
          className="d-flex align-items-center justify-content-center edit-btn-form"
          onClick={editOnChange}
        >
          <MdOutlineModeEdit className="edit-form-icon" />
        </button>
      </div>
      <Form
        name="doc-form"
        variant="filled"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <div className="row">
          <label className="fw-bold sub-section-profile">Documents</label>
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">ID/Passport Number</label>
              <Form.Item<FieldType> name="idNumber" className="mb-0">
                {editState && (
                  <Input
                    placeholder="Your ID/Pasport Number"
                    disabled={!editState}
                  />
                )}
                {!editState && <p className="mb-0">-</p>}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">ID/Passport</label>
              <Form.Item<FieldType> name="idFile" className="mb-0">
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Tax Number</label>
              <Form.Item<FieldType> name="npwpNumber" className="mb-0">
                {editState && (
                  <Input placeholder="Your NPWP Number" disabled={!editState} />
                )}
                {!editState && <p className="mb-0">-</p>}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Tax</label>
              <Form.Item<FieldType> name="npwp" className="mb-0">
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Family Registration Card Number</label>
              <Form.Item<FieldType> name="kkNumber" className="mb-0">
                {editState && (
                  <Input
                    placeholder="Your Family Register Number"
                    disabled={!editState}
                  />
                )}
                {!editState && <p className="mb-0">-</p>}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Family Registration Card</label>
              <Form.Item<FieldType> name="kk" className="mb-0">
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">
                Bank Central Asia (BCA) - Bank Account
              </label>
              <Form.Item<FieldType> name="bankAccountNumber" className="mb-0">
                {editState && (
                  <Input
                    placeholder="Your Bank Account Number"
                    disabled={!editState}
                  />
                )}
                {!editState && <p className="mb-0">-</p>}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Bank Central Asia (BCA)</label>
              <Form.Item<FieldType> name="bankAccount" className="mb-0">
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Latest Education Certificate</label>
              <Form.Item<FieldType> name="latestEducation" className="mb-0">
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Health Certicate/MCU Result</label>
              <Form.Item<FieldType> name="healthCertificate" className="mb-0">
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>
          {/* <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>BPJS Ketenagakerjaan</label>
                <Form.Item<FieldType>
                  name="bpjsKetenagakerjaan"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload id/pasport file!',
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button
                    className="d-flex align-items-center justify-content-center"
                    icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                  >
                    Upload File
                  </Button>
                  </Upload>
                </Form.Item>
              </div>
            </div> */}
          {/* <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>BPJS Kesehatan</label>
                <Form.Item<FieldType>
                  name="bpjsKesehatan"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please upload id/pasport file!',
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button
                    className="d-flex align-items-center justify-content-center"
                    icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                  >
                    Upload File
                  </Button>
                  </Upload>
                </Form.Item>
              </div>
            </div> */}
          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">COVID Vaccine Certificate</label>
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
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group-meta position-relative mb-15">
              <label className="fw-bold">Upload CV*</label>
              <Form.Item<FieldType>
                name="uploadCV"
                className="mb-0"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please upload your cv!',
                //   },
                // ]}
              >
                {editState && (
                  <Upload {...props} disabled={!editState}>
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<AiOutlineUpload style={{ fontSize: '19px' }} />}
                    >
                      Upload File
                    </Button>
                  </Upload>
                )}
                {!editState && (
                  <div className="row">
                    <div className="col-3">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                        onClick={handleView}
                      >
                        View File
                      </Button>
                    </div>
                    <div className="col-9 ps-4">
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  </div>
                )}
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

      <ViewDocModal
        sourceFile={''}
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};

export default DocumentForm;
