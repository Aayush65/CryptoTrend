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
        if (coinsData.length)
            return;
        const response = await axios.get(TrendingCoins("usd", page))
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

    return (
        <div className="max-w-screen md:py-20 md:p-20 lg:px-32 flex flex-col justify-around items-center text-text-secondary">
            { coinsData.length ? 
            <div className="flex flex-col items-center gap-5 w-full">
                <div className="flex items-center bg-primary text-secondary p-5 rounded-xl w-full font-bold text-lg">
                    <p className="w-[5%]"></p>
                    <p className="w-[23%]">Name</p>
                    <p className="w-[15%]">Price</p>
                    <p className="w-[18%]">Today's High</p>
                    <p className="w-[18%]">Today's Low</p>
                    <p className="w-[18%]">Market Cap</p>
                    <p className="w-[18%]">Volume</p>
                </div>
                {coinsData.map((coin, index) => (
                    <div key={index} className="flex items-center bg-secondary p-5 rounded-xl w-full font-semibold hover:cursor-pointer hover:scale-105 transition-transform ease-in">
                        <p className="font-extrabold w-[5%]">{(page - 1) * 10 + index + 1 + '.'}</p>
                        <div className="flex items-center w-[23%] gap-3">
                            <img src={coin.image} alt={coin.name + "_img"} className="contain w-16 h-16 rounded-full" />
                            <p>{coin.name}</p>
                        </div>
                        <p className="w-[15%]">{coin.current_price}</p>
                        <p className="w-[18%]">{coin.high_24h}</p>
                        <p className="w-[18%]">{coin.low_24h}</p>
                        <p className="w-[18%]">{Math.round(coin.market_cap / 1000000) > 1000 ? Math.round(coin.market_cap / 1000000000) + ' B' : Math.round(coin.market_cap / 1000000) + ' M'}</p>
                        <p className="w-[18%]">{Math.round(coin.total_volume / 1000000) > 1000 ? Math.round(coin.total_volume / 1000000000) + ' B' : Math.round(coin.total_volume / 1000000) + ' M'}</p>
                    </div>
                ))}
            </div> : 
            <div className="max-w-screen py-20 px-10 flex flex-col justify-around items-center">Loading...</div> }  

            <div className="flex text-text-primary mt-16 gap-3">
                { page - 1 > 0 ? <Button name={"⏮"} handleClick={() => handlePageChange(1)}/> : null}
                { page - 1 > 1 ? <p className="flex items-center font-extrabold justify-center tracking-widest mx-3 text-3xl">...</p> : null}
                { page - 1 > 0 ? <Button name={"◀"} handleClick={() => handlePageChange(page - 1)}/> : null}
                { page - 1 > 0 ? <Button name={page - 1 + ''} handleClick={() => handlePageChange(page - 1)}/> : null}
                <Button name={page + ''} handleClick={() => handlePageChange(page)}/>
                { page + 1 < 31 ? <Button name={page + 1 + ''} handleClick={() => handlePageChange(page + 1)}/>: null}
                { page + 1 < 31 ? <Button name={"▶"} handleClick={() => handlePageChange(page + 1)}/>: null}
                
                { page + 1 < 30 ? <p className="flex items-center font-extrabold justify-center tracking-widest mx-3 text-3xl">...</p> : null}
                { page + 1 < 31 ? <Button name={"⏭"} handleClick={() => handlePageChange(30)}/>: null}
            </div>
        </div>
    )
}

export default AppPage
