import styled, { css } from 'styled-components';
import bg from 'assets/images/bg/Illustration.png';

export const LoginTemplateStyled = styled.div`
  overflow: hidden;
  position: relative;
  flex-wrap: nowrap;
  align-items: stretch;

  display: flex;
  height: auto;
  width: 100%;
  height: 100%;
`;

export const LoginContentStyled = styled.div`
  width: 50%;

  @media screen and (max-width: 39.9375em) {
    width: 100%;
  }
`;

export const IllustrationTheme = styled.div`
  background: linear-gradient(138.49deg, #593b79 0%, rgba(44, 41, 93, 0.99) 100%);
  position: relative;
  width: 50%;
  &:before {
    background: url(${bg}) center 100% no-repeat;
    content: '';
    left: 0;
    height: 100%;
    opacity: 0.5;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @media screen and (max-width: 39.9375em) {
    display: none;
  }
`;
