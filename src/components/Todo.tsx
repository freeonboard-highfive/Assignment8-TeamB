import React from "react";
import { css } from "@emotion/react";
import { useTodo, Itodo, Status } from "components/useTodo";

const Todo: React.FC = () => {
  const {
    todoState,
    nextIdState,
    incrementNextId,
    editTodo,
    removeTodo,
    createTodo,
  } = useTodo();

  return (
    <div>
      <h1 css={Heading}>hey</h1>
    </div>
  );
};

export default Todo;

const Heading = css`
  font-size: 100px;
  color: red;
`;
