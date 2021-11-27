import LeftMenu from 'components/LeftMenu/LeftMenu';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { LayoutStyled, ContentStyled } from 'stylesheet/Layout/Layout.styled';

const PrivateTemplate = function (props) {
  const { Component, ...restRoute } = props;
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return isAuthenticated ? (
          <LayoutStyled className="site-layout">
            <LeftMenu />
            <LayoutStyled className="site-layout">
              <Component {...propsRoute} />
            </LayoutStyled>
          </LayoutStyled>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateTemplate;
