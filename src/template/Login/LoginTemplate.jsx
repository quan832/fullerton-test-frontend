import React from 'react';
import { Route } from 'react-router';
// import { IllustrationTheme, LoginContentStyled, LoginTemplateStyled } from './LoginTemplate.styled';

export default function LoginTemplate(props) {
  // es6
  let { Component, ...restRoute } = props;

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>123</>
          // <LoginTemplateStyled>
          //   <LoginContentStyled>
          //     <Component {...propsRoute} />
          //   </LoginContentStyled>
          //   <IllustrationTheme />
          // </LoginTemplateStyled>
        );
      }}
    />
  );
}
