import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import colors from "../styles/_settings.scss";

const CoinChart = ({ coinId, coinName, onDimensionsChange }) => {
  const [coinData, setCoinData] = useState();
  const [duration, setDuration] = useState(30);
  const [chartDimensions, setChartDimensions] = useState({
    width: 300,
    height: 120,
  });

  const headerData = [
    [1, "1 jr"],
    [3, "3 jrs"],
    [7, "7 jrs"],
    [30, "1 m"],
    [91, "3 m"],
    [181, "6 m"],
    [365, "1 an"],
    [3000, "Max"],
  ];

  const updateDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

    let chartWidth, chartHeight;

    if (width > 1200) {
      // Grands écrans
      chartWidth = 800; // Largeur maximale pour grands écrans
      chartHeight = 300;
    } else if (width > 768) {
      // Laptops et tablettes en paysage
      chartWidth = width - 200; // Laisser un peu de marge
      chartHeight = 200;
    } else if (width > 480) {
      // Tablettes en portrait
      chartWidth = width - 100; // Laisser un peu de marge
      chartHeight = 150;
    } else {
      // Smartphones
      chartWidth = width - 20; // Laisser un peu de marge sur les côtés
      chartHeight = width > height ? 150 : 120; // Hauteur plus petite en paysage
    }

    setChartDimensions({ width: chartWidth, height: chartHeight });
    onDimensionsChange({ width: chartWidth, height: chartHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    let dataArray = [];

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
          duration > 32 ? "&interval=daily" : ""
        }`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < "50" ? price : parseInt(price),
          });
        }
        setCoinData(dataArray);
      });
  }, [coinId, duration]);

  return (
    <div className="coin-chart">
      <p>{coinName}</p>
      <div className="btn-container">
        {headerData.map((radio) => {
          return (
            <div
              htmlFor={"btn" + radio[0]}
              onClick={() => setDuration(radio[0])}
              key={radio[0]}
              className={radio[0] === duration ? "active-btn" : ""}
            >
              {radio[1]}
            </div>
          );
        })}
      </div>
      <AreaChart
        width={chartDimensions.width}
        height={chartDimensions.height}
        data={coinData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="7%" stopColor={colors.color1} stopOpacity={0.8} />
            <stop offset="93%" stopColor={colors.white1} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke={colors.color1}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default CoinChart;
