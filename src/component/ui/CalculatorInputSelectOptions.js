import React from 'react';
import Select from 'react-select';
const colorStyles = {
  menuList: (styles) => ({
    ...styles,
    maxHeight: '70px',
    // borderBottomLeftRadius: '5px',
    // borderBottomRightRadius: '5px',
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    zIndex: 1,
    backgroundColor: '#101c31',
    marginBottom: '2px',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#fff',
    zIndex: 100,
    border: '1px solid #fff',
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: 'rgba(117, 239, 255, 1)',
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
    },
  }),
  placeholder: (styles) => ({
    ...styles,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: 'rgba(16, 28, 49, 0.5)',
    '&:hover': {
      color: '#101c31',
    },
  }),
};

const CalculatorInputSelectOptions = ({ options, placeholder, ...rest }) => {
  return (
    <>
      <Select
        placeholder={placeholder}
        options={options}
        styles={colorStyles}
        {...rest}
      />
    </>
  );
};

export default CalculatorInputSelectOptions;
