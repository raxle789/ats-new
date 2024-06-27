'use client';

import React, { ReactNode, useState, useRef } from 'react';
import ReferenceCheckFormItem from '../../tab-items/reference-check-form-item';
import dynamic from 'next/dynamic';
// import ReferenceCheckResultItem from '../../tab-items/reference-check-result-form-item';
// import RefereeFormItem from '../../tab-items/referee-form-item';
import { Modal, Tabs } from 'antd';

// const { TabPane } = Tabs;

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

  const tabIndex = useRef(0);

  const [activeTabKey, setActiveTabKey] = useState(
    `referenceCheckFormItem#${tabIndex.current}`,
  );

  const [tabItems, setTabItems] = useState([
    {
      key: activeTabKey,
      label: `Reference Check Form Item ${tabIndex.current + 1}`,
      children: <ReferenceCheckFormItem index={tabIndex.current} />,
    },
  ]);

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  function handleTabChange(newActiveKey: string) {
    setActiveTabKey(newActiveKey);
  }

  function add() {
    if (tabItems?.length < 3 && tabIndex.current < 3) {
      const newActiveTabKey = `referenceCheckFormItem#${++tabIndex.current}`;

      setTabItems([
        ...tabItems,
        {
          key: newActiveTabKey,
          label: `Reference Check Form Item ${tabIndex.current + 1}`,
          children: <ReferenceCheckFormItem index={tabIndex.current} />,
        },
      ]);

      setActiveTabKey(newActiveTabKey);
    }
  }

  function remove(targetKey: React.MouseEvent | React.KeyboardEvent | string) {
    if (tabItems?.length > 1 && tabIndex.current > 0) {
      const targetKeyIndex = tabItems?.findIndex(
        (tab) => tab?.key === targetKey,
      );

      const activeTabKeyArray = activeTabKey?.split('#');

      const activeTabKeyIndex = Number(
        activeTabKeyArray[activeTabKeyArray?.length - 1],
      );

      const newTabItems = tabItems
        ?.filter((tab) => tab?.key !== targetKey)
        ?.map((item, index) => {
          tabIndex.current = index;

          return {
            key: `referenceCheckFormItem#${index}`,
            label: `Reference Check Form Item ${index + 1}`,
            children: item?.children,
          };
        });

      let newActiveTabKey = activeTabKey;

      if (targetKeyIndex <= activeTabKeyIndex) {
        // console.info('ayam');

        const { key } =
          tabItems[
            activeTabKeyIndex - 1 < 0
              ? activeTabKeyIndex
              : activeTabKeyIndex - 1
          ];

        newActiveTabKey = key;
      }

      // console.info(newTabItems);

      // console.info(newActiveTabKey);

      // else {
      //   // console.info(activeTabKeyIndex);

      //   const { key } = activeTabKey;

      //   // console.info(key);

      //   newActiveTabKey = key;
      // }

      setActiveTabKey(newActiveTabKey);

      setTabItems(newTabItems);
    }

    // if (tabItems?.length > 1) {
    //   const newTabItems = tabItems
    //     ?.filter((item) => item?.key !== targetKey)
    //     ?.toSorted((a, b) => {
    //       const keyA = a?.key?.toLowerCase();
    //       const keyB = b?.key?.toLowerCase();
    //       if (keyA < keyB) {
    //         return -1;
    //       }
    //       if (keyA > keyB) {
    //         return 1;
    //       }
    //       return 0;
    //     })
    //     ?.map((item, index) => {
    //       setTabIndex(index);
    //       return {
    //         key: `referenceCheckFormItem#${index}`,
    //         label: `Reference Check Form Item ${index + 1}`,
    //         children: item?.children,
    //       };
    //     });
    //   setTabItems(newTabItems);
    //   const activeTabKeyArray = activeTabKey?.split('#');
    //   const activeTabKeyIndex = Number(
    //     activeTabKeyArray[activeTabKeyArray?.length - 1],
    //   );
    //   const targetKeyArray = targetKey?.split('#');
    //   const targetKeyIndex = Number(targetKeyArray[targetKeyArray?.length - 1]);
    //   // console.info(activeTabKey);
    //   // console.info(targetKeyIndex);
    //   if (activeTabKeyIndex >= targetKeyIndex) {
    //     const newActiveTabKey = (() => {
    //       let newActiveTabIndex = -1;
    //       if (activeTabKeyIndex > targetKeyIndex) {
    //         newActiveTabIndex = activeTabKeyIndex - 1;
    //       } else if (activeTabKeyIndex === targetKeyIndex) {
    //         // console.info('ayam');
    //         // if (activeTabKeyIndex === 2) {
    //         newActiveTabIndex = activeTabKeyIndex - 1;
    //         // } else {
    //         //   newActiveTabIndex = activeTabKeyIndex;
    //         // }
    //       }
    //       setTabIndex(newActiveTabIndex);
    //       return newTabItems[newActiveTabIndex]?.key;
    //     })();
    //     setActiveTabKey(newActiveTabKey);
    //   }
    //   // if(activeTabKey === targetKey){
    //   //   const closestTabKey =
    //   // }
    // }
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

  function handleEditTab(
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
        wrapClassName="custom-modal-wrapper assessment-result-modal"
      >
        <Tabs
          activeKey={activeTabKey}
          type="editable-card"
          items={tabItems}
          onEdit={handleEditTab}
          onChange={handleTabChange}
          {...(tabItems.length === 3 && { hideAdd: true })}
        />
      </Modal>
      {/* <div className="mt-3 overflow-x-hidden mb-5">
          <ReferenceCheckFormItem />
        </div> */}
    </>
  );
};

export default ReferenceCheckFormModal;
