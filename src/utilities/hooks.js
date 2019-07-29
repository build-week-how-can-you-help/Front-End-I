import { useState, useEffect } from 'react';

export const useLocalStorage = (key, value) => {
  const [ storedVal, setStoredVal ] = useState( () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : value;
  })
  useEffect( () => {
    localStorage.setItem( key, JSON.stringify(storedVal) );
  }, [storedVal]);

  return [ storedVal, setStoredVal ];
}