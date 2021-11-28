import React from 'react';
import { Table, Tag, Space, Menu, Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { FORMAT_DATE, STATUS } from 'utils/ENUM';
import { useSelector } from 'react-redux';
import Status from '../Status/Status';
import moment from 'moment';

const columns = [
  {
    title: 'Booking Title',
    dataIndex: 'title',
    key: 'title',
    sorter: {
      compare: (a, b) => a.title.localeCompare(b.title)
    },
    render: (text) => <a>{text}</a>,
    width: '20%'
  },
  {
    title: 'Booking Place',
    dataIndex: 'place',
    key: 'place',
    sorter: {
      compare: (a, b) => a.place.localeCompare(b.place)
    },
    width: '30%'
  },
  {
    title: 'Booking User',
    dataIndex: 'email',
    key: 'email',
    sorter: {
      compare: (a, b) => a.place.localeCompare(b.place)
    },
    width: '15%'
  },
  {
    title: 'Booking Category',
    dataIndex: 'category',
    key: 'category',
    sorter: {
      compare: (a, b) => a.category - b.category
    },
    width: '20%'
  },
  {
    title: 'Booking Status',
    key: 'status',
    filters: [
      { text: 'Pending', value: STATUS.pending },
      { text: 'Approve', value: STATUS.approve },
      { text: 'Rejected', value: STATUS.reject }
    ],
    filterMode: 'tree',
    onFilter: (value, record) => record.status.includes(value),
    width: '15%',
    dataIndex: 'status',
    render: (status) => (
      <>
        <Status type={status} />
      </>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return record.status === STATUS.pending ? (
        <ButtonStyled dangerLight>Reject</ButtonStyled>
      ) : (
        <ButtonStyled style={{ opacity: '0' }}></ButtonStyled>
      );
    }
  }
];

const renderBadge = (status) => {
  if (status) {
    return (
      <span>
        <Badge status="success" />
        Approved
      </span>
    );
  }

  return (
    <span>
      <Badge status="processing" />
      Processing
    </span>
  );
};

const expandedRowRender = (id, date) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'startDate',
      key: `startDate`,
      render: (startDate) => moment(startDate).format(FORMAT_DATE),
      width: '50%'
    },
    {
      title: 'Status',
      dataIndex: 'isConfirm',
      key: `isConfirm`,
      render: (isConfirm) => renderBadge(isConfirm)
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: `operation`,
      width: '20%',
      render: () => <ButtonStyled purple>Approve</ButtonStyled>
    }
  ];

  return <Table key={id} columns={columns} dataSource={date} pagination={false} />;
};

export default function TableAdmin() {
  const { data } = useSelector((state) => state.admin);

  return (
    <Table
      rowKey={(record) => record.id}
      style={{ marginBottom: '25px' }}
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          return expandedRowRender(record.id, record.date);
        }
      }}
      bordered
      title={() => 'Booking Confirm'}
      dataSource={data}
      pagination={false}
    />
  );
}
