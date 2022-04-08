import DashboardAction from 'modules/dashboard/actions/dashboardAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingItem from '../BookingItem/BookingItem';
import EmptyAntd from 'components/Nodata/Empty';
import { FORMAT_DATE, STATUS } from 'utils/ENUM';
import moment from 'moment';
import BookingModalEdit from '../BookingModal/BookingModalEdit';

const renderSubTitle = (status, date, place) => {
  switch (status) {
    case STATUS.approve:
      return `${moment(date).format(FORMAT_DATE)}-${place}`;
    case STATUS.pending:
      return place;
    default:
      return null;
  }
};



export default function BookingList() {
  const dispatch = useDispatch();

  const [bookingList, setBookingList] = useState([]);

  const fetchBookings = () => {
    dispatch(DashboardAction.fetchBookings({ page: 1 }));
  };

  const { data } = useSelector((state) => state.dashboard.bookings);
  const [bookingModal, setOpenModal] = React.useState(false)
  const onOpenAddModal = () => {
    // dispatch(DashboardAction.openBookingModal(null, TYPE_MODAL.add));
    setOpenModal(true)
  };

  const renderBookingItem = (data) => {
    return data.map((item, index) => {
      let startDate = null;
      const date = item.date.find((child) => child.isConfirm === true);

      if (date) {
        startDate = date.startDate;
      }

      const subTitle = renderSubTitle(item.status, startDate, item.place);

      return (
        <><BookingItem
          key={index}
          status={item.status}
          subTitle={subTitle}
          id={item.id}
          title={item.title}
          onClick={onOpenAddModal}
        />
          <BookingModalEdit
            isOpen={bookingModal}
            closeModal={() => {
              setOpenModal(false);
              // setBookingModalDate(true)
            }}
            type={'Edit'}
            value={item}
          />
        </>
      );
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setBookingList([...data]);
  }, [data]);

  return (
    <div className="mt-25">
      {bookingList.length !== 0 ? renderBookingItem(bookingList) : <EmptyAntd />}
    </div>
  ); 
}
