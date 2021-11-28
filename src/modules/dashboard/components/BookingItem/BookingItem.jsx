import { Row, Col } from 'antd';
import React from 'react';
import { FlexDiv } from 'stylesheet/div/div.styled';
import {
  BookingCardImage,
  BookingProgress,
  HoverItem,
  BookingItemStyled
} from './BookingItem.styled';

export default function BookingItem({ title }) {
  return (
    <Row>
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
                    {/* <div className="icon bg-primary-light rounded-circle w-60 h-60 text-center l-h-80">
                <span className="font-size-30 icon-Bulb1">
                  <span className="path1" />
                  <span className="path2" />
                  <span className="path3" />
                  <span className="path4" />
                </span>
              </div> */}
                    <div className="ml-15">
                      <h5 className="mb-0">{title}</h5>
                      {/* <div>{renderDraftPublish()}</div> */}
                    </div>
                  </div>
                </FlexDiv>
              </FlexDiv>
              <BookingProgress className="body-course-draft">
                <p className="text-fade font-size-12 mb-0">Waiting to confirm</p>

                <div className="courses--course-progress--C_Gvp udlite-meter-wrapper meter--meter-wrapper--R6ZCR">
                  <div
                    className="udlite-meter meter--meter--27-bB"
                    aria-label="0% complete"
                    data-purpose="meter"
                    style={{ transform: 'scaleX(0.65)' }}
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
