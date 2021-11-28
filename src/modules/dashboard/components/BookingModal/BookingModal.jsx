import { Modal, Row, Col, DatePicker } from 'antd';
import SelectInput from 'components/SelectInput/SelectInput';
import { Field, Form, Formik, useFormikContext } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePickerAntd, FormGroup, InputAntd, LabelStyled } from 'stylesheet/Input/Input.styled';
import DashboardAction from './../../actions/dashboardAction';
import moment from 'moment';
import { FORMAT_DATE, STATUS, TYPE_MODAL } from 'utils/ENUM';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { DeleteOutlined } from '@ant-design/icons';

const renderProposedDate = (date, isDisabled, setValue) => {
  return date.map((item, index) => {
    let defaultValue = isDisabled
      ? moment(item.startDate).format(FORMAT_DATE)
      : moment().format(FORMAT_DATE);

    return (
      <FormGroup key={`${index}-${isDisabled}`}>
        <Field name={`date[${index}]`}>
          {({ field, form: { touched, errors } }) => (
            <>
              <LabelStyled>Proposed Date {index + 1}</LabelStyled>
              <DatePickerAntd
                {...field}
                name={`date[${index}]`}
                id={`date[${index}]`}
                small
                onChange={!isDisabled ? (date, dateString) => setValue(dateString, index) : null}
                disabled={isDisabled}
                format={FORMAT_DATE}
                value={moment(defaultValue, FORMAT_DATE)}
              />
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

export default function BookingModal({ isOpen, closeModal, id, type }) {
  const dispatch = useDispatch();

  const {
    categoryOptions,
    bookings: { data }
  } = useSelector((state) => state.dashboard);

  const [initialValues, setValues] = useState({
    title: '',
    place: '',
    status: STATUS.pending,
    date: [getDateNow(), getDateNow(), getDateNow()],
    category: categoryOptions[0]?.title
  });

  React.useEffect(() => {
    setValues({ ...initialValues, category: categoryOptions[0]?.title });
  }, [categoryOptions]);

  const formRef = useRef(null);

  const onSetDate = (value, index) => {
    const newDate = [...initialValues.date];
    newDate[index] = value;
    setValues({ date: newDate });
  };

  const onSubmit = () => {
    if (!isEditModal(type)) dispatch(DashboardAction.createBooking(initialValues));
  };

  const onDelete = () => {
    dispatch(DashboardAction.deleteBooking(id));
  };

  let bookingItem;
  if (id) {
    bookingItem = data.find((item) => item.id === id);
  }

  const onFetchCategoryOptions = () => {
    dispatch(DashboardAction.fetchCategoryOptions());
  };

  React.useEffect(() => {
    onFetchCategoryOptions();
  }, []);

  return (
    <Modal
      title={`${type} Booking Modal`}
      width={850}
      visible={isOpen}
      onCancel={closeModal}
      onOk={onSubmit}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
        innerRef={formRef}>
        {({ handleSubmit, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field name="title">
                {({ field, form: { touched, errors } }) => (
                  <>
                    <LabelStyled>Title</LabelStyled>
                    <InputAntd
                      name="title"
                      id="title"
                      small
                      {...field}
                      value={isEditModal(type) ? bookingItem.title : initialValues.title}
                      disabled={isEditModal(type)}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        setValues({ ...initialValues, title: value });
                      }}
                    />
                  </>
                )}
              </Field>
            </FormGroup>
            <Row>
              <Col span={12} style={{ paddingRight: '25px' }}>
                <FormGroup>
                  <Field name="place">
                    {({ field, form: { touched, errors } }) => (
                      <>
                        <LabelStyled>Place</LabelStyled>
                        <InputAntd
                          name="place"
                          id="place"
                          small
                          disabled={isEditModal(type)}
                          {...field}
                          value={isEditModal(type) ? bookingItem.place : initialValues.place}
                          onChange={(e) => {
                            console.log(e);
                            const value = e.currentTarget.value;
                            setValues({ ...initialValues, place: value });
                          }}
                          onBlur={handleBlur}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
              <Col span={12}>
                <FormGroup>
                  <Field name="category">
                    {({ field, form: { touched, errors } }) => (
                      <>
                        <LabelStyled>Category</LabelStyled>
                        <SelectInput
                          defaultValue={categoryOptions[0].title}
                          options={categoryOptions}
                          name="category"
                          id="category"
                          disabled={isEditModal(type)}
                          small
                          onBlur={handleBlur}
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
            {renderProposedDate(
              isEditModal(type) ? bookingItem.date : initialValues.date,
              isEditModal(type),
              onSetDate
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
