import styled, { css } from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const ButtonStyled = styled.button`
  border: 0 solid transparent;
  border-radius: 0.25rem;
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
    props.dangerLight &&
    css`
      background-color: #ffeae5;
      border-color: #ffeae5;
      color: #ff562f;
      &:hover {
        background-color: #ff562f !important;
        border-color: #ff562f !important;
        color: #ffffff !important;
      }
    `}

  ${(props) =>
    props.purple &&
    css`
      background: #a435f0;
      color: #fff;
      font-weight: 700;

      &:hover {
        opacity: 50%;
        background-color: #2f2a66;
      }
    `}

  ${(props) =>
    props.input &&
    css`
      border: 0.0625rem solid #dfe3e9;
      border-radius: 0.1875rem;
      background-color: #fff;
      font-size: 1rem;
      font-weight: 500;
      &:hover {
        opacity: 50%;
      }
    `}

     ${(props) =>
    props.dangerText &&
    css`
      color: #f32013;
    `}

  ${(props) =>
    props.w100 &&
    css`
      width: 100%;
    `}
`;
