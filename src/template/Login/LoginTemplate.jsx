import { isLogin } from 'modules/auth/saga/authSaga';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { IllustrationTheme, LoginContentStyled, LoginTemplateStyled } from './LoginTemplate.styled';

export default function LoginTemplate(props) {
  // es6
  let { Component, ...restRoute } = props;

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return !isAuthenticated ? (
          <LoginTemplateStyled>
            <LoginContentStyled>
              <Component {...propsRoute} />
            </LoginContentStyled>
            <IllustrationTheme />
          </LoginTemplateStyled>
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}
