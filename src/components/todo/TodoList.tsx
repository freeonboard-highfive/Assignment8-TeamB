import React from 'react';
import { css } from '@emotion/react';
import { useDnD } from 'hooks';
import { Itodo, Status } from './type';
import { TodoItem } from 'components/todo';

interface ITodoListProps {
  todos: Itodo[];
  setTodos: React.Dispatch<React.SetStateAction<Itodo[]>>;
  handleDeleteTodo: (id: number) => void;
  changeTodoStatus: (id: number, status: Status) => void;
  changeTodoImportance: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = ({
  todos,
  setTodos,
  handleDeleteTodo,
  changeTodoStatus,
  changeTodoImportance,
}) => {
  const { handleDragStart, handleDragEnter, handleDragOver, handleDragEnd } = useDnD(
    todos,
    setTodos,
  );

  return (
    <ul css={Container}>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
          handleDeleteTodo={handleDeleteTodo}
          changeTodoStatus={changeTodoStatus}
          changeTodoImportance={changeTodoImportance}
        />
      ))}
    </ul>
  );
};

export default TodoList;

const Container = css`
  overflow-y: scroll;
`;
