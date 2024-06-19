import React, { useRef, useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Checkbox,
  Tooltip,
  message,
  Radio,
  Upload,
} from 'antd';
import type {
  CheckboxProps,
  FormProps,
  InputNumberProps,
  RadioChangeEvent,
  UploadProps,
} from 'antd';
import InterviewHistoryModal from '../../common/popup/interview-history-modal';
import SignatureCanvas from 'react-signature-canvas';
import { AiOutlineUpload } from 'react-icons/ai';

const { TextArea } = Input;

type FieldType = {
  basicSalaryPackage?: number;
  annualBasicSalaryPackage?: number;
  tunjanganTransportasiPackage?: number;
  annualTunjanganTransportasiPackage?: number;
  thrPackage?: number;
  annualThrPackage?: number;
  performanceBonusPackage?: number;
  annualPerformanceBonusPackage?: number;
  packageAddition?: {
    [id: string]: {
      labelName: string;
      monthlyNumber: number;
      annualNumber: number;
    };
  };
  basicSalaryScheme?: number;
  annualBasicSalaryScheme?: number;
  tunjanganTransportasiScheme?: number;
  annualTunjanganTransportasiScheme?: number;
  thrScheme?: number;
  annualThrScheme?: number;
  performanceBonusScheme?: number;
  annualPerformanceBonusScheme?: number;
  schemeAddition?: {
    [id: string]: {
      labelName: string;
      monthlyNumber: number;
      annualNumber: number;
    };
  };
  level?: string;
  grade?: string;
  contactPeriod?: string;
  signatory?: string;
  hrbp?: string;
  management?: string;
  startWorking?: string;
  fpk?: string;
  superior?: string;
  probationNote?: string;
  probationCheckbox?: boolean;
  approveValue?: string;
  suggestSalary?: string;
  uploadESign?: string | any;
};

type currentPackage = {
  monthlyBasicSalary?: number;
  monthlyTunjTransportasi?: number;
  annualBasicSalary?: number;
  annualTunjTransportasi?: number;
  annualThr?: number;
  annualPerformanceBonus?: number;
  packageAddition?: {
    [id: string]: {
      labelName?: string;
      monthlyAddition?: number;
      annualAddition?: number;
    };
  };
};

type schemeOffer = {
  monthlyBasicSalary?: number;
  monthlyTunjTransportasi?: number;
  annualBasicSalary?: number;
  annualTunjTransportasi?: number;
  annualThr?: number;
  annualPerformanceBonus?: number;
  incrementNote?: string;
  schemeAddition?: {
    [id: string]: {
      labelName?: string;
      monthlyAddition?: number;
      annualAddition?: number;
    };
  };
};

const uploadProps: UploadProps = {
  name: 'file',
  action: '',
  maxCount: 1,
  headers: {
    authorization: 'authorization-text',
  },
  listType: 'picture',
  // defaultFileList: [
  //   {

  //   }
  // ],
  accept: 'image/*',
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

const ApprovalOfferingUser = () => {
  // UseState
  const [form] = Form.useForm();
  const [currentPackage, setCurrentPackage] = useState<currentPackage>({
    monthlyBasicSalary: 0,
    monthlyTunjTransportasi: 0,
    annualBasicSalary: 0,
    annualTunjTransportasi: 0,
    annualThr: 0,
    annualPerformanceBonus: 0,
  });
  const [schemeOffer, setSchemeOffer] = useState<schemeOffer>({
    monthlyBasicSalary: 0,
    monthlyTunjTransportasi: 0,
    annualBasicSalary: 0,
    annualTunjTransportasi: 0,
    annualThr: 0,
    annualPerformanceBonus: 0,
    incrementNote: '',
  });
  const [labelNames, setLabelNames] = useState<any>({});
  const [rightLabelNames, setRightLabelNames] = useState<any>({});
  const [leftRowTotal, setLeftRowTotal] = useState(0);
  const [rightRowTotal, setRightRowTotal] = useState(0);
  const [monthlyTotalLeft, setMonthlyTotalLeft] = useState(0);
  const [annualTotalLeft, setAnnualTotalLeft] = useState(0);
  const [monthlyTotalRight, setMonthlyTotalRight] = useState(0);
  const [annualTotalRight, setAnnualTotalRight] = useState(0);
  // const [multiPerformanceBonus, setMultiPerformanceBonus] = useState(1);
  const [monthlyIncrease, setMonthlyIncrease] = useState(0);
  const [yearlyIncrease, setYearlyIncrease] = useState(0);
  const [levelValue, setLevelValue] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [approveValue, setApproveValue] = useState<string>('');

  const signRef = useRef<any | undefined>();
  const [signature, setSignature] = useState<any>(null);

  // Functions
  const handleInterviewModal = () => {
    setIsOpenModal(true);
  };
  const handleApproveChange = (e: RadioChangeEvent) => {
    setApproveValue(e.target.value);
  };

  const handleSignatureEnd = () => {
    setSignature(signRef.current.toDataURL());
  };
  const clearSignature = () => {
    signRef.current.clear();
    setSignature(null);
  };
  // const basicSalaryChangeLeft = (value: any) => {
  //   const annualSalary = value * 12;
  //   const prevState = currentPackage;
  //   const currentState = {
  //     ...prevState,
  //     monthlyBasicSalary: value,
  //     annualBasicSalary: annualSalary,
  //   };
  //   setCurrentPackage(currentState);
  // };

  // const tunjanganTransportasiChangeLeft = (value: any) => {
  //   const annualTransportasi = value * 12;
  //   const prevState = currentPackage;
  //   const currentState = {
  //     ...prevState,
  //     monthlyTunjTransportasi: value,
  //     annualTunjTransportasi: annualTransportasi,
  //   };
  //   setCurrentPackage(currentState);
  // };

  // const thrChangeLeft = (value: any) => {
  //   const prevState = currentPackage;
  //   const currentState = {
  //     ...prevState,
  //     annualThr: value,
  //   };
  //   setCurrentPackage(currentState);
  // };

  // const performanceBonusChangeLeft = (value: any) => {
  //   const prevState = currentPackage;
  //   const currentState = {
  //     ...prevState,
  //     annualPerformanceBonus: value,
  //   };
  //   setCurrentPackage(currentState);
  // };

  // const addLabelLeft = (index: number, event: any) => {
  //   setLabelNames((prevState: {}) => ({
  //     ...prevState,
  //     [index.toString()]: event.target.value,
  //   }));
  // };

  // const addValuesLeft = (index: number, value: any) => {
  //   const annualBenefit = value * 12;
  //   const prevState = currentPackage;
  //   const currentState = {
  //     ...prevState,
  //     packageAddition: {
  //       ...prevState.packageAddition,
  //       [index.toString()]: {
  //         labelName: labelNames[index as keyof any],
  //         monthlyAddition: value,
  //         annualAddition: annualBenefit,
  //       },
  //     },
  //   };
  //   setCurrentPackage(currentState);

  //   const fieldsValue = form.getFieldsValue();
  //   const newPackageAddition = {
  //     ...fieldsValue.packageAddition,
  //     [index]: {
  //       labelName: labelNames[index as keyof any],
  //       monthlyNumber: value,
  //       annualNumber: annualBenefit,
  //     },
  //   };

  //   const newFieldsValue = {
  //     ...fieldsValue,
  //     packageAddition: newPackageAddition,
  //   };
  //   form.setFieldsValue(newFieldsValue);
  // };

  // const basicSalaryChangeRight = (value: any) => {
  //   const annualSalary = value * 12;
  //   const performanceBonusScheme = value * multiPerformanceBonus;
  //   const fixedNumber = performanceBonusScheme.toFixed(2);
  //   const prevState = schemeOffer;
  //   const currentState = {
  //     ...prevState,
  //     monthlyBasicSalary: value,
  //     annualBasicSalary: annualSalary,
  //     annualThr: value,
  //     annualPerformanceBonus: parseInt(fixedNumber),
  //   };
  //   setSchemeOffer(currentState);
  // };

  // const tunjanganTransportasiChangeRight = (value: any) => {
  //   const annualTransportasi = value * 12;
  //   const prevState = schemeOffer;
  //   const currentState = {
  //     ...prevState,
  //     monthlyTunjTransportasi: value,
  //     annualTunjTransportasi: annualTransportasi,
  //   };
  //   setSchemeOffer(currentState);
  // };

  // const multipleBonusChange = (value: any) => {
  //   console.log('multiple bonus: ', value);
  //   if (schemeOffer && schemeOffer?.monthlyBasicSalary) {
  //     const performanceBonusScheme = schemeOffer?.monthlyBasicSalary * value;
  //     const fixedNumber = performanceBonusScheme.toFixed(2);
  //     console.log('performanceBonusScheme: ', performanceBonusScheme);
  //     console.log('fixedNumber: ', fixedNumber);
  //     const prevState = schemeOffer;
  //     const currentState = {
  //       ...prevState,
  //       annualPerformanceBonus: parseInt(fixedNumber),
  //     };
  //     setSchemeOffer(currentState);
  //     setMultiPerformanceBonus(value);
  //   }
  // };

  // const addLabelRight = (index: number, event: any) => {
  //   setRightLabelNames((prevState: {}) => ({
  //     ...prevState,
  //     [index.toString()]: event.target.value,
  //   }));
  // };

  // const addValuesRight = (index: number, value: any) => {
  //   const annualBenefit = value * 12;
  //   const prevState = schemeOffer;
  //   const currentState = {
  //     ...prevState,
  //     schemeAddition: {
  //       ...prevState.schemeAddition,
  //       [index.toString()]: {
  //         labelName: rightLabelNames[index as keyof any],
  //         monthlyAddition: value,
  //         annualAddition: annualBenefit,
  //       },
  //     },
  //   };
  //   setSchemeOffer(currentState);

  //   const fieldsValue = form.getFieldsValue();
  //   const newSchemeAddition = {
  //     ...fieldsValue.schemeAddition,
  //     [index]: {
  //       labelName: rightLabelNames[index as keyof any],
  //       monthlyNumber: value,
  //       annualNumber: annualBenefit,
  //     },
  //   };

  //   const newFieldsValue = {
  //     ...fieldsValue,
  //     schemeAddition: newSchemeAddition,
  //   };
  //   form.setFieldsValue(newFieldsValue);
  // };

  const addRowLeft = () => {
    if (leftRowTotal < 8) {
      setLeftRowTotal(leftRowTotal + 1);
    }
  };
  // const removeRowLeft = () => {
  //   if (leftRowTotal > 0) {
  //     const newObj: any = { ...currentPackage.packageAddition };
  //     // const keys = Object.keys(newObj);
  //     // if (keys.length > 0) {
  //     //   delete newObj[keys.pop()!];
  //     // }
  //     const newPackageAddition = {
  //       ...newObj,
  //       [leftRowTotal - 1]: {
  //         labelName: '',
  //         monthlyNumber: 0,
  //         annualNumber: 0,
  //       },
  //     };
  //     const prevState = currentPackage;
  //     const currentState = {
  //       ...prevState,
  //       packageAddition: {
  //         ...newPackageAddition,
  //       },
  //     };
  //     setCurrentPackage(currentState);

  //     const fieldsValue = form.getFieldsValue();
  //     const newFieldsValue = {
  //       ...fieldsValue,
  //       packageAddition: { ...newPackageAddition },
  //     };
  //     form.setFieldsValue(newFieldsValue);
  //     // console.log('newObjpackageAddition: ', newObj);
  //     console.log('newFieldsValue: ', newFieldsValue);
  //     setLeftRowTotal(leftRowTotal - 1);
  //   }
  // };

  const addRowRight = () => {
    if (rightRowTotal < 8) {
      setRightRowTotal(rightRowTotal + 1);
      // console.log('schemeOffer: ', schemeOffer);
    }
  };
  // const removeRowRight = () => {
  //   if (rightRowTotal > 0) {
  //     const newObj: any = { ...schemeOffer.schemeAddition };
  //     // const keys = Object.keys(newObj);
  //     // if (keys.length > 0) {
  //     //   delete newObj[keys.pop()!];
  //     // }
  //     const newSchemeAddition = {
  //       ...newObj,
  //       [rightRowTotal - 1]: {
  //         labelName: '',
  //         monthlyNumber: 0,
  //         annualNumber: 0,
  //       },
  //     };
  //     const prevState = schemeOffer;
  //     const currentState = {
  //       ...prevState,
  //       schemeAddition: {
  //         ...newSchemeAddition,
  //       },
  //     };
  //     setSchemeOffer(currentState);

  //     const fieldsValue = form.getFieldsValue();
  //     const newFieldsValue = {
  //       ...fieldsValue,
  //       schemeAddition: { ...newSchemeAddition },
  //     };
  //     form.setFieldsValue(newFieldsValue);
  //     console.log('newFieldsValue: ', newFieldsValue);
  //     setRightRowTotal(rightRowTotal - 1);
  //     // console.log('newObjschemeAddition: ', newObj);
  //   }
  // };

  // const showCandidateChange: CheckboxProps['onChange'] = (e) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };
  // const handleLevelChanged = (value: string) => {
  //   setLevelValue(value);
  // };
  // const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const handleSubmit: FormProps<FieldType>['onFinish'] = () => {
    // showModal();
    let values = form.getFieldsValue();
    console.log('values: ', values);
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

  // UseEffect
  useEffect(() => {
    form.setFieldsValue({
      annualBasicSalaryPackage: currentPackage?.annualBasicSalary,
      annualTunjanganTransportasiPackage:
        currentPackage?.annualTunjTransportasi,
      thrPackage: currentPackage?.annualThr,
      performanceBonusPackage: currentPackage?.annualPerformanceBonus,
    });

    if (
      currentPackage &&
      currentPackage?.monthlyBasicSalary &&
      currentPackage?.monthlyTunjTransportasi
    ) {
      let monthlyTotal =
        currentPackage?.monthlyBasicSalary +
        currentPackage?.monthlyTunjTransportasi;
      if (currentPackage?.packageAddition) {
        const benefitAddition = Object.values(currentPackage?.packageAddition);
        const initialValue = 0;
        const sumWithInitial = benefitAddition.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.monthlyAddition || 0),
          initialValue,
        );
        monthlyTotal += sumWithInitial;
      }
      setMonthlyTotalLeft(monthlyTotal);
    }

    if (
      currentPackage &&
      currentPackage?.annualBasicSalary &&
      currentPackage?.annualTunjTransportasi &&
      currentPackage?.annualThr &&
      currentPackage?.annualPerformanceBonus
    ) {
      let annualTotal =
        currentPackage?.annualBasicSalary +
        currentPackage?.annualTunjTransportasi +
        currentPackage?.annualThr +
        currentPackage?.annualPerformanceBonus;
      if (currentPackage?.packageAddition) {
        const benefitAddition = Object.values(currentPackage?.packageAddition);
        const initialValue = 0;
        const sumWithInitial = benefitAddition.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.annualAddition || 0),
          initialValue,
        );
        annualTotal += sumWithInitial;
      }
      setAnnualTotalLeft(annualTotal);
    }
  }, [currentPackage]);

  useEffect(() => {
    form.setFieldsValue({
      annualBasicSalaryScheme: schemeOffer?.annualBasicSalary,
      annualTunjanganTransportasiScheme: schemeOffer?.annualTunjTransportasi,
      annualThrScheme: schemeOffer?.monthlyBasicSalary,
      annualPerformanceBonusScheme: schemeOffer?.annualPerformanceBonus,
    });

    if (
      schemeOffer &&
      schemeOffer?.monthlyBasicSalary &&
      schemeOffer?.monthlyTunjTransportasi
    ) {
      let monthlyTotal =
        schemeOffer?.monthlyBasicSalary + schemeOffer?.monthlyTunjTransportasi;
      if (schemeOffer?.schemeAddition) {
        const benefitAddition = Object.values(schemeOffer?.schemeAddition);
        const initialValue = 0;
        const sumWithInitial = benefitAddition.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.monthlyAddition || 0),
          initialValue,
        );
        monthlyTotal += sumWithInitial;
      }
      setMonthlyTotalRight(monthlyTotal);
    }

    if (
      schemeOffer &&
      schemeOffer?.annualBasicSalary &&
      schemeOffer?.annualTunjTransportasi &&
      schemeOffer?.annualThr &&
      schemeOffer?.annualPerformanceBonus
    ) {
      let annualTotal =
        schemeOffer?.annualBasicSalary +
        schemeOffer?.annualTunjTransportasi +
        schemeOffer?.annualThr +
        schemeOffer?.annualPerformanceBonus;
      if (schemeOffer?.schemeAddition) {
        const benefitAddition = Object.values(schemeOffer?.schemeAddition);
        const initialValue = 0;
        const sumWithInitial = benefitAddition.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.annualAddition || 0),
          initialValue,
        );
        annualTotal += sumWithInitial;
      }
      setAnnualTotalRight(annualTotal);
    }
  }, [schemeOffer]);

  useEffect(() => {
    let newMonthlyIncrease = monthlyTotalRight / monthlyTotalLeft - 1;
    // newMonthlyIncrease = parseFloat(newMonthlyIncrease.toFixed(2));
    newMonthlyIncrease = newMonthlyIncrease * 100;
    let newYearlyIncrease = annualTotalRight / annualTotalLeft - 1;
    // newYearlyIncrease = parseFloat(newYearlyIncrease.toFixed(2));
    newYearlyIncrease = newYearlyIncrease * 100;
    setMonthlyIncrease(newMonthlyIncrease);
    setYearlyIncrease(newYearlyIncrease);
    console.log('newMonthlyIncrease: ', newMonthlyIncrease);
    console.log('newYearlyIncrease: ', newYearlyIncrease);
  }, [monthlyTotalLeft, monthlyTotalRight, annualTotalLeft, annualTotalRight]);

  useEffect(() => {
    console.log(signature);
  }, [signature]);

  // useEffect(() => {
  //   console.log('labelNames: ', labelNames);
  // }, [labelNames]);

  // useEffect(() => {
  //   console.log('currentPackage: ', currentPackage);
  // }, [currentPackage]);

  // useEffect(() => {
  //   console.log('schemeOffer: ', schemeOffer);
  // }, [schemeOffer]);

  // useEffect(() => {
  //   console.log('annualTotalRight: ', annualTotalRight);
  // }, [annualTotalRight]);
  return (
    <>
      <InterviewHistoryModal
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        interviewHistoryData={''}
      />
      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">
            Approval Offering (Position Name)
          </h2>
        </div>
      </div>
      <div className="bg-white card-box border-20">
        <Form
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-12 d-flex justify-content-end mb-10">
              <Button type="primary" onClick={handleInterviewModal}>
                Interview History
              </Button>
              <Button
                className="ms-2"
                type="primary"
                onClick={handleInterviewModal}
              >
                Approval History
              </Button>
            </div>

            <div className="col-lg-12">
              <h3 className="section-page-title">Profile</h3>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 section-label">Name</p>
              <p className="mb-0 section-label">Latest Position</p>
              <p className="mb-0 section-label">Latest Company</p>
              <p className="mb-0 section-label">Expected Salary</p>
            </div>
            <div className="col-lg-6 mb-20">
              <p className="mb-0 section-label">Daniel</p>
              <p className="mb-0 section-label">Account Receivable Officer</p>
              <p className="mb-0 section-label">Kerta Kencana</p>
              <p className="mb-0 section-label">Rp 10.000.000</p>
            </div>

            <div className="col-lg-6">
              <h3 className="section-page-title">Current Package</h3>
            </div>
            <div className="col-lg-6">
              <h3 className="section-page-title">Scheme Offer</h3>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-2 mb-2">Salary</div>
                <div className="col-lg-4 mb-2">
                  <label>Monthly</label>
                </div>
                <div className="col-lg-4 mb-2">
                  <label>Annual</label>
                </div>
                <div className="col-lg-2 mb-2">
                  <label>Remarks</label>
                </div>

                <div className="col-lg-2 mb-2">
                  <label>Basic Salary</label>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="basicSalaryPackage"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      // onChange={basicSalaryChangeLeft}
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="annualBasicSalaryPackage"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-2 mb-2">
                  <label>gross</label>
                </div>

                <div className="col-lg-2 mb-2">
                  <label>Tunjangan Transportasi</label>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="tunjanganTransportasiPackage"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      // onChange={tunjanganTransportasiChangeLeft}
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="annualTunjanganTransportasiPackage"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-2 mb-2">
                  <label>gross</label>
                </div>

                <div className="col-lg-12">
                  {Array.from({ length: leftRowTotal }, (_, index) => (
                    <div key={index} className="row">
                      <div className="col-lg-2 mb-2">
                        <Tooltip title={labelNames[index]}>
                          <Form.Item<FieldType>
                            name={[
                              'packageAddition',
                              index.toString(),
                              'labelName',
                            ]}
                            className="mb-0"
                          >
                            <Input
                              className="w-100"
                              placeholder="Label"
                              // onChange={(event: any) =>
                              //   addLabelLeft(index, event)
                              // }
                              disabled
                            />
                          </Form.Item>
                        </Tooltip>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <Form.Item<FieldType>
                          name={[
                            'packageAddition',
                            index.toString(),
                            'monthlyNumber',
                          ]}
                          className="mb-0"
                        >
                          <InputNumber
                            className="w-100"
                            min={0}
                            formatter={(value) =>
                              `Rp ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                '.',
                              )
                            }
                            parser={(
                              value: string | undefined,
                            ): string | number =>
                              value!.replace(/\Rp\s?|(\.*)/g, '')
                            }
                            // onChange={(value: any) =>
                            //   addValuesLeft(index, value)
                            // }
                            disabled
                          />
                        </Form.Item>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <Form.Item<FieldType>
                          name={[
                            'packageAddition',
                            index.toString(),
                            'annualNumber',
                          ]}
                          className="mb-0"
                        >
                          <InputNumber
                            className="w-100"
                            min={0}
                            formatter={(value) =>
                              `Rp ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                '.',
                              )
                            }
                            parser={(
                              value: string | undefined,
                            ): string | number =>
                              value!.replace(/\Rp\s?|(\.*)/g, '')
                            }
                            disabled
                          />
                        </Form.Item>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="col-10 d-flex justify-content-end align-items-center">
                  <div className="mb-15 me-2">
                    <Button onClick={addRowLeft}>ADD</Button>
                  </div>
                  <div className="mb-15">
                    <Button type="primary" danger onClick={removeRowLeft}>
                      REMOVE
                    </Button>
                  </div>
                </div>
                <div className="col-lg-2"></div> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-2 mb-2">Salary</div>
                <div className="col-lg-4 mb-2">
                  <label>Monthly</label>
                </div>
                <div className="col-lg-4 mb-2">
                  <label>Annual</label>
                </div>
                <div className="col-lg-2 mb-2">
                  <label>Remarks</label>
                </div>

                <div className="col-lg-2 mb-2">
                  <label>Basic Salary</label>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="basicSalaryScheme"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      // onChange={basicSalaryChangeRight}
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="annualBasicSalaryScheme"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-2 mb-2">
                  <label>gross</label>
                </div>

                <div className="col-lg-2 mb-2">
                  <label>Tunjangan Transportasi</label>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="tunjanganTransportasiScheme"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      // onChange={tunjanganTransportasiChangeRight}
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType>
                    name="annualTunjanganTransportasiScheme"
                    className="mb-0"
                  >
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-2 mb-2">
                  <label>gross</label>
                </div>

                <div className="col-lg-12">
                  {Array.from({ length: rightRowTotal }, (_, index) => (
                    <div key={index} className="row">
                      <div className="col-lg-2 mb-2">
                        <Tooltip title={rightLabelNames[index]}>
                          <Form.Item<FieldType>
                            name={[
                              'schemeAddition',
                              index.toString(),
                              'labelName',
                            ]}
                            className="mb-0"
                          >
                            <Input
                              className="w-100"
                              placeholder="Label"
                              // onChange={(event: any) =>
                              //   addLabelRight(index, event)
                              // }
                              disabled
                            />
                          </Form.Item>
                        </Tooltip>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <Form.Item<FieldType>
                          name={[
                            'schemeAddition',
                            index.toString(),
                            'monthlyNumber',
                          ]}
                          className="mb-0"
                        >
                          <InputNumber
                            className="w-100"
                            min={0}
                            formatter={(value) =>
                              `Rp ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                '.',
                              )
                            }
                            parser={(
                              value: string | undefined,
                            ): string | number =>
                              value!.replace(/\Rp\s?|(\.*)/g, '')
                            }
                            // onChange={(value: any) =>
                            //   addValuesRight(index, value)
                            // }
                            disabled
                          />
                        </Form.Item>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <Form.Item<FieldType>
                          name={[
                            'schemeAddition',
                            index.toString(),
                            'annualNumber',
                          ]}
                          className="mb-0"
                        >
                          <InputNumber
                            className="w-100"
                            min={0}
                            formatter={(value) =>
                              `Rp ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                '.',
                              )
                            }
                            parser={(
                              value: string | undefined,
                            ): string | number =>
                              value!.replace(/\Rp\s?|(\.*)/g, '')
                            }
                            disabled
                          />
                        </Form.Item>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="col-10 d-flex justify-content-end align-items-center">
                  <div className="mb-15 me-2">
                    <Button onClick={addRowRight}>ADD</Button>
                  </div>
                  <div className="mb-15">
                    <Button type="primary" danger onClick={removeRowRight}>
                      REMOVE
                    </Button>
                  </div>
                </div>
                <div className="col-lg-2"></div> */}
              </div>
            </div>

            {/* Yearly Pay */}
            <div className="col-lg-12 mt-20">
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-2 mb-2">Yearly Pay</div>
                    <div className="col-lg-4 mb-2">
                      <label></label>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label>Annual</label>
                    </div>
                    <div className="col-lg-2 mb-2"></div>

                    <div className="col-lg-2 mb-2">
                      <label>THR</label>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType> name="thrPackage" className="mb-0">
                        <InputNumber
                          className="w-100"
                          min={0}
                          formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          }
                          parser={(
                            value: string | undefined,
                          ): string | number =>
                            value!.replace(/\Rp\s?|(\.*)/g, '')
                          }
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType>
                        name="annualThrPackage"
                        className="mb-0"
                      >
                        <InputNumber
                          className="w-100"
                          min={0}
                          formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          }
                          parser={(
                            value: string | undefined,
                          ): string | number =>
                            value!.replace(/\Rp\s?|(\.*)/g, '')
                          }
                          // onChange={thrChangeLeft}
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <label>gross</label>
                    </div>

                    <div className="col-lg-2 mb-2">
                      <label>Performance Bonus</label>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType>
                        name="performanceBonusPackage"
                        className="mb-0"
                      >
                        <InputNumber
                          className="w-100"
                          min={0}
                          formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          }
                          parser={(
                            value: string | undefined,
                          ): string | number =>
                            value!.replace(/\Rp\s?|(\.*)/g, '')
                          }
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType>
                        name="annualPerformanceBonusPackage"
                        className="mb-0"
                      >
                        <InputNumber
                          className="w-100"
                          min={0}
                          formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          }
                          parser={(
                            value: string | undefined,
                          ): string | number =>
                            value!.replace(/\Rp\s?|(\.*)/g, '')
                          }
                          // onChange={performanceBonusChangeLeft}
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <label>gross</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-2 mb-2">Yearly Pay</div>
                    <div className="col-lg-4 mb-2">
                      <label>Multiplier</label>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label>Annual</label>
                    </div>
                    <div className="col-lg-2 mb-2"></div>

                    <div className="col-lg-2 mb-2">
                      <label>THR</label>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType>
                        name="thrScheme"
                        className="mb-0"
                        initialValue={1}
                      >
                        <InputNumber className="w-100" min={1} disabled />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType>
                        name="annualThrScheme"
                        className="mb-0"
                      >
                        <InputNumber
                          className="w-100"
                          min={0}
                          formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          }
                          parser={(
                            value: string | undefined,
                          ): string | number =>
                            value!.replace(/\Rp\s?|(\.*)/g, '')
                          }
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <label>gross</label>
                    </div>

                    <div className="col-lg-2 mb-2">
                      <label>Performance Bonus</label>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType>
                        name="performanceBonusScheme"
                        className="mb-0"
                        initialValue={1}
                      >
                        <InputNumber
                          className="w-100"
                          min={0}
                          step={0.1}
                          // onChange={multipleBonusChange}
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <Form.Item<FieldType>
                        name="annualPerformanceBonusScheme"
                        className="mb-0"
                      >
                        <InputNumber
                          className="w-100"
                          min={0}
                          formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          }
                          parser={(
                            value: string | undefined,
                          ): string | number =>
                            value!.replace(/\Rp\s?|(\.*)/g, '')
                          }
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-2 mb-2">
                      <label>gross</label>
                    </div>

                    <div className="col-lg-4 mb-2">
                      <label>Increment After Probation</label>
                    </div>
                    <div className="col-lg-5 mb-2">
                      <Form.Item<FieldType>
                        name="probationNote"
                        className="mb-0"
                      >
                        <TextArea
                          placeholder="Note"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                          disabled
                        ></TextArea>
                      </Form.Item>
                    </div>
                    {/* <div className="col-lg-3 mb-2">
                      <Form.Item<FieldType>
                        name="probationCheckbox"
                        className="mb-0"
                      >
                        <Checkbox onChange={showCandidateChange}>
                          Show to Candidate
                        </Checkbox>
                      </Form.Item>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Convert */}
            <div className="col-lg-12 mt-20">
              <div className="row">
                <div className="col-lg-6">
                  <h3 className="section-page-title">
                    Annual Convert Monthly Existing
                  </h3>
                  <div className="row">
                    <div className="col-lg-8">
                      <p className="section-label mb-0">
                        Total Annual Guaranteed Cash
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p className="section-label mb-0">
                        {`Rp. ${annualTotalLeft}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          '.',
                        )}
                      </p>
                    </div>

                    <div className="col-lg-8">
                      <p className="section-label mb-0">Total Gross Monthly</p>
                    </div>
                    <div className="col-lg-4">
                      <p className="section-label mb-0">
                        {`Rp. ${monthlyTotalLeft}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          '.',
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <h3 className="section-page-title">
                    Annual Convert Monthly Existing
                  </h3>
                  <div className="row">
                    <div className="col-lg-8">
                      <p className="section-label mb-0">
                        Total Annual Guaranteed Cash
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p className="section-label mb-0">
                        {`Rp. ${annualTotalRight}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          '.',
                        )}
                      </p>
                    </div>

                    <div className="col-lg-8">
                      <p className="section-label mb-0">Total Gross Monthly</p>
                    </div>
                    <div className="col-lg-4">
                      <p className="section-label mb-0">
                        {`Rp. ${monthlyTotalRight}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          '.',
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 mt-20">
              <div className="row">
                <h3 className="section-page-title">Percentage Increase</h3>
                <div className="col-lg-3">
                  <p className="section-label increase-label mb-0">
                    Monthly Increase
                  </p>
                </div>
                <div className="col-lg-3">
                  <p
                    className={`section-label increase-label mb-0 ${parseInt(monthlyIncrease.toFixed(0)) === 30 ? 'warning-increase-label' : ''} ${parseInt(monthlyIncrease.toFixed(0)) > 30 ? 'danger-increase-label' : ''}`}
                  >{`${isNaN(monthlyIncrease) ? '0' : monthlyIncrease.toFixed(0)}%`}</p>
                </div>
                <div className="col-lg-3">
                  <p className="section-label increase-label mb-0">
                    Yearly Increase
                  </p>
                </div>
                <div className="col-lg-3">
                  <p
                    className={`section-label increase-label mb-0 ${parseInt(yearlyIncrease.toFixed(0)) === 30 ? 'warning-increase-label' : ''} ${parseInt(yearlyIncrease.toFixed(0)) > 30 ? 'danger-increase-label' : ''}`}
                  >{`${isNaN(yearlyIncrease) ? '0' : yearlyIncrease.toFixed(0)}%`}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-12 mt-20">
              <div className="row">
                <h3 className="section-page-title">Approval Offering</h3>
                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Level*</label>
                    <Form.Item<FieldType>
                      name="level"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input level!',
                      //   },
                      // ]}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select Level"
                        // onChange={handleLevelChanged}
                        options={[
                          { value: 'Director', label: 'Director' },
                          { value: 'VP', label: 'VP' },
                          {
                            value: 'General Manager',
                            label: 'General Manager',
                          },
                          { value: 'Manager', label: 'Manager' },
                          {
                            value: 'Assistant Manager',
                            label: 'Assistant Manager',
                          },
                          {
                            value: 'Supervisor',
                            label: 'Supervisor',
                          },
                          {
                            value: 'Staff',
                            label: 'Staff',
                          },
                        ]}
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Grade*</label>
                    <Form.Item<FieldType>
                      name="grade"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input grade!',
                      //   },
                      // ]}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select Grade"
                        options={[
                          { value: 'A (Junior)', label: 'A (Junior)' },
                          { value: 'B (-)', label: 'B (-)' },
                          {
                            value: 'C (Senior)',
                            label: 'C (Senior)',
                          },
                          { value: 'D (Senior)', label: 'D (Senior)' },
                        ]}
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Contact Period*</label>
                    <Form.Item<FieldType>
                      name="contactPeriod"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input contact period!',
                      //   },
                      // ]}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select Contact Period"
                        options={[
                          { value: '1 (Satu) Bulan', label: '1 (Satu) Bulan' },
                          { value: '2 (Dua) Bulan', label: '2 (Dua) Bulan' },
                          {
                            value: '3 (Tiga) Bulan',
                            label: '3 (Tiga) Bulan',
                          },
                          {
                            value: '4 (Empat) Bulan',
                            label: '4 (Empat) Bulan',
                          },
                          {
                            value: '5 (Lima) Bulan',
                            label: '5 (Lima) Bulan',
                          },
                          {
                            value: '6 (Enam) Bulan',
                            label: '6 (Enam) Bulan',
                          },
                          {
                            value: '7 (Tujuh) Bulan',
                            label: '7 (Tujuh) Bulan',
                          },
                          {
                            value: '8 (Delapan) Bulan',
                            label: '8 (Delapan) Bulan',
                          },
                          {
                            value: '9 (Sembilan) Bulan',
                            label: '9 (Sembilan) Bulan',
                          },
                          {
                            value: '10 (Sepuluh) Bulan',
                            label: '10 (Sepuluh) Bulan',
                          },
                          {
                            value: '11 (Sebelas) Bulan',
                            label: '11 (Sebelas) Bulan',
                          },
                          {
                            value: '12 (Dua Belas) Bulan',
                            label: '12 (Dua Belas) Bulan',
                          },
                        ]}
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>FPK*</label>
                    <Form.Item<FieldType>
                      name="fpk"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input FPK!',
                      //   },
                      // ]}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select FPK"
                        options={[
                          { value: '1 (Satu) Bulan', label: '1 (Satu) Bulan' },
                          { value: '2 (Dua) Bulan', label: '2 (Dua) Bulan' },
                          {
                            value: '3 (Tiga) Bulan',
                            label: '3 (Tiga) Bulan',
                          },
                        ]}
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Superior*</label>
                    <Form.Item<FieldType>
                      name="superior"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input superior!',
                      //   },
                      // ]}
                    >
                      <Select
                        className="w-100"
                        // showSearch
                        placeholder="Select Superior"
                        options={[
                          { value: '1 (Satu) Bulan', label: '1 (Satu) Bulan' },
                          { value: '2 (Dua) Bulan', label: '2 (Dua) Bulan' },
                          {
                            value: '3 (Tiga) Bulan',
                            label: '3 (Tiga) Bulan',
                          },
                        ]}
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Signatory*</label>
                    <Form.Item<FieldType>
                      name="signatory"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input signatory!',
                      //   },
                      // ]}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select Signatory"
                        options={[
                          { value: '1 (Satu) Bulan', label: '1 (Satu) Bulan' },
                          { value: '2 (Dua) Bulan', label: '2 (Dua) Bulan' },
                          {
                            value: '3 (Tiga) Bulan',
                            label: '3 (Tiga) Bulan',
                          },
                        ]}
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>HRBP*</label>
                    <Form.Item<FieldType>
                      name="hrbp"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input hrbp!',
                      //   },
                      // ]}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select HRBP"
                        options={[
                          { value: '1 (Satu) Bulan', label: '1 (Satu) Bulan' },
                          { value: '2 (Dua) Bulan', label: '2 (Dua) Bulan' },
                          {
                            value: '3 (Tiga) Bulan',
                            label: '3 (Tiga) Bulan',
                          },
                        ]}
                        disabled
                      />
                    </Form.Item>
                  </div>
                </div>

                {levelValue.length > 0 &&
                  levelValue !== 'Staff' &&
                  levelValue !== 'Supervisor' &&
                  levelValue !== 'Assistant Manager' && (
                    <div className="col-lg-6">
                      <div className="input-group-meta position-relative mb-15">
                        <label>Management*</label>
                        <Form.Item<FieldType>
                          name="management"
                          className="mb-0"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please input management!',
                          //   },
                          // ]}
                        >
                          <Select
                            className="w-100"
                            placeholder="Select Management"
                            options={[
                              {
                                value: '1 (Satu) Bulan',
                                label: '1 (Satu) Bulan',
                              },
                              {
                                value: '2 (Dua) Bulan',
                                label: '2 (Dua) Bulan',
                              },
                              {
                                value: '3 (Tiga) Bulan',
                                label: '3 (Tiga) Bulan',
                              },
                            ]}
                            disabled
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}

                <div className="col-lg-6">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Start Working*</label>
                    <Form.Item<FieldType>
                      name="startWorking"
                      className="mb-0"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input start working!',
                      //   },
                      // ]}
                    >
                      <DatePicker
                        className="w-100"
                        format={'DD-MMM-YYYY'}
                        placeholder="Select Date"
                        disabled
                        // onChange={onChangeDate}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="col-lg-6 mb-2">
                  <Form.Item<FieldType> name="approveValue" className="mb-0">
                    <Radio.Group
                      onChange={handleApproveChange}
                      value={approveValue}
                    >
                      <Radio value="Approve">Approve</Radio>
                      <Radio value="Reject">Reject</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="col-lg-6">
                  {approveValue === 'Approve' && (
                    <div className="row">
                      <div className="col-lg-7">
                        <label>Draw E-Sign*</label>
                        <SignatureCanvas
                          penColor="black"
                          canvasProps={{
                            style: {
                              display: 'block',
                              border: '1px solid black',
                              width: '100%',
                              height: '200px',
                            },
                          }}
                          ref={signRef}
                          onEnd={handleSignatureEnd}
                        />
                        <Button
                          className="mt-2"
                          type="primary"
                          danger
                          onClick={clearSignature}
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="col-lg-5">
                        <Form.Item<FieldType>
                          name="uploadESign"
                          className="mb-0"
                        >
                          <Upload {...uploadProps}>
                            <Button
                              className="d-flex align-items-center justify-content-center"
                              icon={
                                <AiOutlineUpload style={{ fontSize: '19px' }} />
                              }
                            >
                              Upload E-Sign
                            </Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </div>
                  )}
                  {approveValue === 'Reject' && (
                    <div className="input-group-meta position-relative mb-15">
                      <label>Suggest Salary Offer*</label>
                      <Form.Item<FieldType>
                        name="suggestSalary"
                        className="mb-0"
                      >
                        <InputNumber
                          className="w-100"
                          min={0}
                          formatter={(value) =>
                            `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                          }
                          parser={(
                            value: string | undefined,
                          ): string | number =>
                            value!.replace(/\Rp\s?|(\.*)/g, '')
                          }
                        />
                      </Form.Item>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
              <button
                type="submit"
                className="dash-btn-two offering-btn tran3s me-3"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ApprovalOfferingUser;
