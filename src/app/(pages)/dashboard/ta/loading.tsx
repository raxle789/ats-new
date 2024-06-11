'use client';

import { Skeleton, List } from 'antd';
import React from 'react';

type Props = {
  rows: number;
};

const EmployJobDetailSkeleton: React.FC<Props> = ({ rows }) => {
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={Array.from({ length: rows ?? 4 }, (_, i) => i)}
        renderItem={(item) => (
          <List.Item key={item}>
            <Skeleton active />
          </List.Item>
        )}
      />
    </>
  );
};

export default EmployJobDetailSkeleton;
