import { useState } from "react";
import Button from "./Button";


const Navbar = () => {
    const [ email, setEmail ] = useState(localStorage.getItem("email") || "");

    function handleClick() {
        if (!email)
            return
        localStorage.setItem("email", email);
    }

    return (
        <div className="max-w-screen h-20 p-4 px-10 flex items-center justify-end gap-3">
            <input type="email" className="p-3 rounded-md text-text-secondary" placeholder="Enter your Email: " onChange={(e) => setEmail(e.target.value)} />
            <Button name={"Save"} handleClick={handleClick} />
        </div>
    )
}

export default Navbar;