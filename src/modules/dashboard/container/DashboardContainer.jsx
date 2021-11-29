import React from 'react';
import Header from '../components/Header/Header';
import { DashboardContainerStyled, DashboardLastChild } from './DashboardContainer.styled';
import { Tabs, Pagination } from 'antd';
import BookingList from '../components/BookingList/BookingList';
import { FlexDiv } from 'stylesheet/div/div.styled';
import { useDispatch, useSelector } from 'react-redux';
import DashboardAction from '../actions/dashboardAction';
import { Spin } from 'antd';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import BookingModal from '../components/BookingModal/BookingModal';
import { TYPE_MODAL } from 'utils/ENUM';

const { TabPane } = Tabs;

const renderAddBooking = (openAddModal) => {
  return (
    <ButtonStyled purple onClick={openAddModal}>
      Add Booking
    </ButtonStyled>
  );
};

export default function DashboardContainer() {
  const { total, page, isFetching } = useSelector((state) => state.dashboard.bookings);
  const {
    bookingModal: { isOpenModal, modalOpenId, type }
  } = useSelector((state) => state.dashboard);

  const onCloseModal = () => {
    dispatch(DashboardAction.closeBookingModal());
  };

  const onOpenAddModal = () => {
    dispatch(DashboardAction.openBookingModal(null, TYPE_MODAL.add));
  };

  const dispatch = useDispatch();

  const onChangePage = (page) => {
    dispatch(DashboardAction.fetchBookings({ page: page }));
  };

  return (
    <DashboardContainerStyled>
      <Header title="Bookings" />
      <div className="mt-20 pl-5">
        <Tabs defaultActiveKey="1" tabBarExtraContent={renderAddBooking(onOpenAddModal)}>
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
      <DashboardLastChild className="mt-20 pr-30">
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
      <BookingModal isOpen={isOpenModal} id={modalOpenId} closeModal={onCloseModal} type={type} />
    </DashboardContainerStyled>
  );
}
