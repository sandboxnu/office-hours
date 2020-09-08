import { useState, Dispatch, SetStateAction } from "react";

const isWindow = typeof window !== "undefined";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, Dispatch<SetStateAction<void>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = isWindow && window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      isWindow &&
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(null);

      isWindow && window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue];
}
