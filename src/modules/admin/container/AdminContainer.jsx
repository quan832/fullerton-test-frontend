import { Pagination } from 'antd';
import Header from 'modules/dashboard/components/Header/Header';
import {
  DashboardContainerStyled,
  DashboardLastChild
} from 'modules/dashboard/container/DashboardContainer.styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { FlexDiv } from 'stylesheet/div/div.styled';
import TableAdmin from '../components/Table/Table';

export default function AdminContainer() {
  const dispatch = useDispatch();

  return (
    <DashboardContainerStyled>
      <Header title="Admin Bookings" />
      <div
        className="mt-20 pb-100"
        style={{ position: 'relative', minHeight: '-webkit-fill-available' }}>
        <TableAdmin />
        <DashboardLastChild className="mb-50 mt-100">
          <Pagination
            total={100}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={10}
            defaultCurrent={1}
            // onChange={(page) => onChangePage(page)}
          />
        </DashboardLastChild>
      </div>
    </DashboardContainerStyled>
  );
}
