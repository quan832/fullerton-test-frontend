import React from 'react';
import { Divider, TextP } from 'stylesheet/Text/Text.styled';
import LoginFrom from '../components/LoginFrom';

export default function LoginContainer() {
  return (
    <>
      <LoginFrom />
      <div style={{ marginTop: '4.6875rem' }}>
        <Divider />
        <TextP>
          Don't have an account yet? Click here to <a>Register</a>
        </TextP>
      </div>
    </>
  );
}
