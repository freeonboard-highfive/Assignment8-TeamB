import React, { useState, useEffect } from 'react';

// const useLocalStorageJS = (key: string, initialValue: any) => {
//   const [value, setValue] = useState(() => {
//     const savedValue = localStorage.getItem(key);

//     return savedValue ? JSON.parse(savedValue) : initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

type UseLocalStorage<T> = [T, React.Dispatch<T>];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useLocalStorage = <_, T>(
  key: string,
  initialValue: T
): UseLocalStorage<T> => {
  const [value, setValue] = useState<T>(() => {
    const savedValue: string | null = localStorage.getItem(key);

    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
