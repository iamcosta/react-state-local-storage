import { useState, useEffect, useCallback } from 'react';

export interface UseLocalStorageConfigProps<U> {
  baseName: string;
  initialData: U;
}

export interface UseLocalStorageActionsProps<P> {
  data: P;
  setData: React.Dispatch<React.SetStateAction<P | null>>;
  setItem: <C>(key: string, data: C) => void;
  removeItem: (key: string) => void;
  clearStorage: () => void;
}

export function useLocalStorage<S = any>(
  config: UseLocalStorageConfigProps<S>,
): UseLocalStorageActionsProps<S>;

export function useLocalStorage<T>(config: UseLocalStorageConfigProps<T>) {
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

export function useLocalStoragePrototype<S = any>(key: string): {
  item: S,
  setItem: React.Dispatch<React.SetStateAction<S | null>>,
  removeItem: () => void,
  clearStorage: () => void
};
export function useLocalStoragePrototype<T>(key: string) {
  const storageData = localStorage.getItem(key);
  const [stateItem, setStateItem] = useState<T | null>(() => {
    if (storageData) {
      return JSON.parse(storageData);
    }
    return null;
  });

  const handleSetItem = useCallback((item: T | null) => {
    localStorage.setItem(key, JSON.stringify(item));
  }, [key]);

  const handleRemoveItem = useCallback(() => {
    setStateItem(null);
    localStorage.removeItem(key);
  }, [key]);

  const handleClear = useCallback(() => {
    setStateItem(null);
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (stateItem) {
      handleSetItem(stateItem);
    }
  }, [stateItem, handleSetItem]);

  return {
    item: stateItem,
    setItem: setStateItem,
    removeItem: handleRemoveItem,
    clearStorage: handleClear
  };
}
