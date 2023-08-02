import { useContext } from "react"
import { context } from "../context";

const WatchList = () => {
    const { watchList, setWatchList } = useContext(context);

    function handleWatchListUpdate(id: string) {
        const newWatchList = { ...watchList };
        delete newWatchList[id];
        setWatchList(newWatchList);
    }

    return (
        <div className="fixed backdrop-blur-lg w-screen right-0 top-20 bottom-0 flex justify-end text-text-secondary">
            <div className=" bg-secondary w-1/4 h-3/4 flex flex-col items-center p-10 gap-5 rounded-2xl">
                <h1 className="text-xl font-extrabold">Watch List</h1>
                <ul className="w-full min-h-1/2 h-full bg-background rounded-xl p-4 overflow-y-auto flex flex-col gap-2">
                    {Object.keys(watchList).map((id, index) => (
                        <li key={index} className="p-3 bg-secondary rounded-xl flex justify-between items-center">
                            <p>{watchList[id][0]}</p>
                            <p className="cursor-pointer text-red-600 font-black text-xl" onClick={() => handleWatchListUpdate(id)}>🗑</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default WatchList