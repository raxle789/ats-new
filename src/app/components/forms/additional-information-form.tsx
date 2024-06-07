import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  InputNumber,
  Form,
  Select,
  DatePicker,
  Tabs,
  Radio,
  message,
} from 'antd';
import type { FormProps, RadioChangeEvent } from 'antd';
import { MdOutlineModeEdit } from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';
import EmployJobDetailSkeleton from '../loadings/employ-job-detail-skeleton';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type FieldType = {
  families?: {
    [id: string]: {
      id?: number;
      relation?: string;
      name?: string;
      gender?: string;
      dateOfBirth?: string | Dayjs;
    };
  };
  everWorkedOption?: string;
  diseaseOption?: string;
  relationOption?: string;
  others?: {
    emergencyContactId?: number;
    emergencyContactName?: string;
    emergencyContactPhoneNumber?: string;
    emergencyContactRelation?: string;
    source: string;
    everWorkedMonth: string | Dayjs;
    everWorkedYear: string | Dayjs;
    diseaseName: string;
    diseaseYear: string | Dayjs;
    relationName: string;
    relationPosition: string;
    uploadCV?: string;
  };
};

type MasterData = {};

type Props = {
  additionalInformation?: any;
  source?: string;
  masterData?: MasterData | null;
  submitCounter?: number;
  setSubmitCounter?: React.Dispatch<number>;
  errors?: any;
};

const AdditionalInformationForm: React.FC<Props> = ({
  additionalInformation,
  source,
  masterData,
  submitCounter,
  setSubmitCounter,
  errors,
}) => {
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(false);
  const [initFieldsValue, setInitFieldsValue] = useState<FieldType>({});

  const editOnChange = () => {
    setEditState(!editState);
    // if (editState === false) {
    //   setEverWorked('you-choose');
    //   setDisease('you-choose');
    //   setHaveRelation('you-choose');
    // }
  };

  const [index, setIndex] = useState<number>(0);

  type Tprops1 = {
    index: number;
  };

  const TabContent: React.FC<Tprops1> = ({ index }) => {
    return (
      <div key={index} className="row">
        <div className="col-6 d-none">
          <div className="input-group-meta position-relative mb-15">
            <Form.Item<FieldType>
              name={['families', index.toString(), 'id']}
              className="mb-0"
            >
              <InputNumber />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Relation</label>
            <Form.Item<FieldType>
              name={['families', index.toString(), 'relation']}
              className="mb-0"
            >
              <Select
                className="w-100"
                placeholder="Your Family Relation"
                options={[
                  { value: 'Father', label: 'Father' },
                  { value: 'Mother', label: 'Mother' },
                  { value: 'Sibling', label: 'Sibling' },
                  { value: 'Spouse', label: 'Spouse' },
                  { value: 'Children', label: 'Children' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Name</label>
            <Form.Item<FieldType>
              name={['families', index.toString(), 'name']}
              className="mb-0"
            >
              <Input placeholder="Your Relation Name" />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Gender</label>
            <Form.Item<FieldType>
              name={['families', index.toString(), 'gender']}
              className="mb-0"
            >
              <Select
                className="w-100"
                placeholder="Your Family Gender"
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Date of Birth</label>
            <Form.Item<FieldType>
              name={['families', index.toString(), 'dateOfBirth']}
            >
              <DatePicker
                className="w-100"
                placeholder="Select Date"
                // onChange={onChangeDate}
              />
            </Form.Item>
          </div>
        </div>
      </div>
    );
  };

  type Tprops2 = {
    index: number;
  };

  const DisplayedTabContent: React.FC<Tprops2> = ({ index }) => {
    return (
      <div key={index} className="row">
        <div className="col-6 d-none">
          <div className="input-group-meta position-relative mb-15">
            <p className="mb-0">{additionalInformation?.families[index]?.id}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Relation</label>
            <p className="mb-0">
              {additionalInformation?.families[index]?.relation}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Name</label>
            <p className="mb-0">
              {additionalInformation?.families[index]?.name}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Gender</label>
            <p className="mb-0">
              {additionalInformation?.families[index]?.gender}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label className="fw-bold">Date of Birth</label>
            <p className="mb-0">
              {dayjs(
                additionalInformation?.families[index]?.dateOfBirth,
              ).format('YYYY-MM-DD')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const initialItems: any[] = [];
  const displayedInit: any[] = [];
  const [activeKey, setActiveKey] = useState('');
  const [items, setItems] = useState(initialItems);
  const [displayedItems, setDisplayedItems] = useState(displayedInit);
  const newTabIndex = useRef(0);

  const onChangeTabs = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = (tabTotal: number) => {
    let newPanes = [...items];
    let newDisplayed = [...displayedItems];
    let indexTab = index;
    for (let i = 0; i < tabTotal; i++) {
      const newActiveKey = `newTab${newTabIndex.current++}`;
      newPanes.push({
        familyId: additionalInformation?.families[indexTab]?.id,
        label: `Relation ${indexTab + 1}`,
        children: <TabContent index={indexTab} />,
        key: newActiveKey,
      });

      newDisplayed.push({
        familyId: additionalInformation?.families[indexTab]?.id,
        label: `Relation ${indexTab + 1}`,
        children: <DisplayedTabContent index={indexTab} />,
        key: newActiveKey,
        closable: false,
      });
      indexTab++;
      setActiveKey(newActiveKey);
    }
    setIndex(indexTab);
    setItems(newPanes);
    setDisplayedItems(newDisplayed);
    // console.log('add tab');
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    const newDisplayedPanes = displayedItems.filter(
      (item) => item.key !== targetKey,
    );

    setItems(newPanes);
    setDisplayedItems(newDisplayedPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add(1);
    } else {
      remove(targetKey);
    }
  };

  const [everWorked, setEverWorked] = useState<string>('you-choose');
  const everWorkedChange = (e: RadioChangeEvent) => {
    setEverWorked(e.target.value);
  };

  const [disease, setDisease] = useState<string>('you-choose');
  const diseaseChange = (e: RadioChangeEvent) => {
    setDisease(e.target.value);
  };

  const [haveRelation, setHaveRelation] = useState<string>('you-choose');
  const haveRelationChange = (e: RadioChangeEvent) => {
    setHaveRelation(e.target.value);
  };

  const handleSubmit: FormProps<FieldType>['onFinish'] = () => {
    if (editState) {
      // jalankan simpan data
      let values = form.getFieldsValue();
      values = {
        ...values,
        families: {
          ...initFieldsValue?.families,
          ...values?.families,
        },
      };

      let filteredFamilies: any = {};
      for (const key in values.families) {
        const familyIdMatch = values.families[key].id;
        if (items.some((familyId) => familyId.familyId === familyIdMatch)) {
          filteredFamilies[key] = values.families[key];
        }
      }

      values = {
        ...values,
        families: { ...filteredFamilies },
        others: {
          ...values.others,
          emergencyContactId: additionalInformation?.emergency_contact?.id,
        },
      };
      console.log('submittedValueFamilies: ', values);
      console.log('submittedTabs: ', items);
      console.log('filteredFamilies: ', filteredFamilies);

      // if (submitCounter && setSubmitCounter) {
      //   setSubmitCounter(submitCounter + 1);
      // }
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

  const [relationTotal, setRelationTotal] = useState(0);
  const [loopTotal, setLoopTotal] = useState(0);

  useEffect(() => {
    let everWorkedAnswer: string | Dayjs;
    let everWorkedAnswer2: string | Dayjs;
    let medicalCondition: string;
    let medicalCondition2: string | Dayjs;
    let colleagueName: string;
    let colleagueName2: string;
    if (additionalInformation) {
      if (
        additionalInformation?.candidate_questions[1]?.answer === ',' ||
        additionalInformation?.candidate_questions[1]?.answer === 'no'
      ) {
        everWorkedAnswer = 'No';
        setEverWorked('No');
      } else {
        let words = additionalInformation?.candidate_questions[1]?.answer;
        const separatedArray = words.split(',');
        everWorkedAnswer = dayjs(separatedArray[0]).format('YYYY-MM');
        everWorkedAnswer2 = dayjs(separatedArray[1]).format('YYYY-MM');
        setEverWorked('Yes');
      }

      if (
        additionalInformation?.candidate_questions[2]?.answer === ',' ||
        additionalInformation?.candidate_questions[2]?.answer === 'no'
      ) {
        medicalCondition = 'No';
        setDisease('No');
      } else {
        let words = additionalInformation?.candidate_questions[2]?.answer;
        const separatedArray = words.split(',');
        medicalCondition = separatedArray[0];
        medicalCondition2 = dayjs(separatedArray[1]).format('YYYY');
        setDisease('Yes');
      }

      if (
        additionalInformation?.candidate_questions[3]?.answer === ',' ||
        additionalInformation?.candidate_questions[3]?.answer === 'no'
      ) {
        colleagueName = 'No';
        setHaveRelation('No');
      } else {
        let words = additionalInformation?.candidate_questions[3]?.answer;
        const separatedArray = words.split(',');
        colleagueName = separatedArray[0];
        colleagueName2 = separatedArray[1];
        setHaveRelation('Yes');
      }
    }

    type familyField = {
      [id: string]: {
        id?: number;
        relation?: string;
        name?: string;
        gender?: string;
        dateOfBirth?: string | Dayjs;
      };
    };
    let familiesField: familyField;
    if (additionalInformation) {
      const families = additionalInformation?.families;
      familiesField = families.reduce((acc: any, item: any, index: number) => {
        acc[index] = {
          id: item.id,
          relation: item.relation,
          name: item.name,
          gender: item.gender,
          dateOfBirth: dayjs(item.dateOfBirth),
        };
        return acc;
      }, {});
    }

    if (source && additionalInformation) {
      setInitFieldsValue((prevState) => ({
        ...prevState,
        families: familiesField,
        everWorkedOption: everWorkedAnswer === 'No' ? 'No' : 'Yes',
        diseaseOption: medicalCondition === 'No' ? 'No' : 'Yes',
        relationOption: colleagueName === 'No' ? 'No' : 'Yes',
        others: {
          emergencyContactId: additionalInformation?.emergency_contact?.id,
          emergencyContactName: additionalInformation?.emergency_contact?.name,
          emergencyContactPhoneNumber:
            additionalInformation?.emergency_contact?.phoneNumber,
          emergencyContactRelation:
            additionalInformation?.emergency_contact?.relationStatus,
          source: source,
          everWorkedMonth:
            everWorkedAnswer === 'No' ? '' : dayjs(everWorkedAnswer),
          everWorkedYear:
            everWorkedAnswer2 === 'No' ? '' : dayjs(everWorkedAnswer2),
          diseaseName: medicalCondition,
          diseaseYear:
            medicalCondition2 === 'No' ? '' : dayjs(medicalCondition2),
          relationName: colleagueName,
          relationPosition: colleagueName2,
        },
      }));
      form.setFieldsValue(initFieldsValue);
    }
    console.log('function - (additional) - initFieldsValue: ', initFieldsValue);

    if (loopTotal < 1 && additionalInformation && initFieldsValue) {
      if (additionalInformation.families.length > 0) {
        setRelationTotal(additionalInformation.families.length);
        add(additionalInformation.families.length);
        setLoopTotal((prevState) => prevState + 1);
      }
    }
  }, [additionalInformation]);

  // useEffect(() => {
  //   if (loopTotal < relationTotal && additionalInformation) {
  //     add();
  //   }
  // }, [relationTotal]);

  // console.log('(additional) - initFieldsValue: ', initFieldsValue);

  // useEffect(() => {
  //   console.log(
  //     'useEffect - (additional) - initFieldsValue: ',
  //     initFieldsValue,
  //   );
  //   form.setFieldsValue(initFieldsValue);
  // }, [additionalInformation]);
  useEffect(() => {
    console.log(
      'useEffect2 - (additional) - initFieldsValue: ',
      initFieldsValue,
    );
    form.setFieldsValue(initFieldsValue);
  }, [initFieldsValue]);
  return (
    <>
      {additionalInformation === null && <EmployJobDetailSkeleton rows={2} />}
      {additionalInformation !== null && (
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
            name="background-experience-form"
            variant="filled"
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <div className="row">
              <label className="fw-bold sub-section-profile">
                Family Structure
              </label>
              {editState && (
                <Tabs
                  type="editable-card"
                  onChange={onChangeTabs}
                  activeKey={activeKey}
                  onEdit={onEdit}
                  items={items}
                />
              )}
              {!editState && (
                <Tabs
                  type="editable-card"
                  hideAdd
                  onChange={onChangeTabs}
                  activeKey={activeKey}
                  items={displayedItems}
                />
              )}

              <label className="fw-bold mt-5 sub-section-profile">Others</label>
              <div className="col-3">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Emergency Contact Relation</label>
                  <Form.Item<FieldType>
                    name={['others', 'emergencyContactRelation']}
                    className="mb-0"
                  >
                    {editState && (
                      <Select
                        className="w-100"
                        placeholder="Your Emergency Contact Relation"
                        options={[
                          { value: 'Father', label: 'Father' },
                          { value: 'Mother', label: 'Mother' },
                          { value: 'Sibling', label: 'Sibling' },
                          { value: 'Spouse', label: 'Spouse' },
                          { value: 'Children', label: 'Children' },
                        ]}
                        disabled={!editState}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {initFieldsValue?.others?.emergencyContactRelation}
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="col-3">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Name</label>
                  <Form.Item<FieldType>
                    name={['others', 'emergencyContactName']}
                    className="mb-0"
                  >
                    {editState && (
                      <Input
                        placeholder="Your Emergency Contact Name"
                        disabled={!editState}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {initFieldsValue?.others?.emergencyContactName}
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="col-3">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Phone Number</label>
                  <Form.Item<FieldType>
                    name={['others', 'emergencyContactPhoneNumber']}
                    className="mb-0"
                  >
                    {editState && (
                      <Input
                        placeholder="Your Emergency Contact Phone Number"
                        disabled={!editState}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {initFieldsValue?.others?.emergencyContactPhoneNumber}
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="col-3">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">Source*</label>
                  <Form.Item<FieldType>
                    name={['others', 'source']}
                    className="mb-0"
                  >
                    {editState && (
                      <Select
                        className="w-100"
                        placeholder="Select Source"
                        showSearch
                        mode="tags"
                        maxCount={1}
                        filterOption={(input, option) =>
                          (option?.label.toLowerCase() ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        /* Fetched Data */
                        options={[
                          { value: 'Partnership', label: 'Partnership' },
                          { value: 'Jobstreet', label: 'Jobstreet' },
                          { value: 'Job Fair', label: 'Job Fair' },
                        ]}
                      />
                    )}
                    {!editState && (
                      <p className="mb-0">{initFieldsValue?.others?.source}</p>
                    )}
                  </Form.Item>
                </div>
              </div>
              {/* <div className="col-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold">How long your notice period?*</label>
                <Form.Item<FieldType>
                  name={['others', 'noticePeriod']}
                  className="mb-0"
                >
                  {editState && (
                    <Select
                      className="w-100"
                      placeholder="Your Notice Period"
                      disabled={!editState}
                      options={[
                        { value: 'Ready join now', label: 'Ready join now' },
                        {
                          value: 'Less than 1 month',
                          label: 'Less than 1 month',
                        },
                        { value: '1 month', label: '1 month' },
                        { value: '2 months', label: '2 months' },
                        { value: '3 months', label: '3 months' },
                        {
                          value: 'More than 3 months',
                          label: 'More than 3 months',
                        },
                      ]}
                    />
                  )}
                  {!editState && (
                    <p className="mb-0">
                      {initFieldsValue?.others?.noticePeriod}
                    </p>
                  )}
                </Form.Item>
              </div>
            </div> */}
              <div className="col-12">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Have you ever worked in Erajaya group of companies?*
                  </label>
                  <Form.Item<FieldType>
                    name="everWorkedOption"
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please choose!',
                    //   },
                    // ]}
                  >
                    {editState && (
                      <Radio.Group
                        onChange={everWorkedChange}
                        value={everWorked}
                        disabled={!editState}
                      >
                        <Radio className="d-flex" value="No">
                          No
                        </Radio>
                        <Radio className="d-flex" value="Yes">
                          Yes
                        </Radio>
                      </Radio.Group>
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {initFieldsValue?.others?.everWorkedMonth !== 'No'
                          ? `${dayjs(initFieldsValue?.others?.everWorkedMonth).format('YYYY-MM')}, ${dayjs(initFieldsValue?.others?.everWorkedYear).format('YYYY-MM')}`
                          : 'No'}
                      </p>
                    )}
                  </Form.Item>
                  {editState && everWorked === 'Yes' && (
                    <div className="row mt-2">
                      <div className="col-3">
                        <Form.Item<FieldType>
                          name={['others', 'everWorkedMonth']}
                          className="mb-0"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please input year!',
                          //   },
                          // ]}
                        >
                          <DatePicker
                            className="w-100"
                            placeholder="Start Year"
                            picker="month"
                            disabled={!editState}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-3">
                        <Form.Item<FieldType>
                          name={['others', 'everWorkedYear']}
                          className="mb-0"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please input year!',
                          //   },
                          // ]}
                        >
                          <DatePicker
                            className="w-100"
                            placeholder="End Year"
                            picker="month"
                            disabled={!editState}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Do you have any prior medical conditions, illnesses, or
                    congenital diseases?*
                  </label>
                  <Form.Item<FieldType>
                    name="diseaseOption"
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please choose!',
                    //   },
                    // ]}
                  >
                    {editState && (
                      <Radio.Group
                        onChange={diseaseChange}
                        value={disease}
                        disabled={!editState}
                      >
                        <Radio className="d-flex" value="No">
                          No
                        </Radio>
                        <Radio className="d-flex" value="Yes">
                          Yes
                        </Radio>
                      </Radio.Group>
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {initFieldsValue?.others?.diseaseName !== 'No'
                          ? `${initFieldsValue?.others?.diseaseName}, ${dayjs(initFieldsValue?.others?.diseaseYear).format('YYYY')}`
                          : 'No'}
                      </p>
                    )}
                  </Form.Item>
                  {editState && disease === 'Yes' && (
                    <div className="row mt-2">
                      <div className="col-3">
                        <Form.Item<FieldType>
                          name={['others', 'diseaseName']}
                          className="mb-0"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please input medical condition!',
                          //   },
                          // ]}
                        >
                          <Input
                            placeholder="Medical Condition"
                            disabled={!editState}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-3">
                        <Form.Item<FieldType>
                          name={['others', 'diseaseYear']}
                          className="mb-0"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please input year!',
                          //   },
                          // ]}
                        >
                          <DatePicker
                            className="w-100"
                            placeholder="Select Year"
                            picker="year"
                            disabled={!editState}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="input-group-meta position-relative mb-15">
                  <label className="fw-bold">
                    Do you have any friends, colleague, relative or family who
                    is working at Erajaya Group Companies?*
                  </label>
                  <Form.Item<FieldType>
                    name="relationOption"
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please choose!',
                    //   },
                    // ]}
                  >
                    {editState && (
                      <Radio.Group
                        onChange={haveRelationChange}
                        value={haveRelation}
                        disabled={!editState}
                      >
                        <Radio className="d-flex" value="No">
                          No
                        </Radio>
                        <Radio className="d-flex" value="Yes">
                          Yes
                        </Radio>
                      </Radio.Group>
                    )}
                    {!editState && (
                      <p className="mb-0">
                        {initFieldsValue?.others?.relationName !== 'No'
                          ? `${initFieldsValue?.others?.relationName}, ${initFieldsValue?.others?.relationPosition}`
                          : 'No'}
                      </p>
                    )}
                  </Form.Item>
                  {editState && haveRelation === 'Yes' && (
                    <div className="row mt-2">
                      <div className="col-3">
                        <Form.Item<FieldType>
                          name={['others', 'relationName']}
                          className="mb-0"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please input name!',
                          //   },
                          // ]}
                        >
                          <Input placeholder="Name" disabled={!editState} />
                        </Form.Item>
                      </div>
                      <div className="col-3">
                        <Form.Item<FieldType>
                          name={['others', 'relationPosition']}
                          className="mb-0"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please input position!',
                          //   },
                          // ]}
                        >
                          <Input placeholder="Position" disabled={!editState} />
                        </Form.Item>
                      </div>
                    </div>
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
        </div>
      )}
    </>
  );
};

export default AdditionalInformationForm;
