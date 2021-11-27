import { Input } from 'antd';
import styled, { css } from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

export const InputAntd = styled(Input)`
  &:hover,
  &:focus,
  &:active {
    border-color: #12c88a !important;
  }

  border: 0.0625rem solid #dfe3e9;
  border-radius: 0.1875rem;
  background-color: #fff;
  display: block;
  font-size: 0.875rem;
  height: 48px;
  padding: 0 0.5rem;
  transition: border-color 0.2s ease-in-out;
  width: 100%;
  box-shadow: none;

  ${(props) =>
    props.error &&
    css`
      border-color: #f85359 !important;
      &:hover,
      &:focus,
      &:active {
        border-color: #f85359 !important;
      }
    `}
`;

export const SearchingStyle = styled.div`
  .ant-input-affix-wrapper {
    height: 45px;
    width: 220px;
  }

  button.ant-btn.ant-btn-icon-only.ant-input-search-button {
    height: 45px;
  }
`;
