import axios from 'axios';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { server } from './config/urls';

interface ContextData {
    email: string;
    setEmail: (newEmail: string) => void;
    id: string;
    setId: (newId: string) => void;
    isWatchListVisible: boolean;
    setIsWatchListVisible: (newBool: boolean) => void;
    watchList: {[key: string]: string[]};
    setWatchList: (newWatchList: {[key: string]: string[]}) => void;
}

const context = createContext<ContextData>({ 
    email: "",
    setEmail: () => {},
    id: "",
    setId: () => {},
    isWatchListVisible: false,
    setIsWatchListVisible: () => {},
    watchList: {},
    setWatchList: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [ email, setEmail ] = useState("");
    const [ id, setId ] = useState("");
    const [ isWatchListVisible, setIsWatchListVisible ] = useState(false);
    const [ watchList, setWatchList ] = useState<{[key: string]: string[]}>({});

    useEffect(() => {
        if (localStorage.getItem("email"))
            setEmail(localStorage.getItem("email") as string);
    }, [])

    useEffect(() => {
        if (!email || !watchList)
            return;
        axios.post(server, { email, watchList })
    }, [watchList])

    const contextValue = { email, setEmail, id, setId, isWatchListVisible, setIsWatchListVisible, watchList, setWatchList };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };