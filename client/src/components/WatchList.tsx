import { useState } from "react"

const WatchList = () => {
    const [ watchList, setWatchList ] = useState<string[][]>([["BitCoin"],["Ethereum"],["Tether"],["Solnium"],["sdfasdd"],["czsdfawsd"],["Ethereum"],["Tether"],["Solnium"]])

    function handleWatchListUpdate(index: number) {
        setWatchList([...watchList.slice(0, index), ...watchList.slice(index + 1)])
    }

    return (
        <div className="fixed backdrop-blur-lg w-screen right-0 top-20 bottom-0 flex justify-end text-text-secondary">
            <div className=" bg-secondary w-1/4 h-3/4 flex flex-col items-center p-10 gap-5 rounded-2xl">
                <h1 className="text-xl">Watch List</h1>
                <ul className="w-full min-h-1/2 h-3/4 bg-pink-100 rounded-xl p-4 overflow-y-auto">
                    {watchList.map((item, index) => (
                        <li key={index} className="p-3 border-black border-2 rounded-xl flex justify-between items-center">
                            <p>{item[0]}</p>
                            <p className="cursor-pointer text-red-600 font-black text-xl" onClick={() => handleWatchListUpdate(index)}>🗑</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default WatchList
