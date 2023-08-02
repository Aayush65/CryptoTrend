import { ReactNode, createContext, useEffect, useState } from 'react';

interface ContextData {
    email: string,
    setEmail: (newEmail: string) => void,
    isWatchListVisible: boolean,
    setIsWatchListVisible: (newBool: boolean) => void,
}

const context = createContext<ContextData>({ 
    email: "",
    setEmail: () => {},
    isWatchListVisible: false,
    setIsWatchListVisible: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [ email, setEmail ] = useState("");
    const [ isWatchListVisible, setIsWatchListVisible ] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("email") !== null)
            setEmail(localStorage.getItem("email") as string);
    }, [])

    const contextValue = { email, setEmail, isWatchListVisible, setIsWatchListVisible };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };