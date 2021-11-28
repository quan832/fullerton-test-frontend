import { Modal, Row, Col, DatePicker } from 'antd';
import SelectInput from 'components/SelectInput/SelectInput';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePickerAntd, FormGroup, InputAntd, LabelStyled } from 'stylesheet/Input/Input.styled';
import DashboardAction from './../../actions/dashboardAction';
import moment from 'moment';
import { FORMAT_DATE } from 'utils/ENUM';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { DeleteOutlined } from '@ant-design/icons';

const renderProposedDate = (date) => {
  return date.map((item, index) => {
    const defaultValue = moment(item.startDate).format(FORMAT_DATE);
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
                disabled
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

export default function BookingModal({ isOpen, closeModal, id }) {
  const dispatch = useDispatch();

  const {
    categoryOptions,
    bookings: { data }
  } = useSelector((state) => state.dashboard);

  const bookingItem = data.find((item) => item.id === id);

  const onFetchCategoryOptions = () => {
    dispatch(DashboardAction.fetchCategoryOptions());
  };

  React.useEffect(() => {
    onFetchCategoryOptions();
  }, []);

  return (
    <Modal title="Edit Booking Modal" width={850} visible={isOpen} onCancel={closeModal}>
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
                      value={bookingItem.title}
                      disabled
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
                          disabled
                          {...field}
                          value={bookingItem.place}
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
                          disabled
                          small
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
            {renderProposedDate(bookingItem.date)}
            <ButtonStyled dangerText className="mt-10" w100 input>
              Delete <DeleteOutlined />
            </ButtonStyled>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
