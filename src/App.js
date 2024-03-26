import React, { useEffect, useState } from "react";
import HeaderInfos from "./components/HeaderInfos";
import Table from "./components/Table";
import GlobalChart from "./components/GlobalChart";
import ToTop from "./components/ToTop";
import axios from "axios";

const App = () => {
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
      )
      .then((res) => setCoinsData(res.data));

    const getScrollYThreshold = () => {
      if (window.innerWidth > 820) {
        return 200;
      } else if (window.innerWidth > 420) {
        return 400;
      } else {
        return 600;
      }
    };

    const handleScroll = () => {
      const scrollYThreshold = getScrollYThreshold();

      if (window.scrollY > scrollYThreshold) {
        document.querySelector(".table-header").classList.add("active");
      } else {
        document.querySelector(".table-header").classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      <header>
        <HeaderInfos />
        <GlobalChart coinsData={coinsData} />
      </header>
      <Table coinsData={coinsData} />
      <ToTop />
    </div>
  );
};

export default App;
