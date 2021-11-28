import React from 'react';
import { Select } from 'antd';
import { SelectInputStyled } from 'stylesheet/Input/Input.styled';

const { Option } = Select;

const SelectStyle = {
  border: '1px solid #1c1d1f',
  width: '100%',
  height: '44px',
  //   padding: "10px 12px",
  fontSize: '16px',
  lineHeight: '1.43',
  color: '#1c1d1f'
};

export default function SelectInput({ defaultValue, options }) {
  const renderOptions = options.map((child) => <Option value={child.id}>{child.title}</Option>);

  return (
    <SelectInputStyled>
      <Select
        showSearch
        //   placeholder={placeholder}
        defaultValue={defaultValue}
        style={SelectStyle}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }>
        {renderOptions}
      </Select>
    </SelectInputStyled>
  );
}
