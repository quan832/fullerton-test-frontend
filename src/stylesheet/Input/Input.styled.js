import { DatePicker, Input } from 'antd';
import styled, { css } from 'styled-components';

const { TextArea } = Input;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

export const LabelStyled = styled.label`
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 15px;

  ${(props) =>
    props.fontSmall &&
    css`
      font-size: 13px;
    `}
`;
export const SelectInputStyled = styled.div`
  .ant-select {
    border: 0.0625rem solid #dfe3e9 !important;
    border-radius: 0.1875rem !important;
    background-color: #fff !important;
    display: block !important;
    font-size: 1rem !important;
    height: 40px !important;
    padding: 0 0.5rem !important;
    transition: border-color 0.2s ease-in-out !important;
    width: 100% !important;
    box-shadow: none !important;
    padding: 0 !important;
    &:hover,
    &:focus,
    &:active {
      border-color: #12c88a !important;
    }
  }

  .ant-select-selector {
    height: 100% !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;

export const TextAreaAntd = styled(TextArea)``;

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
  font-size: 1rem;
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

  ${(props) =>
    props.small &&
    css`
      height: 40px;
    `}

    
  ${(props) =>
    props.large &&
    css`
      height: 80px;
    `}
`;

export const DatePickerAntd = styled(DatePicker)`
  &:hover,
  &:focus,
  &:active {
    border-color: #12c88a !important;
  }
  .ant-picker-input {
    height: 100%;
  }
  border: 0.0625rem solid #dfe3e9;
  border-radius: 0.1875rem;
  background-color: #fff;
  display: block;
  font-size: 1rem;
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

  ${(props) =>
    props.small &&
    css`
      height: 40px;
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
