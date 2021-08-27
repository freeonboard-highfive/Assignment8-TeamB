import React, { useEffect, useState } from 'react';
import { Itodo, OPTIONS, Status } from 'components/todo/type';
import { SetState } from './types';
import { FILTER_OPTION } from 'config';

const useFilter = (todos: Itodo[], setTodos: SetState<Itodo[]>) => {
  const [filterStatus, setFilterStatus] = useState<Status[]>([]);
  const [filterImportant, setFilterImportant] = useState<string[]>([]);

  const changeIntoStatus = (value: string): Status => {
    const status: Status = OPTIONS.find((option) => option === value)!;
    return status;
  };

  const handleFilterStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: Status = changeIntoStatus(e.target.value);
    const checkedStatus: Status[] = e.target.checked
      ? filterStatus.concat(value)
      : filterStatus.filter((item) => item !== value);
    setFilterStatus(checkedStatus);
  };

  const handleFilterImportant = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checkedImportant: string[] = e.target.checked
      ? filterImportant.concat(e.target.value)
      : filterImportant.filter((item) => item !== e.target.value);
    setFilterImportant(checkedImportant);
  };

  useEffect(() => {
    if (filterStatus.length === 0 && filterImportant.length === 0) {
      setTodos((prev) =>
        prev.map((todo) => {
          return { ...todo, isVisible: true };
        }),
      );
    }
  }, [filterImportant, filterStatus]);

  const filteredTodos = (filter: string, todos: Itodo[]): Itodo[] => {
    return filter === FILTER_OPTION.STATUS // or FILTER.IMPORTANT
      ? todos.filter((item: Itodo) => filterStatus.includes(changeIntoStatus(item.status)))
      : todos.filter((item: Itodo) => filterImportant.includes(item.isImportant.toString()));
  };

  const setFilteredResult = () => {
    let filteredTodo: Itodo[] = [];
    if (!filterImportant.length) {
      filteredTodo = filteredTodos(FILTER_OPTION.STATUS, todos);
    } else if (!filterStatus.length) {
      filteredTodo = filteredTodos(FILTER_OPTION.IMPORTANT, todos);
    } else {
      filteredTodo = todos
        .filter((item: Itodo) => filterStatus.includes(changeIntoStatus(item.status)))
        .filter((item: Itodo) => filterImportant.includes(item.isImportant.toString()));
    }

    setTodos((prev) =>
      prev.map((todo) => {
        if (filteredTodo.includes(todo)) {
          return { ...todo, isVisible: true };
        } else {
          return { ...todo, isVisible: false };
        }
      }),
    );
  };

  return {
    filterStatus,
    filterImportant,
    handleFilterStatus,
    handleFilterImportant,
    setFilteredResult,
  };
};

export default useFilter;
