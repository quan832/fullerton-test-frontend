import LeftMenu from 'components/LeftMenu/LeftMenu';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { LayoutStyled } from 'stylesheet/Layout/Layout.styled';
import { USER } from 'utils/ENUM';
import { PrivateContainer } from '../Private/PrivateTemplate.styled';

const privateUser = (isAuthenticated) => {
  return isAuthenticated ? true : false;
};

const AdminTemplate = function (props) {
  const { Component, ...restRoute } = props;
  const {
    isAuthenticated,
    user: { type }
  } = useSelector((state) => state.auth);

  const renderAdminComponent = (type, propsRoute) => {
    switch (type) {
      case USER.user:
        return <Redirect to="/" />;
      case USER.admin:
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
        return <>Error</>;
    }
  };

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return privateUser(isAuthenticated) ? (
          renderAdminComponent(type, propsRoute)
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default AdminTemplate;
