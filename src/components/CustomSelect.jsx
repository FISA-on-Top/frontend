import React, { useState } from 'react';
import Select from 'react-select';

const CSelect = (props) => {
  const { children, ...restProps } = props;

  return (
    <label style={{ marginRight: '1em' }}>
      <input type="checkbox" {...restProps} />
      {children}
    </label>
  );
};

export default function CustomSelect({ options,onOptionChange }) {
  const [isClearable, setIsClearable] = useState(false);
  const [isSearchable, setIsSearchable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  // 옵션예시 나중에 보렴~
  // const colourOptions = [
  //   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  //   { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  //   { value: 'purple', label: 'Purple', color: '#5243AA' },
  //   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  //   { value: 'orange', label: 'Orange', color: '#FF8B00' },
  //   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  //   { value: 'green', label: 'Green', color: '#36B37E' },
  //   { value: 'forest', label: 'Forest', color: '#00875A' },
  //   { value: 'slate', label: 'Slate', color: '#253858' },
  //   { value: 'silver', label: 'Silver', color: '#666666' },
  // ];

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={""}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        options={options}
        onChange={onOptionChange} // 사용자가 선택할 때마다 상위 컴포넌트로 선택된 옵션을 전달합니다.
      />

      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 10,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
      </div>
    </>
  );
}


