import { ReactNode, createContext, useEffect, useState } from 'react';

interface ContextData {
    email: string;
    setEmail: (newEmail: string) => void;
    isWatchListVisible: boolean;
    setIsWatchListVisible: (newBool: boolean) => void;
    watchList: {[key: string]: string};
    setWatchList: (newWatchList: {[key: string]: string}) => void;
}

const context = createContext<ContextData>({ 
    email: "",
    setEmail: () => {},
    isWatchListVisible: false,
    setIsWatchListVisible: () => {},
    watchList: {},
    setWatchList: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [ email, setEmail ] = useState("");
    const [ isWatchListVisible, setIsWatchListVisible ] = useState(false);
    const [ watchList, setWatchList ] = useState<{[key: string]: string}>({});
    useEffect(() => {
        if (localStorage.getItem("email") !== null)
            setEmail(localStorage.getItem("email") as string);
    }, [])

    const contextValue = { email, setEmail, isWatchListVisible, setIsWatchListVisible, watchList, setWatchList };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };