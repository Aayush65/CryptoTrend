import { useContext, useEffect, useState } from "react";
import { Button } from ".";
import { context } from "../context";

type PropType = {
    id: string;
    name: string;
    image: string;
    price: number;
}

const CoinDetails = (coin: PropType) => {
    const { watchList, setWatchList } = useContext(context);
    const [ isInWatchList, setIsInWatchList ] = useState(false);

    useEffect(() => {
        if (watchList[coin.id])
            setIsInWatchList(true);
    }, [])

    function handleWatchListUpdate() {
        if (isInWatchList) {
            const newWatchList = { ...watchList };
            delete newWatchList[coin.id];
            setWatchList(newWatchList);
        } else {
            const newWatchList = { ...watchList };
            newWatchList[coin.id] = coin.name;
            setWatchList(newWatchList);
        }
        setIsInWatchList(!isInWatchList);
    }

    return (
        <div className="w-full text-white flex items-center bg-accent p-5 rounded-xl font-semibold hover:cursor-pointer">
            <Button name={!isInWatchList ? "Add To WatchList" : "Remove from WatchList"} handleClick={handleWatchListUpdate} css={!isInWatchList ? "bg-text-primary text-text-secondary" : "bg-red-500 text-text-primary"} />
        </div>
    )
}

export default CoinDetails
