import React, { useState } from 'react';
import Select from 'react-select';
import { StyledInput } from '../styled/StyledContents';

const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 30,  // TextDiv와 높이 일치
      backgroundColor: '#ffffff',  // TextDiv 배경색과 동일하게 설정
      borderRadius: '5px',  // TextDiv와 비슷하게 둥글게 처리
      boxShadow: 'none',  // 그림자 제거
      borderColor: '#ccc',
      padding: '0 30px',  // TextDiv 패딩과 유사하게 조절
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',  // 텍스트 색상 설정
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#333',  // 드롭다운 표시 색상 설정
    }),
    option: (provided) => ({
      ...provided,
      padding: '10px 20px',
    }),
  };

const CSelect = (props) => {
    const { children, ...restProps } = props;

    return (
        <label style={{ marginRight: '1em' }}>
            <StyledInput type="checkbox" {...restProps}/>
            {children}
        </label>
    );
};

export default function CustomSelect({ options, onOptionChange }) {
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
                styles={customStyles}
                onChange={onOptionChange} // 사용자가 선택할 때마다 상위 컴포넌트로 선택된 옵션을 전달합니다.
            />

            <div
                style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 10,
                    fontStyle: 'italic',
                    marginTop: '1em',
                    height: '10px',
                }}
            >
            </div>
        </>
    );
}




