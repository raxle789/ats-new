'use client';
import React, { useEffect, useState } from 'react';
import type { UploadProps, FormProps } from 'antd';
import { Upload, Button, message, Spin, Input, Form } from 'antd';
import { MdOutlineModeEdit } from 'react-icons/md';
import { AiOutlineUpload } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import ViewDocModal from '../common/popup/view-doc';
import { fileToBase64 } from '@/libs/Registration/utils';
import { updateCandidateDocuments } from '@/libs/Candidate/actions';
import { Documents } from '@/libs/validations/Documents';
import EmployJobDetailSkeleton from '@/ui/skeleton';

type FieldType = {
  idFile?: string | any;
  idNumber?: string;
  npwp?: string | any;
  npwpNumber?: string;
  kk?: string | any;
  kkNumber?: string;
  latestEducation?: string | any;
  bankAccount?: string | any;
  bankAccountNumber?: string;
  healthCertificate?: string | any;
  mcu?: string | any;
  vaccineCertificate?: string | any;
  uploadCV?: string | any;
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

type CandidateDocuments = {
  identity_info?: {
    bank_account?: string;
    family_number?: string;
    id_card_number?: string;
    tax_number?: string;
  };
  curriculum_vitae?: string;
  curriculum_vitae_name?: string;
  ijazah?: string;
  ijazah_name?: string;
  identity_card?: string;
  identity_card_name?: string;
  tax?: string;
  tax_name?: string;
  family_registration?: string;
  family_registration_name?: string;
  bca_card?: string;
  bca_card_name?: string;
  mcu?: string;
  mcu_name?: string;
  health_certificate?: string; // new
  health_certificate_name?: string; // new
  vaccine_certf?: string;
  vaccine_certf_name?: string;
};

type Props = {
  documentData?: CandidateDocuments | null;
  setDocumentData?: React.Dispatch<any>;
  submitType?: { type: string; counter: number };
  setSubmitType?: React.Dispatch<{ type: string; counter: number }>;
};

const DocumentForm: React.FC<Props> = ({
  documentData,
  setDocumentData,
  submitType,
  setSubmitType,
}) => {
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(false);
  const [initFieldsValue, setInitFieldsValue] = useState<FieldType>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sourceFile, setSourceFile] = useState<string | null | undefined>(null);
  const [spinning, setSpinning] = useState(false);
  const [zodErrors, setZodErrors] = useState<{
    [key: string]: string[];
  } | null>(null);

  const sanitizeNumber = (input: string) => {
    let numericInput = input.replace(/\D/g, '');
    if (numericInput.length > 0 && numericInput[0] === '0') {
      numericInput = '0' + numericInput.slice(1);
    }
    form.setFieldsValue({
      profile: {
        phoneNumber: numericInput,
      },
    });
  };

  const handleView = (documentType: string) => {
    if (documentData) {
      if (documentType === 'id') {
        setSourceFile(documentData.identity_card);
      } else if (documentType === 'cv') {
        setSourceFile(documentData.curriculum_vitae);
      } else if (documentType === 'ijazah') {
        setSourceFile(documentData.ijazah);
      } else if (documentType === 'tax') {
        setSourceFile(documentData.tax);
      } else if (documentType === 'family-card') {
        setSourceFile(documentData.family_registration);
      } else if (documentType === 'bank-account') {
        setSourceFile(documentData.bca_card);
      } else if (documentType === 'health-certificate') {
        // setSourceFile(documentData.)
      } else if (documentType === 'mcu') {
        setSourceFile(documentData.mcu);
      } else if (documentType === 'vaccine') {
        setSourceFile(documentData.vaccine_certf);
      }
    }
    if (sourceFile !== null) {
      setIsOpenModal(true);
    }
  };

  const editOnChange = () => {
    setEditState(!editState);
  };

  const handleSubmit: FormProps<FieldType>['onFinish'] = async () => {
    if (editState) {
      // jalankan simpan data
      // message.loading('Please wait');
      setSpinning(true);
      const values = form.getFieldsValue();
      console.log('submitted values: ', values);
      let submittedValues = JSON.parse(JSON.stringify(values));
      /* ID Card/Passport */
      if (values.idFile) {
        const base64IDFile = await fileToBase64(
          values.idFile.file.originFileObj,
        );
        submittedValues = {
          ...submittedValues,
          idFile: {
            original_name: values.idFile.file.originFileObj.name,
            byte_size: values.idFile.file.originFileObj.size,
            file_base: base64IDFile,
          },
        };
      }
      // debugger;
      /* Bank Account */
      if (values.bankAccount) {
        const base64BankAccount = await fileToBase64(
          values.bankAccount.file.originFileObj,
        );
        submittedValues = {
          ...submittedValues,
          bankAccount: {
            original_name: values.bankAccount.file.originFileObj.name,
            byte_size: values.bankAccount.file.originFileObj.size,
            file_base: base64BankAccount,
          },
        };
      }
      /* MCU */
      if (values.mcu) {
        const base64MCU = await fileToBase64(values.mcu.file.originFileObj);
        submittedValues = {
          ...submittedValues,
          mcu: {
            original_name: values.mcu.file.originFileObj.name,
            byte_size: values.mcu.file.originFileObj.size,
            file_base: base64MCU,
          },
        };
      }
      /* Health Certificate */
      if (values.healthCertificate) {
        const base64HealtCertificate = await fileToBase64(
          values.healthCertificate.file.originFileObj,
        );
        submittedValues = {
          ...submittedValues,
          healthCertificate: {
            original_name: values.healthCertificate.file.originFileObj.name,
            byte_size: values.healthCertificate.file.originFileObj.size,
            file_base: base64HealtCertificate,
          },
        };
      };
      /* MCU */
      if(values.mcu) {
        const base64MCU = await fileToBase64(
          values.mcu.file.originFileObj,
        );
        submittedValues = {
          ...submittedValues,
          mcu: {
            original_name: values.mcu.file.originFileObj.name,
            byte_size: values.mcu.file.originFileObj.size,
            file_base: base64MCU
          }
        };
      };
      /* Kartu Keluarga */
      if (values.kk) {
        const base64KartuKeluarga = await fileToBase64(
          values.kk.file.originFileObj,
        );
        submittedValues = {
          ...submittedValues,
          kk: {
            original_name: values.kk.file.originFileObj.name,
            byte_size: values.kk.file.originFileObj.size,
            file_base: base64KartuKeluarga,
          },
        };
      }
      /* Ijazah */
      if (values.latestEducation) {
        const base64Ijazah = await fileToBase64(
          values.latestEducation.file.originFileObj,
        );
        submittedValues = {
          ...submittedValues,
          latestEducation: {
            original_name: values.latestEducation.file.originFileObj.name,
            byte_size: values.latestEducation.file.originFileObj.size,
            file_base: base64Ijazah,
          },
        };
      }
      /* Tax/NPWP */
      if (values.npwp) {
        const base64Tax = await fileToBase64(values.npwp.file.originFileObj);
        submittedValues = {
          ...submittedValues,
          npwp: {
            original_name: values.npwp.file.originFileObj.name,
            byte_size: values.npwp.file.originFileObj.size,
            file_base: base64Tax,
          },
        };
      }
      /* Curriculum Vitae */
      if (values.uploadCV) {
        const base64CV = await fileToBase64(values.uploadCV.file.originFileObj);
        submittedValues = {
          ...submittedValues,
          uploadCV: {
            original_name: values.uploadCV.file.originFileObj.name,
            byte_size: values.uploadCV.file.originFileObj.size,
            file_base: base64CV,
          },
        };
      }
      /* Vaccine Certf */
      if (values.vaccineCertificate) {
        const base64Vaccine = await fileToBase64(
          values.vaccineCertificate.file.originFileObj,
        );
        submittedValues = {
          ...submittedValues,
          vaccineCertificate: {
            original_name: values.vaccineCertificate.file.originFileObj.name,
            byte_size: values.vaccineCertificate.file.originFileObj.size,
            file_base: base64Vaccine,
          },
        };
      }
      console.info('After add documents \t:', submittedValues);
      const validate = Documents.safeParse(submittedValues);
      if (!validate.success) {
        const zodErrors = validate.error.flatten().fieldErrors;
        console.info('VALIDATE -> ', zodErrors);
        setZodErrors(zodErrors);
        setSpinning(false);
        return message.error('Validation failed!');
      }
      // debugger;
      const updateDocuments = await updateCandidateDocuments(submittedValues);
      if (!updateDocuments.success) {
        setSpinning(false);
        return message.error(updateDocuments.message);
      }
      message.success(updateDocuments.message);
      setSpinning(false);

      if (setSubmitType && setDocumentData && submitType) {
        setDocumentData(null);
        const newSubmitType = {
          ...submitType,
          type: 'document',
          counter: submitType?.counter + 1,
        };
        setSubmitType(newSubmitType);
        setEditState(false);
      }
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

  useEffect(() => {
    console.log('documentData: ', documentData);
    if (documentData && documentData !== null) {
      // let idCardFile: any;
      // let npwpFile: any;
      // let kkFile: any;
      // let idCardFile: any;

      // async function convertIdCard() {
      //   if (documentData?.identity_card && documentData?.identity_card_name) {
      //     idCardFile = await convertBase64ToFile(
      //       documentData.identity_card,
      //       documentData.identity_card_name,
      //     );
      //     console.log('idCardFile: ', idCardFile);
      //     setInitFieldsValue((prevState) => ({
      //       ...prevState,
      //       idFile: idCardFile,
      //     }));
      //   }
      // }

      // convertIdCard();

      // if (idCardFile) {
      //   const idCardFileObject = idCardFile;
      //   console.log('idCardFileObject: ', idCardFileObject);
      // } else {
      //   console.error('ID card file data is missing.');
      // }

      // npwpFile = async () => {
      //   if (documentData?.tax && documentData?.tax_name) {
      //     return await convertBase64ToFile(
      //       documentData.tax as string,
      //       documentData.tax_name as string,
      //     );
      //   }
      // };
      // kkFile = async () => {
      //   if (
      //     documentData?.family_registration &&
      //     documentData?.family_registration_name
      //   ) {
      //     return await convertBase64ToFile(
      //       documentData.family_registration as string,
      //       documentData.family_registration_name as string,
      //     );
      //   }
      // };

      setInitFieldsValue((prevState) => ({
        ...prevState,
        // idFile: idCardFile,
        idNumber: documentData?.identity_info?.id_card_number,
        // npwp: npwpFile,
        npwpNumber: documentData?.identity_info?.tax_number,
        // kk: kkFile,
        kkNumber: documentData?.identity_info?.family_number,
        // latestEducation: documentData?.ijazah,
        // bankAccount: documentData?.bca_card,
        bankAccountNumber: documentData?.identity_info?.bank_account,
        // healthCertificate: '',
        // mcu: documentData?.mcu,
        // vaccineCertificate: documentData?.vaccine_certf,
        // uploadCV: documentData?.curriculum_vitae,
      }));
      // if (idCardFile && npwpFile && kkFile) {
      // }

      // console.log(
      //   'setState - (documents) - initFieldsValue: ',
      //   initFieldsValue,
      // );
    }
  }, [documentData]);

  // useEffect(() => {
  //   console.log('sourceFile sebelum dioper: ', sourceFile);
  // }, [sourceFile]);

  useEffect(() => {
    console.log('useEffect - (documents) - initFieldsValue: ', initFieldsValue);
    form.setFieldsValue(initFieldsValue);
  }, [initFieldsValue]);

  useEffect(() => {
    console.log('zodErrors: ', zodErrors);
  }, [zodErrors]);
  return (
    <>
      {documentData === null && <EmployJobDetailSkeleton rows={2} />}
      {documentData !== null && (
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
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <div className="row">
              <label className="fw-bold sub-section-profile">Documents</label>
              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">ID/Passport Number</label>
                  <Form.Item<FieldType>
                    name="idNumber"
                    className="mb-0"
                    validateStatus={
                      zodErrors && zodErrors?.idNumber ? 'error' : ''
                    }
                    help={zodErrors && zodErrors?.idNumber}
                  >
                    {editState && (
                      <Input
                        placeholder="Your ID/Pasport Number"
                        disabled={!editState}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {documentData?.identity_info?.id_card_number}
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">ID/Passport</label>
                  {editState && (
                    <div>
                      <p className="mb-0">{documentData?.identity_card_name}</p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="idFile"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.idFile ? 'error' : ''
                      }
                      help={zodErrors && zodErrors?.idFile}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                      {/* <div className="row">
                         <div className="col-3">
                         </div>
                         <div className="col-9 ps-4">
                           
                         </div>
                       </div> */}
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('id')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Tax Number</label>
                  <Form.Item<FieldType>
                    name="npwpNumber"
                    className="mb-0"
                    validateStatus={
                      zodErrors && zodErrors?.npwpNumber ? 'error' : ''
                    }
                    help={zodErrors && zodErrors?.npwpNumber}
                  >
                    {editState && (
                      <Input
                        placeholder="Your NPWP Number"
                        disabled={!editState}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {documentData?.identity_info?.tax_number}
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Tax</label>
                  {editState && (
                    <div>
                      <p className="mb-0">{documentData?.tax_name}</p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="npwp"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.npwp ? 'error' : ''
                      }
                      help={zodErrors && zodErrors?.npwp}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('tax')}
                    >
                      View File
                    </Button>
                    // <div className="row">
                    //   <div className="col-3">
                    //   </div>
                    //   <div className="col-9 ps-2">
                    //     <p className="mb-0">{documentData?.tax_name}</p>
                    //   </div>
                    // </div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Family Registration Card Number
                  </label>
                  <Form.Item<FieldType>
                    name="kkNumber"
                    className="mb-0"
                    validateStatus={
                      zodErrors && zodErrors?.kkNumber ? 'error' : ''
                    }
                    help={zodErrors && zodErrors?.kkNumber}
                  >
                    {editState && (
                      <Input
                        placeholder="Your Family Register Number"
                        disabled={!editState}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {documentData?.identity_info?.family_number}
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Family Registration Card</label>
                  {editState && (
                    <div>
                      <p className="mb-0">
                        {documentData?.family_registration_name}
                      </p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="kk"
                      className="mb-0"
                      validateStatus={zodErrors && zodErrors?.kk ? 'error' : ''}
                      help={zodErrors && zodErrors?.kk}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('family-card')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Bank Central Asia (BCA) - Bank Account
                  </label>
                  <Form.Item<FieldType>
                    name="bankAccountNumber"
                    className="mb-0"
                    validateStatus={
                      zodErrors && zodErrors?.bankAccountNumber ? 'error' : ''
                    }
                    help={zodErrors && zodErrors?.bankAccountNumber}
                  >
                    {editState && (
                      <Input
                        placeholder="Your Bank Account Number"
                        disabled={!editState}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {documentData?.identity_info?.bank_account}
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Bank Central Asia (BCA)</label>
                  {editState && (
                    <div>
                      <p className="mb-0">{documentData?.bca_card_name}</p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="bankAccount"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.bankAccount ? 'error' : ''
                      }
                      help={zodErrors && zodErrors?.bankAccount}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('bank-account')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Latest Education Certificate
                  </label>
                  {editState && (
                    <div>
                      <p className="mb-0">{documentData?.ijazah_name}</p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="latestEducation"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.latestEducation ? 'error' : ''
                      }
                      help={zodErrors && zodErrors?.latestEducation}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('ijazah')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Health Certicate</label>
                  {editState && (
                    <div>
                      <p className="mb-0">(Nama File)</p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="healthCertificate"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.healthCertificate ? 'error' : ''
                      }
                      help={zodErrors && zodErrors?.healthCertificate}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('health-certificate')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">MCU Result</label>
                  {editState && (
                    <div>
                      <p className="mb-0">{documentData?.mcu_name}</p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="mcu"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.mcu ? 'error' : ''
                      }
                      help={zodErrors && zodErrors?.mcu}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('mcu')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">COVID Vaccine Certificate</label>
                  {editState && (
                    <div>
                      <p className="mb-0">{documentData?.vaccine_certf_name}</p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="vaccineCertificate"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.vaccineCertificate
                          ? 'error'
                          : ''
                      }
                      help={zodErrors && zodErrors?.vaccineCertificate}
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please upload id/pasport file!',
                      //   },
                      // ]}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('vaccine')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">CV*</label>
                  {editState && (
                    <div>
                      <p className="mb-0">
                        {documentData?.curriculum_vitae_name}
                      </p>
                    </div>
                  )}
                  {editState && (
                    <Form.Item<FieldType>
                      name="uploadCV"
                      className="mb-0"
                      validateStatus={
                        zodErrors && zodErrors?.uploadCV ? 'error' : ''
                      }
                      help={zodErrors && zodErrors?.uploadCV}
                    >
                      <Upload {...props} disabled={!editState}>
                        <Button
                          className="d-flex align-items-center justify-content-center"
                          icon={
                            <AiOutlineUpload style={{ fontSize: '19px' }} />
                          }
                        >
                          Upload File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                  {!editState && (
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      icon={<HiOutlineEye style={{ fontSize: '19px' }} />}
                      onClick={() => handleView('cv')}
                    >
                      View File
                    </Button>
                  )}
                </div>
              </div>

              {editState && (
                <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
                  <button type="submit" className="dash-btn-two tran3s me-3">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </Form>

          <ViewDocModal
            sourceFile={sourceFile}
            isOpen={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />

          <Spin fullscreen spinning={spinning} />
        </div>
      )}
    </>
  );
};

export default DocumentForm;
