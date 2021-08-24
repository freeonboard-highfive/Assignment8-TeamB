import React from "react";
import TodoCreate from "./TodoCreate";
import { css } from "@emotion/react";
import { Itodo } from "components/todo/useTodo";

interface ITodoProps {
  createTodo: (value: string) => void;
}

const Todo: React.FC<ITodoProps> = ({ createTodo }) => {
  return (
    <header css={HeadBlock}>
      <h1 css={Time}>01:02 PM</h1>
      <TodoCreate createTodo={createTodo} />
    </header>
  );
};

export default Todo;

const HeadBlock = css`
  text-align: center;
  padding-top: 30px;
`;

const Time = css`
  padding-bottom: 10px;
  font-size: 1rem;
`;