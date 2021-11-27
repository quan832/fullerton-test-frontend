import { Col, Row } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { FormGroup, InputAntd } from 'stylesheet/Input/Input.styled';
import { TextSpan } from 'stylesheet/Text/Text.styled';
import * as Yup from 'yup';
import { LOGIN_USER } from '../actions/loginAction';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export default function LoginFrom() {
  const dispatch = useDispatch();

  //   const onLogin = (values) => {
  //     dispatch({ type: LOGIN_USER, payload: values });
  //   };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { resetForm }) => {
          //   onLogin(values);
          console.log(values);
          resetForm();
        }}
        validationSchema={LoginSchema}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field name="email">
                {({ field, form: { touched, errors } }) => (
                  <>
                    <InputAntd
                      error={errors.email && touched.email ? true : false}
                      placeholder="Email"
                      name="email"
                      type="text"
                      {...field}
                    />
                    {errors.email && touched.email ? (
                      <TextSpan error>{errors.email}</TextSpan>
                    ) : null}
                  </>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field name="password">
                {({ field, form: { touched, errors } }) => (
                  <>
                    <InputAntd
                      error={errors.email && touched.email ? true : false}
                      placeholder="password"
                      name="password"
                      type="password"
                      {...field}
                    />
                    {errors.password && touched.password ? (
                      <TextSpan error>{errors.password}</TextSpan>
                    ) : null}
                  </>
                )}
              </Field>
            </FormGroup>
            <Row>
              <Col span={24}>
                <ButtonStyled type="submit" purple w100 onClick={handleSubmit}>
                  Next
                </ButtonStyled>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}
