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

const renderProposedDate = (date, isDisabled, setValue, status) => {
  return date.map((item, index) => {
    let defaultValue = isDisabled
      ? moment(item.startDate).format(FORMAT_DATE)
      : moment().format(FORMAT_DATE);

    return (
      <FormGroup key={`${index}-${isDisabled}`}>
        <Field name={`date[${index}]`}>
          {({ field, form: { touched, errors } }) => (
            <>
              <LabelStyled>
                Proposed Date {index + 1}
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
                defaultValue={moment(defaultValue, FORMAT_DATE)}
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

const BookingSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  place: Yup.string().required('Place is required'),
  category: Yup.string().required('Category is required')
});

export default function BookingModal({ isOpen, closeModal, id, type, openBookingModalDate }) {
  const dispatch = useDispatch();

  const {
    categoryOptions,
    bookings: { data },
    bookingModal: { isOpenModal }
  } = useSelector((state) => state.dashboard);


  const providerOptions = [
    {
      id: 1,
      title: "Bệnh viện Nguyễn Trãi",
    },
    {
      id: 2,
      title: "Bệnh viện Chợ rẫy",
    },
    {
      id: 3,
      title: "Bệnh viện Nhi Đồng",
    }, {
      id: 4,
      title: "Bệnh viện An Bình",
    }
  ]

  const initialValue = {
    title: '',
    place: '',
    status: STATUS.pending,
    // date: [getDateNow(), getDateNow(), getDateNow()],
    category: categoryOptions[0]?.title,
    phone: '',
    why: '',
    provider: providerOptions[0]?.title
  };


  const [initialValues, setValues] = useState(initialValue);

  React.useEffect(() => {
    setValues({ ...initialValues, category: categoryOptions[0]?.title });
  }, [categoryOptions]);

  React.useEffect(() => {
    setValues(initialValue);
  }, [isOpenModal]);

  const formRef = useRef(null);

  const onSetDate = (value, index) => {
    let newDate = [...initialValues.date];
    newDate[index] = value;

    setValues({ ...initialValues, date: newDate });
  };

  const onChangeCategory = (index) => {
    setValues({ ...initialValues, category: categoryOptions[index].title });
  };

  const onChangeProvider = (index) => {
    setValues({ ...initialValues, provider: providerOptions[index].title });
  };

  const onSubmit = () => {
    // if (!isEditModal(type)) dispatch(DashboardAction.createBooking(initialValues));

    // 


    // reset
    setValues({ ...initialValue });
    dispatch(DashboardAction.createBookingStep1(initialValues));
    closeModal()
    openBookingModalDate()

  };

  const onCreateCategory = (payload) => {
    dispatch(DashboardAction.createCategory(payload));
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
      title={`${type} Booking Modal (STEP 1)`}
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
            <FormGroup>
              <Field name="title">
                {({ field, form: { touched, errors } }) => (
                  <>
                    <LabelStyled>Your status</LabelStyled>
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
                        <LabelStyled>Your address</LabelStyled>
                        <InputAntd
                          name="place"
                          id="place"
                          small
                          disabled={isEditModal(type)}
                          {...field}
                          value={isEditModal(type) ? bookingItem.place : initialValues.place}
                          onChange={(e) => {
                            // console.log(e);
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
              <Col span={12} >
                <FormGroup>
                  <Field name="phone">
                    {({ field, form: { touched, errors } }) => (
                      <>
                        <LabelStyled>Phone</LabelStyled>
                        <InputAntd
                          name="phone"
                          id="phone"
                          small
                          disabled={isEditModal(type)}
                          {...field}
                          value={isEditModal(type) ? bookingItem.phone : initialValues.phone}
                          onChange={(e) => {
                            // console.log(e);
                            const value = e.currentTarget.value;
                            setValues({ ...initialValues, phone: value });
                          }}
                          onBlur={handleBlur}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col span={24} >
                <FormGroup>
                  <Field name="why">
                    {({ field, form: { touched, errors } }) => (
                      <>
                        <LabelStyled>Why you are here?</LabelStyled>
                        <InputAntd
                          name="why"
                          id="why"
                          small
                          disabled={isEditModal(type)}
                          {...field}
                          value={isEditModal(type) ? bookingItem.why : initialValues.why}
                          onChange={(e) => {
                            // console.log(e);
                            const value = e.currentTarget.value;
                            setValues({ ...initialValues, why: value });
                          }}
                          onBlur={handleBlur}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormGroup>
                  <Field name="category">
                    {({ field, form: { touched, errors } }) => (
                      <>
                        <LabelStyled>Provider</LabelStyled>
                        <SelectInput
                          name="provider"
                          id="provider"
                          small
                          defaultValue={
                            isEditModal(type) ? bookingItem.place : providerOptions[0]?.title
                          }
                          options={providerOptions}
                          // isMoreDropdown={true}
                          disabled={isEditModal(type)}
                          onChangeDropDown={onChangeProvider}
                          // actionSubmitMore={onCreateCategory}
                          onBlur={handleBlur}
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormGroup>
                  <Field name="category">
                    {({ field, form: { touched, errors } }) => (
                      <>
                        <LabelStyled>Category</LabelStyled>
                        <SelectInput
                          name="category"
                          id="category"
                          small
                          defaultValue={
                            isEditModal(type) ? bookingItem.place : categoryOptions[0]?.title
                          }
                          options={categoryOptions}
                          isMoreDropdown={true}
                          disabled={isEditModal(type)}
                          onChangeDropDown={onChangeCategory}
                          actionSubmitMore={onCreateCategory}
                          onBlur={handleBlur}
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>

            {/* {renderProposedDate(
              isEditModal(type) ? bookingItem.date : initialValues.date,
              isEditModal(type),
              onSetDate,
              isEditModal(type) ? bookingItem.status : null
            )}
            {isEditModal(type) ? (
              <ButtonStyled onClick={onDelete} dangerText className="mt-10" w100 input>
                Delete <DeleteOutlined />
              </ButtonStyled>
            ) : null} */}
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
