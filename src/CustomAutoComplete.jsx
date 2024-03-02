import React from 'react';
import { Form, AutoComplete } from 'antd';

const CustomAutoComplete = ({ options, value, onSelect, onSearch, placeholder }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <span style={{ marginRight: '8px' }}>🏠</span> {/* Emoji */}
      <AutoComplete
        className="originAutoComplete"
        options={options}
        value={value}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder={placeholder}
        style={{ width: '100%' }} // Adjust if necessary to accommodate the emoji
      />
    </div>
  );
};

export default CustomAutoComplete;