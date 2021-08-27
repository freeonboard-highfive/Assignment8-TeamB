import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { BOX_STYLE, ButtonDefault, COLOR_STYLE, FONT_SIZE_STYLE } from 'styles';
import { getUpdatedTimeFormat } from 'utils/getUpdatedTimeFormat';
import { MODAL_OPTION } from 'config';
import { useModalContext } from 'contexts';
import { SetState } from 'hooks/types';
import { Itodo, Status } from './type';
import { TodoController } from '.';

interface Iprop {
  todo: Itodo;
  index: number;
  handleDragStart: (pointer: number) => void;
  handleDragEnter: (pointer: number) => void;
  handleDragOver: (e: React.DragEvent, setIsDragOver: SetState<boolean>) => void;
  handleDragEnd: (setIsDragOver: SetState<boolean>) => void;
  handleDeleteTodo: (id: number) => void;
  changeTodoStatus: (id: number, status: Status) => void;
  changeTodoImportance: (id: number) => void;
}

const TodoItem: React.FC<Iprop> = ({ ...props }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const {
    todo,
    index,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragEnd,
    handleDeleteTodo,
    changeTodoStatus,
    changeTodoImportance,
  } = props;
  const { openModal } = useModalContext()!;
  const ListStyle = getListStyle(todo.status);

  const [time, setTime] = useState<string>(getUpdatedTimeFormat(todo.updatedAt));

  useEffect(() => {
    const timer = setInterval(() => setTime(getUpdatedTimeFormat(todo.updatedAt)), 1000);
    return () => clearInterval(timer);
  }, [todo.updatedAt]);

  const handleRemove = (): void => {
    openModal({
      ...MODAL_OPTION.DELETE,
      content: '',
      task: todo.taskName,
      taskInfo: `(${todo.status}${todo.isImportant ? ', Bookmark' : ''}) updated 5 mins ago`,
      onOk() {
        handleDeleteTodo(todo.id);
      },
    });
  };

  return (
    <li
      css={
        isDragOver
          ? todo.isVisible
            ? ListHover
            : noDisplay
          : todo.isVisible
          ? ListStyle
          : noDisplay
      }
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragEnter={() => handleDragEnter(index)}
      onDragOver={(e) => handleDragOver(e, setIsDragOver)}
      onDragEnd={() => handleDragEnd(setIsDragOver)}
    >
      <h2 css={todo.status === Status.done ? Done : Text}>{todo.taskName}</h2>
      <button css={DeleteButton} onClick={handleRemove}>
        <IoMdRemoveCircleOutline />
      </button>
      <TodoController
        todo={todo}
        changeTodoStatus={changeTodoStatus}
        changeTodoImportance={changeTodoImportance}
      />
      <p>updated {time} ago</p>
    </li>
  );
};

export default TodoItem;

const getListStyle = (status: Status) => {
  switch (status) {
    case Status.todo:
      return ListTodo;
    case Status.progress:
      return ListInProgress;
    case Status.done:
      return ListDone;
  }
};

const List = css`
  position: relative;
  background: ${COLOR_STYLE.white};
  padding: 1rem 1.6rem;
  border-left: 4px solid ${COLOR_STYLE.grey};
  border-radius: 3px;
  box-shadow: ${BOX_STYLE.shadow};
  margin-bottom: 1rem;
  transition: all 0.2s;
  cursor: move;

  &:hover {
    transform: translateY(-3px);
  }

  &:first-of-type {
    margin-top: 3px;
  }
`;

const ListHover = css`
  ${List}
  background-color: ${COLOR_STYLE.grey};
`;

const ListTodo = css`
  ${List}
  border-left: 4px solid ${COLOR_STYLE.primary};
`;

const ListInProgress = css`
  ${List}
  border-left: 4px solid ${COLOR_STYLE.blue};
`;

const ListDone = css`
  ${List}
  border-left: 4px solid ${COLOR_STYLE.green};
`;

const Text = css`
  font-size: ${FONT_SIZE_STYLE.medium};
  padding: 10px 0;
`;

const Done = css`
  ${Text}
  color: ${COLOR_STYLE.grey};
  text-decoration: line-through;
`;

const DeleteButton = css`
  ${ButtonDefault}
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  transform: translate(-25%, 15%);

  svg {
    color: ${COLOR_STYLE.primary};
    font-size: ${FONT_SIZE_STYLE.larger};
    transition: all 0.3s;
  }

  &:hover {
    svg {
      color: ${COLOR_STYLE.red};
      transform: rotate(-90deg);
    }
  }
`;

const noDisplay = css`
  display: none;
`;
