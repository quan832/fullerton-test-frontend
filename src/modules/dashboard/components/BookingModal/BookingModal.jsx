import { Modal, Row, Col } from 'antd';
import SelectInput from 'components/SelectInput/SelectInput';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, InputAntd, LabelStyled } from 'stylesheet/Input/Input.styled';
import DashboardAction from './../../actions/dashboardAction';

export default function BookingModal({ isOpen, closeModal }) {
  const dispatch = useDispatch();

  const { categoryOptions } = useSelector((state) => state.dashboard);

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
                    <InputAntd name="title" id="title" small {...field} />
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
                        <InputAntd name="place" id="place" small {...field} />
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
                          small
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
