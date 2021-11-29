import LeftMenu from 'components/LeftMenu/LeftMenu';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { LayoutStyled } from 'stylesheet/Layout/Layout.styled';
import { USER } from 'utils/ENUM';
import { PrivateContainer } from './PrivateTemplate.styled';

const privateUser = (isAuthenticated) => {
  return isAuthenticated ? true : false;
};

const PrivateTemplate = function (props) {
  const { Component, ...restRoute } = props;
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  let type = null;
  if (user) {
    type = user.type;
  }

  const renderPrivateComponent = (type = null, propsRoute) => {
    switch (type) {
      case USER.admin:
        return <Redirect to="/admin" />;
      case USER.user:
        return (
          <LayoutStyled className="site-layout">
            <LeftMenu />
            <LayoutStyled className="site-layout">
              <PrivateContainer>
                <Component {...propsRoute} />
              </PrivateContainer>
            </LayoutStyled>
          </LayoutStyled>
        );
      default:
        return <Redirect to="/login" />;
    }
  };

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return privateUser(isAuthenticated) ? (
          renderPrivateComponent(type, propsRoute)
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateTemplate;
