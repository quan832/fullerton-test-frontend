import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// import { LayoutStyled, ContentStyled } from "stylesheet/Layout/Layout.styled";

const PrivateTemplate = function (props) {
  const { Component, ...restRoute } = props;
  // const { isAuthenticated } = useSelector((state) => state.auth);

  const isAuthenticated = true;

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return isAuthenticated ? (
          // <LayoutStyled className="layout">
          //   <ContentStyled>
          //     <Component {...propsRoute} />
          //   </ContentStyled>
          // </LayoutStyled>
          <>
            <Component {...propsRoute} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateTemplate;
