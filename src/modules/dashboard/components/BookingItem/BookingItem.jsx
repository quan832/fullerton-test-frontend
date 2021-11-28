import { Row, Col } from 'antd';
import DashboardAction from 'modules/dashboard/actions/dashboardAction';
import React from 'react';
import { useDispatch } from 'react-redux';
import { FlexDiv } from 'stylesheet/div/div.styled';
import { PROGRESS_STATUS, TYPE_MODAL } from 'utils/ENUM';
import {
  BookingCardImage,
  BookingProgress,
  HoverItem,
  BookingItemStyled
} from './BookingItem.styled';

export default function BookingItem({ id, title, status }) {
  const dispatch = useDispatch();

  const onOpenModal = () => {
    dispatch(DashboardAction.openBookingModal(id, TYPE_MODAL.edit));
  };

  const progress = PROGRESS_STATUS(status);

  return (
    <Row onClick={onOpenModal}>
      <Col span={24}>
        <BookingItemStyled flex>
          <div className="box">
            <div className="box-body">
              <FlexDiv alignCenter>
                <BookingCardImage>
                  <img
                    alt=""
                    width="118"
                    height="118"
                    src="https://s.udemycdn.com/course/200_H/placeholder.jpg"></img>
                </BookingCardImage>
                <FlexDiv alignCenter className="body-course-draft">
                  <div className="d-flex align-items-center">
                    <div className="ml-15">
                      <h5 className="mb-0">{title}</h5>
                    </div>
                  </div>
                </FlexDiv>
              </FlexDiv>
              <BookingProgress className="body-course-draft">
                <p className="font-size-14 mb-0" style={{ color: `${progress.color}` }}>
                  {progress.message}
                </p>

                <div className="courses--course-progress--C_Gvp udlite-meter-wrapper meter--meter-wrapper--R6ZCR">
                  <div
                    className="udlite-meter meter--meter--27-bB"
                    aria-label="0% complete"
                    data-purpose="meter"
                    style={{ transform: `scaleX(${progress.progress})` }}
                  />
                </div>
              </BookingProgress>
              {/* <NavLink to={`/instructor/course/${id}/manage`}> */}
              <HoverItem to={`/`} className="edit-manage-course">
                Edit / manage booking
              </HoverItem>
              {/* </NavLink> */}
            </div>
          </div>
        </BookingItemStyled>
      </Col>
    </Row>
  );
}
