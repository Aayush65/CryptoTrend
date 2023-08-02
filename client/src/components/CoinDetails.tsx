import { useContext, useEffect, useState } from "react";
import { Button, LoadingSpinner } from ".";
import { context } from "../context";
import axios from "axios";
import { TrendChart } from "../config/urls";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

Chart.register( CategoryScale,LinearScale, PointElement, LineElement )


type PropType = {
    id: string;
    name: string;
    image: string;
    price: number;
}

const CoinDetails = (coin: PropType) => {
    const { watchList, setWatchList } = useContext(context);
    const [ trendList, setTrendList ] = useState<number[][]>([]);
    const [ days, setDays ] = useState(1);
    const [ isInWatchList, setIsInWatchList ] = useState(false);

    useEffect(() => {
        if (watchList[coin.id] && !isInWatchList)
            setIsInWatchList(true);
        getTrends();
    }, [days])

    async function getTrends() {
        const response = await axios.get(TrendChart(coin.id, days, "usd"));
        console.log(response.data.prices);
        setTrendList(response.data.prices); 
    }

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
        <div className="w-full flex items-center bg-[#7F669D] p-5 rounded-xl font-semibold hover:cursor-pointer h-[50vh]">
            <div className="w-[30%] flex flex-col justify-center items-center gap-5">
                <Button name={!isInWatchList ? "Add To WatchList" : "Remove from WatchList"} handleClick={handleWatchListUpdate} css={!isInWatchList ? "bg-text-primary text-text-secondary" : "bg-red-500 text-text-primary"} />
                <div className="flex flex-wrap gap-5 justify-center items-center text-text-primary">
                    <Button name={"Daily"} handleClick={() => setDays(1)} css=""/>
                    <Button name={"Monthly"} handleClick={() => setDays(30)} css=""/>
                    <Button name={"Yearly"} handleClick={() => setDays(365)} css=""/>
                </div>
            </div>
            <div className="w-[70%] h-[50vh] flex justify-center items-center p-4">
                { trendList.length ? <Line data={{
                    labels: trendList.map((coin) => {
                        let date = new Date(coin[0]);
                        let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`
                        return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [{ 
                        data: trendList.map((coin) => coin[1]), 
                        label: `Price (Past ${days === 1 ? "24 hrs" : days === 30 ? "30 days" : "365 days"}) in USD`, 
                        borderColor: "#FFF9C9" }],
                }} options={{
                    elements: { point: { radius: 1 } },
                    scales: {
                        x: { ticks: { color: "#ebc7d3" } },
                        y: { ticks: { color: "#ebc7d3" } }
                    },
                    plugins: { legend: { labels: { color: "#ebc7d3"}}}
                }}
                /> : <LoadingSpinner />}
            </div>
        </div>
    )
}

export default CoinDetails