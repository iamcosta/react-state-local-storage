import { useState, useEffect, useCallback } from 'react';

export interface UseLocalStorageConfigInterface<U> {
  baseName: string;
  initialData: U;
}

export function useLocalStorage<S = any>(
  config: UseLocalStorageConfigInterface<S>,
): {
  data: S;
  setData: React.Dispatch<React.SetStateAction<S | null>>;
  setItem: <C>(key: string, data: C) => void;
  removeItem: (key: string) => void;
  clearStorage: () => void;
};
export function useLocalStorage<T>(config: UseLocalStorageConfigInterface<T>) {
  const [storageData, setStorageData] = useState<T | null>(null);

  const handleSetData = useCallback(
    (data: T | null) => {
      for (const [key, value] of Object.entries(data ? data : {})) {
        if (value) {
          localStorage.setItem(`${config.baseName}/${key}`, JSON.stringify(value));
        }
      }
    },
    [config.baseName],
  );

  const handleGetData = useCallback(() => {
    let newData: any = {};
    for (const [key] of Object.entries(config.initialData)) {
      const item = localStorage.getItem(`${config.baseName}/${key}`);
      newData = { ...newData, [key]: item && JSON.parse(item) };
    }
    if (newData.constructor === Object && Object.keys(newData).length !== 0) {
      setStorageData(newData);
    } else {
      setStorageData(null);
    }
  }, [config.initialData, config.baseName]);

  const handleSetItem = useCallback(
    <I>(key: string, data: I) => {
      localStorage.setItem(`${config.baseName}/${key}`, JSON.stringify(data));
      handleGetData();
    },
    [config.baseName, handleGetData],
  );

  const handleRemoveItem = useCallback(
    (key: string) => {
      localStorage.removeItem(`${config.baseName}/${key}`);
      handleGetData();
    },
    [config.baseName, handleGetData],
  );

  const handleClearStorage = useCallback(() => {
    localStorage.clear();
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSetData(storageData);
  }, [storageData, handleSetData]);

  return {
    data: storageData,
    setData: setStorageData,
    setItem: handleSetItem,
    removeItem: handleRemoveItem,
    clearStorage: handleClearStorage,
  };
}
