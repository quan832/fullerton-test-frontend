import { Modal, Row, Col, DatePicker } from 'antd';
import SelectInput from 'components/SelectInput/SelectInput';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePickerAntd, FormGroup, InputAntd, LabelStyled } from 'stylesheet/Input/Input.styled';
import DashboardAction from './../../actions/dashboardAction';
import moment from 'moment';
import { FORMAT_DATE, TYPE_MODAL } from 'utils/ENUM';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { DeleteOutlined } from '@ant-design/icons';

const defaultDate = [
  { startDate: '', isConfirm: false },
  { startDate: '', isConfirm: false },
  { startDate: '', isConfirm: false }
];

const renderProposedDate = (date, isDisabled) => {
  return date.map((item, index) => {
    let defaultValue = isDisabled ? moment(item.startDate).format(FORMAT_DATE) : null;
    return (
      <FormGroup key={index}>
        <Field name="email">
          {({ field, form: { touched, errors } }) => (
            <>
              <LabelStyled>Proposed Date {index + 1}</LabelStyled>
              <DatePickerAntd
                name="title"
                id="title"
                small
                disabled={isDisabled}
                format={FORMAT_DATE}
                defaultValue={isDisabled ? moment(defaultValue, FORMAT_DATE) : null}
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

export default function BookingModal({ isOpen, closeModal, id, type }) {
  const dispatch = useDispatch();

  const disable = type === TYPE_MODAL.edit ? true : false;

  const {
    categoryOptions,
    bookings: { data }
  } = useSelector((state) => state.dashboard);

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
    <Modal title={`${type} Booking Modal`} width={850} visible={isOpen} onCancel={closeModal}>
      <Formik
        initialValues={{ title: '', place: '', status: '', date: [], category: '' }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field name="email">
                {({ field, form: { touched, errors } }) => (
                  <>
                    <LabelStyled>Title</LabelStyled>
                    <InputAntd
                      name="title"
                      id="title"
                      small
                      {...field}
                      value={isEditModal(type) ? bookingItem.title : null}
                      disabled={isEditModal(type)}
                    />
                  </>
                )}
              </Field>
            </FormGroup>
            <Row>
              <Col span={12} style={{ paddingRight: '25px' }}>
                <FormGroup>
                  <Field name="email">
                    {({ field, form: { touched, errors } }) => (
                      <>
                        <LabelStyled>Place</LabelStyled>
                        <InputAntd
                          name="place"
                          id="place"
                          small
                          disabled={isEditModal(type)}
                          {...field}
                          value={isEditModal(type) ? bookingItem.place : null}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
              <Col span={12}>
                <FormGroup>
                  <Field name="email">
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
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
            {renderProposedDate(type === TYPE_MODAL.edit ? bookingItem.date : defaultDate, disable)}
            {isEditModal(type) ? (
              <ButtonStyled dangerText className="mt-10" w100 input>
                Delete <DeleteOutlined />
              </ButtonStyled>
            ) : null}
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
