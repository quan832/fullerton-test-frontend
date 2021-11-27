import LeftMenu from 'components/LeftMenu/LeftMenu';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { LayoutStyled } from 'stylesheet/Layout/Layout.styled';
import { PrivateContainer } from './PrivateTemplate.styled';

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
              <PrivateContainer>
                <Component {...propsRoute} />
              </PrivateContainer>
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
