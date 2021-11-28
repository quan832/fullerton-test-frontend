import React from 'react';
import Header from '../components/Header/Header';
import { DashboardContainerStyled, DashboardLastChild } from './DashboardContainer.styled';
import { Tabs, Pagination } from 'antd';
import BookingList from '../components/BookingList/BookingList';
import { FlexDiv } from 'stylesheet/div/div.styled';
import { useDispatch, useSelector } from 'react-redux';
import DashboardAction from '../actions/dashboardAction';
import { Spin } from 'antd';

const { TabPane } = Tabs;

export default function DashboardContainer() {
  const { total, page, isFetching } = useSelector((state) => state.dashboard.bookings);

  const dispatch = useDispatch();

  const onChangePage = (page) => {
    dispatch(DashboardAction.fetchBookings({ page: page }));
  };

  return (
    <DashboardContainerStyled>
      <Header />
      <div className="mt-20 pl-5">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Upcoming" key="1" style={{ height: '100%' }}>
            <Spin spinning={isFetching}>
              <BookingList />
            </Spin>
          </TabPane>
          <TabPane tab="Past bookings" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
      <DashboardLastChild className="mt-20">
        <FlexDiv>
          <Pagination
            total={total}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={4}
            defaultCurrent={page}
            onChange={(page) => onChangePage(page)}
          />
        </FlexDiv>
      </DashboardLastChild>
    </DashboardContainerStyled>
  );
}
