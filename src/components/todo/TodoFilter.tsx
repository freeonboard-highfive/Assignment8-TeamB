import React from 'react';
import { css } from '@emotion/react';
import { OPTIONS } from 'components/todo/type';
import { FILTER_OPTION } from 'config';

export interface IfilterProps {
  handleFilterStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterImportant: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFilteredResult: () => void;
}

const TodoFilter: React.FC<IfilterProps> = ({
  handleFilterStatus,
  handleFilterImportant,
  setFilteredResult,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilteredResult();
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset css={fieldset}>
        {OPTIONS.map((option, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name={FILTER_OPTION.STATUS}
              value={option}
              onChange={handleFilterStatus}
            />
            {option}
          </label>
        ))}
      </fieldset>
      <fieldset css={fieldset}>
        {FILTER_ARRAY_ISIMPORTANT.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name={FILTER_OPTION.IMPORTANT}
              value={item.value}
              onChange={handleFilterImportant}
            />
            {item.label}
          </label>
        ))}
      </fieldset>
      <button>필터</button>
    </form>
  );
};

export default TodoFilter;

const fieldset = css`
  display: inline-block;
  margin-right: 10px;
`;

const FILTER_ARRAY_ISIMPORTANT = [
  {
    label: '중요함',
    value: 'true',
  },
  {
    label: '안 중요함',
    value: 'false',
  },
];
