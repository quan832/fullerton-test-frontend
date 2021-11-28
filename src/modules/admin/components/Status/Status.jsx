import React from 'react';
import { Tag } from 'antd';
import { STATUS } from 'utils/ENUM';
import { CheckCircleOutlined, SyncOutlined, MinusCircleOutlined } from '@ant-design/icons';

const renderTag = (type) => {
  switch (type) {
    case STATUS.approve:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Approved
        </Tag>
      );
    case STATUS.pending:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Pending
        </Tag>
      );
    case STATUS.reject:
      return (
        <Tag icon={<MinusCircleOutlined />} color="default">
          Rejected
        </Tag>
      );
  }
};

export default function Status({ type }) {
  return <>{renderTag(type)}</>;
}
