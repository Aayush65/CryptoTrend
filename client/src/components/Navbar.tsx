import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { context } from "../context";


const Navbar = () => {
    const [ showWatchListButton, setShowWatchListButton ] = useState(false);
    
    const { email, setEmail, isWatchListVisible, setIsWatchListVisible } = useContext(context);

    useEffect(() => {
        if (localStorage.getItem("email") !== null)
            setShowWatchListButton(true);
    }, [])

    function handleClick() {
        if (!email)
            return
        localStorage.setItem("email", email);
        setShowWatchListButton(true);
    }

    function toggleWatchList() {
        setIsWatchListVisible(!isWatchListVisible);
    }

    return (
        <div className="max-w-screen h-20 p-4 px-10 flex items-center justify-end gap-3">
            <input type="email" className="p-3 rounded-md text-text-secondary" placeholder="Enter your Email: " value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button name={"Save"} handleClick={handleClick} />
            {showWatchListButton ? <Button name={"WatchList"} handleClick={toggleWatchList}/> : null}
        </div>
    )
}

export default Navbar;