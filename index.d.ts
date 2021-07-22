/// <reference types="react" />
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
export declare function useLocalStorage<S = any>(config: UseLocalStorageConfigProps<S>): UseLocalStorageActionsProps<S>;
export declare function useLocalStoragePrototype<S = any>(key: string): {
    item: S;
    setItem: React.Dispatch<React.SetStateAction<S | null>>;
    removeItem: () => void;
    clearStorage: () => void;
};
