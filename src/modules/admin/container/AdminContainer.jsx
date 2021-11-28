import { Pagination, Spin } from 'antd';
import Header from 'modules/dashboard/components/Header/Header';
import {
  DashboardContainerStyled,
  DashboardLastChild
} from 'modules/dashboard/container/DashboardContainer.styled';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../actions/adminAction';
import TableAdmin from '../components/Table/Table';

export default function AdminContainer() {
  const dispatch = useDispatch();

  const { total, page, isFetching } = useSelector((state) => state.admin);

  const onFetchAdminBooking = () => {
    dispatch(AdminAction.fetchBookings({ page: page }));
  };

  const onChangePage = (page) => {
    dispatch(AdminAction.fetchBookings({ page: page }));
  };

  useEffect(() => {
    onFetchAdminBooking();
  }, []);

  return (
    <DashboardContainerStyled>
      <Header title="Admin Bookings" />
      <div
        className="mt-20 pb-100"
        style={{ position: 'relative', minHeight: '-webkit-fill-available' }}>
        <Spin spinning={isFetching} style={{ minHeight: '-webkit-fill-available' }}>
          <TableAdmin />
        </Spin>
        <DashboardLastChild className="mb-50 mt-100">
          <Pagination
            total={total}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={8}
            defaultCurrent={page}
            onChange={(page) => onChangePage(page)}
          />
        </DashboardLastChild>
      </div>
    </DashboardContainerStyled>
  );
}
