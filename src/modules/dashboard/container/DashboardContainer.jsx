import React from 'react';
import Header from '../components/Header/Header';
import { DashboardContainerStyled, DashboardLastChild } from './DashboardContainer.styled';
import { Tabs, Pagination } from 'antd';
import BookingList from '../components/BookingList/BookingList';
import { FlexDiv } from 'stylesheet/div/div.styled';
const { TabPane } = Tabs;

export default function DashboardContainer() {
  return (
    <DashboardContainerStyled>
      <Header />
      <div className="mt-20 pl-5">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Upcoming" key="1" style={{ height: '100%' }}>
            <BookingList />
          </TabPane>
          <TabPane tab="Past bookings" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
      <DashboardLastChild className="mt-20">
        <FlexDiv>
          <Pagination
            total={85}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={20}
            defaultCurrent={1}
          />
        </FlexDiv>
      </DashboardLastChild>
    </DashboardContainerStyled>
  );
}
