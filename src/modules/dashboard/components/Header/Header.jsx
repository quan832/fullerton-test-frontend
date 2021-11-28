import React from 'react';
import { HeaderContainer, PrimaryTitle } from 'stylesheet/Title/Title.styled';

export default function Header({ title }) {
  return (
    <HeaderContainer>
      <PrimaryTitle large purple>
        {title}
      </PrimaryTitle>
    </HeaderContainer>
  );
}
