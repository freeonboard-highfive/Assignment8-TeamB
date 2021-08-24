import React, { useState } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

interface IuseInput {
  value: string;
  handleChange: (e: ChangeEvent) => void;
}

const useInput = (initialValue: string = ''): IuseInput => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent): void => {
    setValue(e.target.value);
  };

  return { value, handleChange };
};

export default useInput;
