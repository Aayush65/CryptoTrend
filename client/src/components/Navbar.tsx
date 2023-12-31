import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { context } from "../context";
import axios from "axios";
import { server } from "../config/urls";


const Navbar = () => {
    const [ showWatchListButton, setShowWatchListButton ] = useState(false);
    
    const { email, setEmail, setId, isWatchListVisible, setIsWatchListVisible, setWatchList } = useContext(context);

    useEffect(() => {
        if (!localStorage.getItem("email"))
            return;
        setShowWatchListButton(true);
        getWatchList();
    }, [])

    async function getWatchList() {
        try {
            const response = await axios.get(`${server}/${localStorage.getItem("email")}`);
            console.log(response.data.watchList);
            setWatchList(response.data.watchList);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleClick() {
        if (!email)
            return
        const response = await axios.post(`${server}/new-user`, { email });
        setId(response.data.id)
        localStorage.setItem("email", email);
        localStorage.setItem("id", response.data.id);
        setShowWatchListButton(true);
    }

    function toggleWatchList() {
        setIsWatchListVisible(!isWatchListVisible);
    }

    return (
        <div className="hidden md:flex max-w-screen fixed p-4 md:p-10 flex-col md:flex-row items-center justify-between gap-3 w-full bg-gradient-to-b from-black via-background to-transparent backdrop-blur-lg">
            <h1 className="text-2xl md:text-3xl font-black">Crypto-Trend</h1>
            <div className="flex gap-1 md:gap-3 items-center">
                <input type="email" className="p-2 md:p-3 rounded-md text-text-secondary bg-secondary placeholder:text-text-secondary" placeholder="Enter your Email: " value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button name={"Save"} handleClick={handleClick} css={""} />
                {showWatchListButton ? <Button name={"WatchList"} handleClick={toggleWatchList} css={""}/> : null}
            </div>
        </div>
    )
}

export default Navbar;