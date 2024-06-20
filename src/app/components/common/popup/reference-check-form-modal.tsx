'use client';

import React, { ReactNode, useState } from 'react';
import ReferenceCheckFormItem from '../../tab-items/reference-check-form-item';
import dynamic from 'next/dynamic';
// import ReferenceCheckResultItem from '../../tab-items/reference-check-result-form-item';
// import RefereeFormItem from '../../tab-items/referee-form-item';
import { Modal, Tabs } from 'antd';

const { TabPane } = Tabs;

// const ReferenceCheckResultItem = dynamic(
//   () => import('../../tab-items/reference-check-result-item'),
// );

// const RefereeFormItem = dynamic(
//   () => import('../../tab-items/referee-form-item'),
// );

type Props = {
  titleModal?: string;
  children?: ReactNode;
  isOpenModal?: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
};

const ReferenceCheckFormModal: React.FC<Props> = ({
  isOpenModal,
  setIsOpenModal,
}) => {
  // const tabItems = [
  //   { key: 'referee', label: 'Referee', content: <RefereeFormItem /> },
  //   { key: 'result', label: 'Result', content: <ReferenceCheckResultItem /> },
  // ];

  const [tabIndex, setTabIndex] = useState(0);

  const [activeTabKey, setActiveTabKey] = useState(
    `referenceCheckFormItem#${tabIndex}`,
  );

  const [tabItems, setTabItems] = useState([
    {
      key: activeTabKey,
      label: `Reference Check Form Item ${tabIndex}`,
      children: <ReferenceCheckFormItem index={tabIndex} />,
    },
  ]);

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  function handleTabChange(newActiveKey: string) {
    setActiveTabKey(newActiveKey);
  }

  function add() {
    if (tabItems?.length < 3 && tabIndex <= 2) {
      const newActiveKey = `referenceCheckFormItem#${tabIndex + 1}`;

      setTabItems([
        ...tabItems,
        {
          key: newActiveKey,
          label: `Reference Check Form Item ${tabIndex + 1}`,
          children: <ReferenceCheckFormItem index={tabIndex + 1} />,
        },
      ]);

      setActiveTabKey(newActiveKey);

      setTabIndex(tabIndex + 1);
    }
  }

  function remove(targetKey) {
    if (tabItems?.length > 1) {
      const newTabItems = tabItems
        ?.filter((item) => item?.key !== targetKey)
        ?.toSorted((a, b) => {
          const keyA = a?.key?.toLowerCase();

          const keyB = b?.key?.toLowerCase();

          if (keyA < keyB) {
            return -1;
          }

          if (keyA > keyB) {
            return 1;
          }

          return 0;
        })
        ?.map((item, index) => {
          setTabIndex(index);

          return {
            key: `referenceCheckFormItem#${index}`,
            label: `Reference Check Form Item ${index}`,
            children: item?.children,
          };
        });

      setTabItems(newTabItems);

      const activeTabKeyArray = activeTabKey?.split('#');

      const activeTabKeyIndex = Number(
        activeTabKeyArray[activeTabKeyArray?.length - 1],
      );

      const targetKeyArray = targetKey?.split('#');

      const targetKeyIndex = Number(targetKeyArray[targetKeyArray?.length - 1]);

      // console.info(activeTabKey);

      // console.info(targetKeyIndex);

      if (activeTabKeyIndex >= targetKeyIndex) {
        const newActiveTabKey = (() => {
          let newActiveTabIndex = -1;

          if (activeTabKeyIndex > targetKeyIndex) {
            newActiveTabIndex = activeTabKeyIndex - 1;
          } else if (activeTabKeyIndex === targetKeyIndex) {
            // console.info('ayam');

            if (activeTabKeyIndex === 2) {
              newActiveTabIndex = activeTabKeyIndex - 1;
            } else {
              newActiveTabIndex = activeTabKeyIndex;
            }
          }

          setTabIndex(newActiveTabIndex);

          return newTabItems[newActiveTabIndex]?.key;
        })();

        setActiveTabKey(newActiveTabKey);
      }

      // if(activeTabKey === targetKey){
      //   const closestTabKey =
      // }
    }

    // let newActiveKey = activeTabKey;

    // let lastIndex = -1;

    // tabItems.forEach((item, i) => {
    //   if (item.key === targetKey) {
    //     lastIndex = i - 1;
    //   }
    // });

    // const newPanes = tabItems.filter((item) => item.key !== targetKey);

    // if (newPanes.length && newActiveKey === targetKey) {
    //   if (lastIndex >= 0) {
    //     newActiveKey = newPanes[lastIndex].key;
    //   } else {
    //     newActiveKey = newPanes[0].key;
    //   }
    // }

    // const newTabItems = tabItems?.filter((item) => item?.key !== targetKey);

    // setTabItems(newTabItems);

    // if (activeTabKey === targetKey) {
    //   const closestTabKey = tabItems.forEach((item) => {});
    // }

    // // setActiveTabKey(newActiveKey);

    // setTabIndex(newTabItems?.length - 1);
  }

  function onEdit(
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  }

  return (
    <>
      <Modal
        title="Reference Check Form"
        maskClosable={false}
        centered
        open={isOpenModal}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <div className="mt-3 overflow-x-hidden mb-5">
          <Tabs
            type="editable-card"
            onChange={handleTabChange}
            activeKey={activeTabKey}
            onEdit={onEdit}
            items={tabItems}
          />
        </div>
      </Modal>
    </>
  );
};

export default ReferenceCheckFormModal;
