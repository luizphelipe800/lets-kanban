import { createContext } from 'react';

export const boardContext = createContext();

export const BoardProvider = ({ children, value }) => {
    return (
        <boardContext.Provider value={value}>
            { children }
        </boardContext.Provider>
    )
}