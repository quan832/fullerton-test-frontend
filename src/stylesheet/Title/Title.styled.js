import styled, { css } from 'styled-components';

export const PrimaryTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 2.0625rem;
  margin-bottom: 0.375rem;
  font-weight: 400;

  ${(props) =>
    props.purple &&
    css`
      color: #2a295c;
    `}
`;

export const SubTitle = styled.h2`
  font-size: 0.875rem;
  line-height: 1.5rem;
  margin-top: 0.375 rem;
  margin-bottom: 1.875rem;
  font-weight: 400;

  ${(props) =>
    props.gray &&
    css`
      color: #587293;
    `}
`;
