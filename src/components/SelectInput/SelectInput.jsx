import React, { useState } from 'react';
import { Col, Divider, Row, Select } from 'antd';
import { InputAntd, LabelStyled, SelectInputStyled } from 'stylesheet/Input/Input.styled';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import { Field, Form, Formik } from 'formik';

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

export default function SelectInput({
  defaultValue,
  options,
  disabled,
  isMoreDropdown,
  actionSubmitMore
}) {
  const [input, setInput] = useState(null);

  const renderOptions = options.map((child, index) => (
    <Option key={index} value={child.id}>
      {child.title}
    </Option>
  ));

  const renderMoreInput = () => {
    return (
      <Formik
        style={{ width: '100%' }}
        initialValues={{ title: '' }}
        onSubmit={(values, { resetForm }) => {
          actionSubmitMore(values);
          resetForm();
          setInput(null);
        }}>
        {({ handleSubmit, handleBlur }) => (
          <Form
            style={{ width: '100%' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}>
            <Field name="title" style={{ width: '100%' }}>
              {({ field, form: { touched, errors } }) => (
                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    <LabelStyled fontSmall>New Category</LabelStyled>
                    <InputAntd name="title" id="title" style={{ height: '28px' }} {...field} />
                  </Col>
                </Row>
              )}
            </Field>
          </Form>
        )}
      </Formik>
    );
  };

  const onClickButton = () => {
    setInput(renderMoreInput);
  };

  return (
    <SelectInputStyled>
      <Select
        showSearch
        disabled={disabled}
        //   placeholder={placeholder}
        defaultValue={defaultValue}
        style={SelectStyle}
        optionFilterProp="children"
        onDropdownVisibleChange={() => setInput(null)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        dropdownRender={(menu) =>
          isMoreDropdown ? (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                {!input ? (
                  <ButtonStyled purpleGhost className="ml-5" onClick={onClickButton}>
                    + Add more category
                  </ButtonStyled>
                ) : (
                  input
                )}
              </div>
            </div>
          ) : (
            menu
          )
        }
        filterSort={(optionA, optionB) =>
          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }>
        {renderOptions}
      </Select>
    </SelectInputStyled>
  );
}
