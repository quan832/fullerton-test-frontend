import DashboardAction from 'modules/dashboard/actions/dashboardAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingItem from '../BookingItem/BookingItem';

const renderBookingItem = (data) => {
  return data.map((item, index) => (
    <BookingItem key={index} status={item.status} id={item.id} title={item.title} />
  ));
};

export default function BookingList() {
  const dispatch = useDispatch();

  const [bookingList, setBookingList] = useState([]);

  const fetchBookings = () => {
    dispatch(DashboardAction.fetchBookings({ page: 1 }));
  };

  const { data } = useSelector((state) => state.dashboard.bookings);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setBookingList([...data]);
  }, [data]);

  return <div className="mt-25">{renderBookingItem(bookingList)}</div>;
}
