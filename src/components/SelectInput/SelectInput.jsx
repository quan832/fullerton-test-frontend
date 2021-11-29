import React from 'react';
import { Divider, Select } from 'antd';
import { InputAntd, SelectInputStyled } from 'stylesheet/Input/Input.styled';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';

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

export default function SelectInput({ defaultValue, options, disabled }) {
  const renderOptions = options.map((child, index) => (
    <Option key={index} value={child.id}>
      {child.title}
    </Option>
  ));

  return (
    <SelectInputStyled>
      <Select
        showSearch
        disabled={disabled}
        //   placeholder={placeholder}
        defaultValue={defaultValue}
        style={SelectStyle}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <ButtonStyled purple>+ Add more category</ButtonStyled>
            </div>
          </div>
        )}
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }>
        {renderOptions}
      </Select>
    </SelectInputStyled>
  );
}
