import styled, { css } from 'styled-components';

export const TextSpan = styled.span`
  font-size: 0.75rem;

  ${(props) =>
    props.error &&
    css`
      color: #f85359;
    `}

  ${(props) =>
    props.ml &&
    css`
      margin-left: 10px;
    `}
`;

export const TextP = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #9196a0;

  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 4.6875rem;
    `}
`;

export const Divider = styled.hr`
  border-color: #ededed;
  clear: both;
  max-width: 75rem;
  height: 0;
  margin: 1.25rem auto;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #cacaca;
  border-left: 0;
`;
