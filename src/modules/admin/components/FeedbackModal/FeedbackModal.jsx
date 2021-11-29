import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from 'modules/admin/actions/adminAction';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { FormGroup, InputAntd, LabelStyled, TextAreaAntd } from 'stylesheet/Input/Input.styled';
import * as Yup from 'yup';
import { TextSpan } from 'stylesheet/Text/Text.styled';

const FeedbackSchema = Yup.object().shape({
  description: Yup.string().required('Feedback is required')
});

export default function FeedbackModal({ onOk }) {
  const { isOpenModal, bookingIdReject } = useSelector((state) => state.admin);
  const formikRef = useRef(null);

  const dispatch = useDispatch();

  // reset form when open close modal
  useEffect(() => {
    if (formikRef) {
      formikRef.current?.resetForm();
    }
  }, [isOpenModal]);

  const onSubmit = () => {
    if (formikRef) {
      // in case description null
      const { label, description } = formikRef.current?.values;
      if (description) {
        onOk(bookingIdReject, description);
        // dispatch(AdminAction.createFeedback(bookingIdReject, description));
        return;
      } else {
        alert('Cannot submit');
      }
    }
  };

  const onCloseModal = () => {
    dispatch(AdminAction.closeModal());
  };

  return (
    <Modal
      title="Reason for rejected"
      width={600}
      visible={isOpenModal}
      onOk={onSubmit}
      onCancel={onCloseModal}>
      <Formik
        initialValues={{ description: null, label: null }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
        }}
        innerRef={formikRef}
        validationSchema={FeedbackSchema}>
        {({ handleSubmit, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field name="label">
                {({ field, form: { touched, errors } }) => (
                  <>
                    <LabelStyled>Label</LabelStyled>
                    <InputAntd placeholder="Enter label" small name="label" id="label" {...field} />
                  </>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field name="description">
                {({ field, form: { touched, errors } }) => (
                  <>
                    <LabelStyled>Description</LabelStyled>
                    <TextAreaAntd
                      rows={5}
                      placeholder="Enter the reason why you reject"
                      name="description"
                      id="description"
                      large
                      {...field}
                    />
                    {errors.description && touched.description ? (
                      <TextSpan error>{errors.description}</TextSpan>
                    ) : null}
                  </>
                )}
              </Field>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
