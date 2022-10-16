import React from 'react';
import Select from 'react-select';
const colorStyles = {
  menuList: (styles) => ({
    ...styles,
    maxHeight: '70px',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
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
  control: (styles) => ({
    ...styles,
  }),
  placeholder: (styles) => ({
    ...styles,
  }),
};

const SelectOption = ({ options, placeholder, ...rest }) => {
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

export default SelectOption;
