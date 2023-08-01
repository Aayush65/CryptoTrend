import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import Button from "./Button";

type CoinType = {
    name: string;
    image: string;
    current_price: number;
    high_24h: number;
    low_24h: number;
    market_cap: number;
    total_volume: number;
}

const AppPage = () => {

    const [ coinsData, setCoinsData ] = useState<CoinType[]>([]);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        getCoinData();
    }, [page])

    async function getCoinData() {
        const response = await axios.get(TrendingCoins("inr", page))
        const data = await response.data;
        console.log(data);
        setCoinsData(data);
    }

    function handlePageChange(newPage: number) {
        if (newPage === page)
            return;
        setCoinsData([]);
        setPage(newPage);
    }

    return coinsData.length ? (
        <div className="max-w-screen md:py-20 md:p-20 lg:px-32 flex flex-col justify-around items-center text-text-secondary">
            <div className="flex flex-col items-center gap-5 w-full">
                <div className="flex items-center bg-secondary p-5 rounded-xl w-full font-bold text-lg">
                    <p className="w-[5%]"></p>
                    <p className="w-[25%]">Name</p>
                    <p className="w-[15%]">Price</p>
                    <p className="w-[15%]">Today's High</p>
                    <p className="w-[15%]">Today's Low</p>
                    <p className="w-[20%]">Market Cap</p>
                    <p className="w-[20%]">Volume</p>
                </div>
                {coinsData.map((coin, index) => (
                    <div key={index} className="flex items-center bg-secondary p-5 rounded-xl w-full font-semibold">
                        <p className="font-extrabold w-[5%]">{index + 1 + '.'}</p>
                        <div className="flex items-center w-[25%] gap-3">
                            <img src={coin.image} alt={coin.name + "_img"} className="contain w-16 h-16 rounded-full" />
                            <p>{coin.name}</p>
                        </div>
                        <p className="w-[15%]">{coin.current_price}</p>
                        <p className="w-[15%]">{coin.high_24h}</p>
                        <p className="w-[15%]">{coin.low_24h}</p>
                        <p className="w-[20%]">{coin.market_cap}</p>
                        <p className="w-[20%]">{coin.total_volume}</p>
                    </div>
                ))}
            </div>
            <div className="flex text-text-primary mt-16 gap-3">
                { page - 1 > 0 ? <Button name={"⏮"} handleClick={() => handlePageChange(1)}/> : null}
                { page - 1 > 0 ? <p className="flex items-center font-extrabold justify-center tracking-widest mx-3 text-3xl">...</p> : null}
                { page - 1 > 0 ? <Button name={"◀"} handleClick={() => handlePageChange(page - 1)}/> : null}
                { page - 1 > 0 ? <Button name={page - 1 + ''} handleClick={() => handlePageChange(page - 1)}/> : null}
                <Button name={page + ''} handleClick={() => handlePageChange(page)}/>
                { page + 1 < 31 ? <Button name={page + 1 + ''} handleClick={() => handlePageChange(page + 1)}/>: null}
                { page + 1 < 31 ? <Button name={"▶"} handleClick={() => handlePageChange(page + 1)}/>: null}
                
                { page + 1 < 31 ? <p className="flex items-center font-extrabold justify-center tracking-widest mx-3 text-3xl">...</p> : null}
                { page + 1 < 31 ? <Button name={"⏭"} handleClick={() => handlePageChange(30)}/>: null}
            </div>
        </div>
    ) : <div className="max-w-screen py-20 px-10 flex flex-col justify-around items-center">Loading...</div>
}

export default AppPage
