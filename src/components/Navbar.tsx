import Button from "./Button";


const Navbar = () => {

    function handleClick() {
        console.log("Clicked");
    }

    return (
        <div className="max-w-screen h-20 p-4 px-10 flex items-center justify-end">
            <Button name={"Login"} handleClick={handleClick} />
        </div>
    )
}

export default Navbar;