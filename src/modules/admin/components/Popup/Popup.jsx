import React from 'react';
import { Popover } from 'antd';

export default function Popup({ title, Component, contentDescription = 'No feedback' }) {
  const content = <div>{contentDescription ? contentDescription : 'No feedback'}</div>;

  return (
    <Popover content={content} title={title}>
      {Component}
    </Popover>
  );
}
