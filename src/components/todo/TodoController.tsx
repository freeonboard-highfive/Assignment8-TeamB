import React from 'react';
import { css } from '@emotion/react';
import { COLOR_STYLE, MainBtn } from 'styles';
import { TodoFilter } from '.';
import { FilterType, Status } from './type';

interface Iprop {
  sortTodo: () => void;
  filterList: (filterType: FilterType, status?: Status) => void;
}

const TodoController: React.FC<Iprop> = ({ filterList, sortTodo }) => {
  return (
    <div css={Container}>
      <TodoFilter filterList={filterList} />
      <button css={SortBtn} onClick={sortTodo}>
        <span>Sort by newest</span>
      </button>
    </div>
  );
};

export default TodoController;

const Container = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const SortBtn = css`
  ${MainBtn}
  &:hover {
    transform: translateY(0);
    background-color: ${COLOR_STYLE.primary};
    color: ${COLOR_STYLE.white};
  }
  &:active {
    transform: translateY(-3px);
  }
`;
