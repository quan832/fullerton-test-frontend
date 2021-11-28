import React from 'react';
import { Table, Tag, Space, Menu, Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';

const columns = [
  {
    title: 'Booking Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Booking Place',
    dataIndex: 'place',
    key: 'place'
  },
  {
    title: 'Booking Status',
    key: 'status',
    dataIndex: 'status',
    render: (tags) => (
      <>
        {/* {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })} */}
      </>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => <ButtonStyled dangerLight>Reject</ButtonStyled>
  }
];

const expandedRowRender = () => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      key: 'state',
      render: () => (
        <span>
          <Badge status="success" />
          Finished
        </span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => <ButtonStyled purple>Approve</ButtonStyled>
    }
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56'
    });
  }
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default function TableAdmin() {
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00'
    });
  }

  return (
    <Table
      style={{ marginBottom: '25px' }}
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      bordered
      title={() => 'Booking Confirm'}
      dataSource={data}
      pagination={false}
    />
  );
}
