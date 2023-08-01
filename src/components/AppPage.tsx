import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import Button from "./Button";

type CoinType = {
    name: string;
    image: string;
    price: number;
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
        <div className="max-w-screen py-20 px-10 flex flex-col justify-around items-center">
            <div className="flex flex-wrap items-center gap-10">
                {coinsData.map((coin, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <img src={coin.image} alt={coin.name + "_img"} className="contain w-32 h-32" />
                        <p>{coin.name}</p>
                    </div>
                ))}
            </div>
            <div className="flex">
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
