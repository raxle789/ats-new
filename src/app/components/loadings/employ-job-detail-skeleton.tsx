'use client';

import { Skeleton, List } from 'antd';

const EmployJobDetailSkeleton = ({ rows }) => {
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={Array.from({ length: rows }, (_, i) => i)}
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
