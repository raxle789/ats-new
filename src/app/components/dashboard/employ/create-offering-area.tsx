import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Checkbox,
} from 'antd';
import type { CheckboxProps, DatePickerProps, InputNumberProps } from 'antd';

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
  startWorking?: string;
  fpk?: string;
  superior?: string;
  probationNote?: string;
  probationCheckbox?: boolean;
};

const CreateOfferingArea = () => {
  const [form] = Form.useForm();
  const [annualBasicSalaryPackage, setAnnualBasicSalaryPackage] = useState(0);

  const basicSalaryChangeLeft = (value: any) => {
    setAnnualBasicSalaryPackage(value * 12);
  };

  useEffect(() => {
    form.setFieldsValue({
      annualBasicSalaryPackage: annualBasicSalaryPackage,
    });
  }, [annualBasicSalaryPackage]);

  const [annualTunjTransportasiPackage, setAnnualTunjTransportasiPackage] =
    useState(0);

  const tunjanganTransportasiChangeLeft = (value: any) => {
    setAnnualTunjTransportasiPackage(value * 12);
  };

  useEffect(() => {
    form.setFieldsValue({
      annualTunjanganTransportasiPackage: annualTunjTransportasiPackage,
    });
  }, [annualTunjTransportasiPackage]);

  const [annualThrPackage, setAnnualThrPackage] = useState(0);

  const thrChangeLeft = (value: any) => {
    setAnnualThrPackage(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      annualThrPackage: annualThrPackage,
    });
  }, [annualThrPackage]);

  const [annualPerformanceBonusPackage, setAnnualPerformanceBonusPackage] =
    useState(0);

  const performanceBonusChangeLeft = (value: any) => {
    setAnnualPerformanceBonusPackage(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      annualPerformanceBonusPackage: annualPerformanceBonusPackage,
    });
  }, [annualPerformanceBonusPackage]);

  const [annualBasicSalaryScheme, setAnnualBasicSalaryScheme] = useState(0);

  const basicSalaryChangeRight = (value: any) => {
    setAnnualBasicSalaryScheme(value * 12);
  };

  useEffect(() => {
    form.setFieldsValue({
      annualBasicSalaryScheme: annualBasicSalaryScheme,
    });
  }, [annualBasicSalaryScheme]);

  const [
    annualTunjanganTransportasiScheme,
    setAnnualTunjanganTransportasiScheme,
  ] = useState(0);

  const tunjanganTransportasiChangeRight = (value: any) => {
    setAnnualTunjanganTransportasiScheme(value * 12);
  };

  useEffect(() => {
    form.setFieldsValue({
      annualTunjanganTransportasiScheme: annualTunjanganTransportasiScheme,
    });
  }, [annualTunjanganTransportasiScheme]);

  const [leftRowTotal, setLeftRowTotal] = useState(0);
  const addRowLeft = () => {
    if (leftRowTotal < 8) {
      setLeftRowTotal(leftRowTotal + 1);
    }
  };
  const removeRowLeft = () => {
    if (leftRowTotal > 0) {
      setLeftRowTotal(leftRowTotal - 1);
    }
  };

  const [rightRowTotal, setRightRowTotal] = useState(0);
  const addRowRight = () => {
    if (rightRowTotal < 8) {
      setRightRowTotal(rightRowTotal + 1);
    }
  };
  const removeRowRight = () => {
    if (rightRowTotal > 0) {
      setRightRowTotal(rightRowTotal - 1);
    }
  };

  const showCandidateChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  // useEffect(() => {
  //   form.setFieldsValue({
  //     annualBasicSalaryPackage: annualBasicSalaryPackage,
  //   });
  // }, []);
  return (
    <>
      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Create Offering</h2>
        </div>
      </div>
      <div className="bg-white card-box border-20">
        <Form form={form}>
          <div className="row">
            <div className="col-lg-12">
              <h3 className="main-title sub-section-title">Profile</h3>
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
              <h3 className="main-title sub-section-title">Create Package</h3>
            </div>
            <div className="col-lg-6">
              <h3 className="main-title sub-section-title">Scheme Offer</h3>
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
                      onChange={basicSalaryChangeLeft}
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
                      onChange={tunjanganTransportasiChangeLeft}
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
                        <Form.Item<FieldType>
                          name={[
                            'packageAddition',
                            index.toString(),
                            'labelName',
                          ]}
                          className="mb-0"
                        >
                          <Input className="w-100" placeholder="Label" />
                        </Form.Item>
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
                          />
                        </Form.Item>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-10 d-flex justify-content-end align-items-center">
                  <div className="mb-15 me-2">
                    <Button onClick={addRowLeft}>ADD</Button>
                  </div>
                  <div className="mb-15">
                    <Button type="primary" danger onClick={removeRowLeft}>
                      REMOVE
                    </Button>
                  </div>
                </div>
                <div className="col-lg-2"></div>

                <div className="col-lg-2 mb-2">Variabel Pay</div>
                <div className="col-lg-4 mb-2">
                  <label>Addition</label>
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
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      onChange={thrChangeLeft}
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
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
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
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                      onChange={performanceBonusChangeLeft}
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
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
                    />
                  </Form.Item>
                </div>
                <div className="col-lg-2 mb-2">
                  <label>gross</label>
                </div>
              </div>
              <div className="row mt-110">
                <h3 className="main-title sub-section-title">
                  Annual Convert Monthly Existing
                </h3>
                <div className="col-lg-8">
                  <p className="section-label mb-0">
                    Total Annual Guaranteed Cash
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="section-label mb-0">Rp. 10.000.000</p>
                </div>

                <div className="col-lg-8">
                  <p className="section-label mb-0">Total Gross Monthly</p>
                </div>
                <div className="col-lg-4">
                  <p className="section-label mb-0">Rp. 10.000.000</p>
                </div>
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
                      onChange={basicSalaryChangeRight}
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
                      onChange={tunjanganTransportasiChangeRight}
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
                        <Form.Item<FieldType>
                          name={[
                            'schemeAddition',
                            index.toString(),
                            'labelName',
                          ]}
                          className="mb-0"
                        >
                          <Input className="w-100" placeholder="Label" />
                        </Form.Item>
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
                          />
                        </Form.Item>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-10 d-flex justify-content-end align-items-center">
                  <div className="mb-15 me-2">
                    <Button onClick={addRowRight}>ADD</Button>
                  </div>
                  <div className="mb-15">
                    <Button type="primary" danger onClick={removeRowRight}>
                      REMOVE
                    </Button>
                  </div>
                </div>
                <div className="col-lg-2"></div>

                <div className="col-lg-2 mb-2">Variabel Pay</div>
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
                  <Form.Item<FieldType> name="thrScheme" className="mb-0">
                    <InputNumber className="w-100" min={1} />
                  </Form.Item>
                </div>
                <div className="col-lg-4 mb-2">
                  <Form.Item<FieldType> name="annualThrScheme" className="mb-0">
                    <InputNumber
                      className="w-100"
                      min={0}
                      formatter={(value) =>
                        `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
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
                  >
                    <InputNumber className="w-100" min={0.1} step={0.1} />
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
                      parser={(value: string | undefined): string | number =>
                        value!.replace(/\Rp\s?|(\.*)/g, '')
                      }
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
                  <Form.Item<FieldType> name="probationNote" className="mb-0">
                    <TextArea
                      placeholder="Note"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    ></TextArea>
                  </Form.Item>
                </div>
                <div className="col-lg-3 mb-2">
                  <Form.Item<FieldType>
                    name="probationCheckbox"
                    className="mb-0"
                  >
                    <Checkbox onChange={showCandidateChange}>
                      Show to Candidate
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>
              <div className="row mt-25">
                <h3 className="main-title sub-section-title">
                  Annual Convert Monthly Existing
                </h3>
                <div className="col-lg-8">
                  <p className="section-label mb-0">
                    Total Annual Guaranteed Cash
                  </p>
                </div>
                <div className="col-lg-4">
                  <p className="section-label mb-0">Rp. 10.000.000</p>
                </div>

                <div className="col-lg-8">
                  <p className="section-label mb-0">Total Gross Monthly</p>
                </div>
                <div className="col-lg-4">
                  <p className="section-label mb-0">Rp. 10.000.000</p>
                </div>
              </div>
            </div>

            <div className="col-lg-12 mt-20">
              <div className="row">
                <h3 className="main-title sub-section-title">
                  Percentage Increase
                </h3>
                <div className="col-lg-3">
                  <p className="section-label mb-0">Monthly Increase</p>
                </div>
                <div className="col-lg-3">
                  <p className="section-label mb-0">-%</p>
                </div>
                <div className="col-lg-3">
                  <p className="section-label mb-0">Yearly Increase</p>
                </div>
                <div className="col-lg-3">
                  <p className="section-label mb-0">-%</p>
                </div>
              </div>
            </div>

            <div className="col-lg-12 mt-20">
              <div className="row">
                <h3 className="main-title sub-section-title">
                  Approval Offering
                </h3>
                <div className="col-lg-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Level*</label>
                    <Form.Item<FieldType>
                      name="level"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please input level!',
                        },
                      ]}
                    >
                      <Select
                        className="w-100"
                        placeholder="Select Level"
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
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Grade*</label>
                    <Form.Item<FieldType>
                      name="grade"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please input grade!',
                        },
                      ]}
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
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Contact Period*</label>
                    <Form.Item<FieldType>
                      name="contactPeriod"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please input contact period!',
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'Please input FPK!',
                        },
                      ]}
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
                      rules={[
                        {
                          required: true,
                          message: 'Please input superior!',
                        },
                      ]}
                    >
                      <Select
                        className="w-100"
                        showSearch
                        placeholder="Select Superior"
                        options={[
                          { value: '1 (Satu) Bulan', label: '1 (Satu) Bulan' },
                          { value: '2 (Dua) Bulan', label: '2 (Dua) Bulan' },
                          {
                            value: '3 (Tiga) Bulan',
                            label: '3 (Tiga) Bulan',
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Signatory*</label>
                    <Form.Item<FieldType>
                      name="signatory"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please input signatory!',
                        },
                      ]}
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
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>HRBP*</label>
                    <Form.Item<FieldType>
                      name="hrbp"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please input hrbp!',
                        },
                      ]}
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
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Start Working*</label>
                    <Form.Item<FieldType>
                      name="startWorking"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please input start working!',
                        },
                      ]}
                    >
                      <DatePicker
                        className="w-100"
                        placeholder="Select Date"
                        onChange={onChangeDate}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
              <button
                type="submit"
                className="dash-btn-two offering-btn tran3s me-3"
              >
                Send Draft Offering
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateOfferingArea;
