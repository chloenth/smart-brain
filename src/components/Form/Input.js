import React from 'react';

const Input = ({ label, htmlFor, type, value, onChange, pattern, title }) => {
  return (
    <div className='mt3'>
      <label className='db fw6 lh-copy f6' htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
        type={type}
        name={htmlFor}
        id={htmlFor}
        value={value}
        required
        onChange={onChange}
        pattern={pattern && pattern}
        title={title && title}
      />
    </div>
  );
};

export default Input;
