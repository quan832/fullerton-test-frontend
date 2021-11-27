import styled, { css } from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const ButtonStyled = styled.button`
  border: 0 solid transparent;
  border-radius: 0.1875rem;
  cursor: pointer;
  display: inline-block;
  font-family: proximanova, helvetica neue, Arial, sans-serif;
  font-size: 0.875rem;
  height: 3rem;
  outline: none;
  overflow: hidden;
  padding: 0 1rem;
  position: relative;
  text-align: center;
  transition: background 0.2s ease-in-out;
  vertical-align: middle;
  white-space: nowrap;

  ${(props) =>
    props.purple &&
    css`
      background: #2c275f;
      color: #fff;
      font-weight: 700;

      &:hover {
        opacity: 50%;
        background-color: #2f2a66;
      }
    `}

  ${(props) =>
    props.w100 &&
    css`
      width: 100%;
    `}
`;
