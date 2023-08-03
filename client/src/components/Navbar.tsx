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
        <div className="max-w-screen fixed h-20 p-10 flex items-center justify-between gap-3 w-full bg-gradient-to-b from-black via-background to-transparent backdrop-blur-lg">
            <h1 className="text-3xl font-black">Crypto-Watch</h1>
            <div className="flex gap-3 items-center">
                <input type="email" className="p-3 rounded-md text-text-secondary bg-secondary" placeholder="Enter your Email: " value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button name={"Save"} handleClick={handleClick} css={""} />
                {showWatchListButton ? <Button name={"WatchList"} handleClick={toggleWatchList} css={""}/> : null}
            </div>
        </div>
    )
}

export default Navbar;