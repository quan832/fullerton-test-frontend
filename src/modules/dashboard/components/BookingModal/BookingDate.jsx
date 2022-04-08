import { Modal, Row, Col, DatePicker } from 'antd';
import SelectInput from 'components/SelectInput/SelectInput';
import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePickerAntd, FormGroup, InputAntd, LabelStyled } from 'stylesheet/Input/Input.styled';
import DashboardAction from './../../actions/dashboardAction';
import moment from 'moment';
import { FORMAT_DATE, STATUS, TYPE_MODAL } from 'utils/ENUM';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { DeleteOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { Tag } from 'antd';

import { CheckCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';

const renderStatus = (status, isConfirm) => {
  if (status === STATUS.pending) {
    return (
      <Tag className="ml-10" icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    );
  }

  switch (isConfirm) {
    case true:
      return (
        <Tag className="ml-10" icon={<CheckCircleOutlined />} color="success">
          Approved
        </Tag>
      );
    case false:
      return (
        <Tag className="ml-10" icon={<MinusCircleOutlined />} color="default">
          Rejected
        </Tag>
      );
    default:
      return null;
  }
};

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}
const format = 'HH:mm';

const renderProposedDate = (date, isDisabled, setValue, status, dateBooking, onSetTime, time) => {
  return date.map((item, index) => {
    const findDate = dateBooking.find((itemFind) => itemFind.date === item)
    return (
      <FormGroup key={`${index}-${isDisabled}`}>
        <Field name={`date[${index}]`}>
          {({ field, form: { touched, errors } }) => (
            <>
              <LabelStyled>
                Choose Date
                {isDisabled ? renderStatus(status, item.isConfirm) : null}
              </LabelStyled>
              <DatePickerAntd
                name={`date[${index}]`}
                id={`date[${index}]`}
                small
                disabledDate={disabledDate}
                onChange={!isDisabled ? (date, dateString) => setValue(dateString, index) : null}
                disabled={isDisabled}
                format={FORMAT_DATE}
                defaultValue={moment(date, FORMAT_DATE)}
                value={moment(date, FORMAT_DATE)}
              />
              <LabelStyled style={{ marginTop: 20 }}>
                Choose Time
                {isDisabled ? renderStatus(status, item.isConfirm) : null}
              </LabelStyled>
              {/* <DatePickerAntd
                name={`date[${index}]`}
                id={`date[${index}]`}
                small
                picker='time'
              // disabledDate={disabledDate}
              // onChange={!isDisabled ? (date, dateString) => setValue(dateString, index) : null}
              // disabled={isDisabled}
              // format={FORMAT_DATE}
              // defaultValue={moment(defaultValue, FORMAT_DATE)}
              /> */}
              <div>
                {findDate?.timeAvailable.map((timePicker, key) => {
                  return <ButtonStyled onClick={() => onSetTime(timePicker.time)} purpleGhost purple={time === timePicker.time
                    ? true : false} disabled={!timePicker.available} marginLeftRight>{timePicker.time}</ButtonStyled>
                })}
              </div>
            </>
          )}
        </Field>
      </FormGroup>
    );
  });
};

const isEditModal = (type) => {
  return type === TYPE_MODAL.edit ? true : false;
};

const getDateNow = () => {
  const value = moment().format(FORMAT_DATE);
  return value;
};

const BookingSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  place: Yup.string().required('Place is required'),
  category: Yup.string().required('Category is required')
});

export default function BookingModalDate({ isOpen, closeModal, id, type }) {
  const dispatch = useDispatch();

  const {
    categoryOptions,
    bookings: { data },
    bookingModal: { isOpenModal },
    dateBooking
  } = useSelector((state) => state.dashboard);

  const initialValue = {
    date: [getDateNow()],
    time: null,
  };

  // const dateBooking = dataDateBooking()

  // console.log(dateBooking)

  const [initialValues, setValues] = useState(initialValue);

  React.useEffect(() => {
    setValues(initialValue);
  }, [isOpenModal]);

  const formRef = useRef(null);

  const onSetDate = (value, index) => {
    let newDate = [...initialValues.date];
    newDate[index] = value;

    setValues({ ...initialValues, date: newDate });
  };

  const onSetTime = (value) => {
    setValues({ ...initialValues, time: value });
  };

  const onSubmit = () => {
    if (!isEditModal(type)) dispatch(DashboardAction.createBookingStep2(initialValues));
    setValues({ ...initialValue });

    dispatch(DashboardAction.createBooking());
    closeModal()
  };

  return (
    <Modal
      title={`${type} Booking Modal (STEP 2)`}
      width={850}
      visible={isOpen}
      centered
      onCancel={closeModal}
      onOk={onSubmit}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          resetForm();
        }}
        innerRef={formRef}
        validationSchema={BookingSchema}>
        {({ handleSubmit, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            {renderProposedDate(
              initialValues.date,
              isEditModal(type),
              onSetDate,
              isEditModal(type) ? bookingItem.status : null,
              dateBooking,
              onSetTime,
              initialValues.time,
            )}
            {isEditModal(type) ? (
              <ButtonStyled onClick={onDelete} dangerText className="mt-10" w100 input>
                Delete <DeleteOutlined />
              </ButtonStyled>
            ) : null}
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
