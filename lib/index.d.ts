/// <reference types="react" />
export interface UseLocalStorageConfigInterface<U> {
    baseName: string;
    initialData: U;
}
export declare function useLocalStorage<S = any>(config: UseLocalStorageConfigInterface<S>): {
    data: S;
    setData: React.Dispatch<React.SetStateAction<S | null>>;
    setItem: <C>(key: string, data: C) => void;
    removeItem: (key: string) => void;
    clearStorage: () => void;
};
