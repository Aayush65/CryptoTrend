import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { context } from "../context";
import axios from "axios";


const Navbar = () => {
    const [ showWatchListButton, setShowWatchListButton ] = useState(false);
    
    const { email, setEmail, isWatchListVisible, setIsWatchListVisible, setWatchList } = useContext(context);

    useEffect(() => {
        if (!localStorage.getItem("email"))
            return;
        setShowWatchListButton(true);
        getWatchList();
    }, [])

    async function getWatchList() {
        try {
            const response = await axios.get(`http://localhost:3000/${localStorage.getItem("email")}`);
            console.log(response.data.watchList);
            setWatchList(response.data.watchList);
        } catch (err) {
            console.log(err);
        }
    }

    function handleClick() {
        if (!email)
            return
        axios.post("http://localhost:3000/new-user", { email })
        localStorage.setItem("email", email);
        setShowWatchListButton(true);
    }

    function toggleWatchList() {
        setIsWatchListVisible(!isWatchListVisible);
    }

    return (
        <div className="max-w-screen h-20 p-4 px-10 flex items-center justify-end gap-3">
            <input type="email" className="p-3 rounded-md text-text-secondary" placeholder="Enter your Email: " value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button name={"Save"} handleClick={handleClick} css={""} />
            {showWatchListButton ? <Button name={"WatchList"} handleClick={toggleWatchList} css={""}/> : null}
        </div>
    )
}

export default Navbar;