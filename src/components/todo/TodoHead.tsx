import React from 'react';
import { css } from '@emotion/react';
import { BOX_STYLE, COLOR_STYLE } from 'styles';
import { getCurrentDate } from 'utils';
import { TodoCreate, TodoFilter } from 'components/todo';

interface ITodoHeadProps {
  createTodo: (value: string) => void;
  sortTodo: () => void;
}

const TodoHead: React.FC<ITodoHeadProps> = ({ createTodo, sortTodo }) => {
  const curDate = getCurrentDate();

  return (
    <header css={Header}>
      <h1>{curDate}</h1>
      <TodoCreate createTodo={createTodo} />
      <TodoFilter />
      <button onClick={sortTodo}>생성일 순 정렬</button>
    </header>
  );
};

export default TodoHead;

const Header = css`
  width: 100%;
  background-color: ${COLOR_STYLE.white};
  padding: 2.5rem 1.75rem;
  border-radius: 5px;
  box-shadow: ${BOX_STYLE.shadow};
`;
