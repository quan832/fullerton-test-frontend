import React from 'react';
import { Tag } from 'antd';
import { STATUS } from 'utils/ENUM';
import { CheckCircleOutlined, SyncOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Popup from '../Popup/Popup';

const renderTag = (type, feedback) => {
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
          Pending Review
        </Tag>
      );
    case STATUS.reject:
      return (
        <Popup
          title="Why reject?"
          contentDescription={feedback}
          Component={
            <Tag style={{ cursor: 'pointer' }} icon={<MinusCircleOutlined />} color="default">
              Rejected
            </Tag>
          }
        />
      );
  }
};

export default function Status({ type, feedback }) {
  return <>{renderTag(type, feedback)}</>;
}
