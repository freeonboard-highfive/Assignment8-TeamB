import React from 'react';
import { css } from '@emotion/react';
import { TodoList, TodoHead, TodoBoundary, useTodo } from 'components/todo';

const TodoContainer: React.FC = () => {
  const {
    todos,
    setTodos,
    changeTodoStatus,
    createTodo,
    handleDeleteTodo,
    toggleBookmark,
    sortTodo,
    filterList,
  } = useTodo();

  return (
    <div css={Container}>
      <TodoHead createTodo={createTodo} sortTodo={sortTodo} filterList={filterList} />
      <TodoBoundary todos={todos} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        handleDeleteTodo={handleDeleteTodo}
        changeTodoStatus={changeTodoStatus}
        toggleBookmark={toggleBookmark}
      />
    </div>
  );
};

export default TodoContainer;

const Container = css`
  width: 50%;
  height: 90vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
