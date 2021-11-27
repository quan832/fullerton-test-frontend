import React from 'react';
import { PrimaryTitle, SubTitle } from 'stylesheet/Title/Title.styled';
import { LoginPageWrapper } from './LoginPage.styled';
import LoginContainer from 'modules/auth/container/LoginContainer';

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <PrimaryTitle purple>Sign in to Fullerton</PrimaryTitle>
      <SubTitle gray>Enter your detail belows</SubTitle>
      <LoginContainer />
    </LoginPageWrapper>
  );
}
