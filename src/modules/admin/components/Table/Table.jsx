import React from 'react';
import { Table, Badge } from 'antd';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { FORMAT_DATE, STATUS } from 'utils/ENUM';
import { useDispatch, useSelector } from 'react-redux';
import Status from '../Status/Status';
import moment from 'moment';
import AdminAction from 'modules/admin/actions/adminAction';
import { FlexDiv } from 'stylesheet/div/div.styled';
import { ReloadOutlined } from '@ant-design/icons';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

const renderBadge = (confirm, status) => {
  if (status === STATUS.reject) {
    return (
      <span>
        <Badge status="default" />
        Rejected
      </span>
    );
  } else if (status === STATUS.approve && !confirm) {
    return (
      <span>
        <Badge status="processing" />
        Reviewed
      </span>
    );
  } else {
    if (confirm) {
      return (
        <span>
          <Badge status="success" />
          Finished
        </span>
      );
    }

    return (
      <span>
        <Badge status="processing" />
        Processing
      </span>
    );
  }
};

const expandedRowRender = (id, date, status, onApprove) => {
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
      render: (isConfirm) => renderBadge(isConfirm, status)
    },
    {
      title: 'Action',
      dataIndex: 'isActive',
      key: `isActive`,
      width: '20%',
      render: (isActive, record) => {
        return (
          // disable when date is not active
          <ButtonStyled
            purple
            onClick={() => onApprove(id, record.id)}
            disabled={!isActive || record.isConfirm}>
            Approve
          </ButtonStyled>
        );
      }
    }
  ];

  return <Table key={id} columns={columns} dataSource={date} pagination={false} />;
};

export default function TableAdmin() {
  const { data, page } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const onRejectedBooking = (id, description) => {
    if (id) {
      const payload = { status: STATUS.reject, description };
      dispatch(AdminAction.updateBooking(id, payload));
      dispatch(AdminAction.closeModal());
    }
  };

  const onApprove = (id, dateId) => {
    const payload = { dateId: dateId };
    dispatch(AdminAction.updateBooking(id, payload));
  };

  const onRefreshPage = () => {
    dispatch(AdminAction.fetchBookings({ page: page }));
  };

  const onOpenModal = (id) => {
    dispatch(AdminAction.openModal(id));
  };

  const renderHeaderTable = () => {
    return (
      <FlexDiv alignCenter spaceBetween>
        <span>Booking Confirm</span>
        <span style={{ cursor: 'pointer' }} onClick={onRefreshPage}>
          Refresh <ReloadOutlined style={{ marginLeft: '5px' }} />
        </span>
      </FlexDiv>
    );
  };

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
          <ButtonStyled dangerLight onClick={() => onOpenModal(record.id)}>
            Reject
          </ButtonStyled>
        ) : (
          <ButtonStyled style={{ opacity: '0' }}></ButtonStyled>
        );
      }
    }
  ];

  return (
    <>
      <Table
        rowKey={(record) => record.id}
        style={{ marginBottom: '25px' }}
        className="components-table-demo-nested"
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            return expandedRowRender(record.id, record.date, record.status, onApprove);
          }
        }}
        bordered
        title={() => renderHeaderTable()}
        dataSource={data}
        pagination={false}
      />
      <FeedbackModal onOk={onRejectedBooking} />
    </>
  );
}
