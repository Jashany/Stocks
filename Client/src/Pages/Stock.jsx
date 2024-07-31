import React, { useEffect, useState } from "react";
import styles from "../styles/Stocks.module.css";
import UserProfile from "../Componenets/UserProfile";
import StockSellBuy from "../Componenets/StockSellBuy";
import Headline from "../Componenets/Headlines";
import StocksSale from "../Componenets/stocksUpforSale";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (!user) {
      navigate("/");
    }
    setUser(user);
    console.log(user);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/stocks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStocks(data.stocks);
      });
  }, []);

  const openPopup = (stockId) => {
    setSelectedStock(stockId);
  };

  const closePopup = () => {
    setSelectedStock(null);
  };

  return (
    <div className={styles.container}>
      <UserProfile />
      <Headline />
      <StocksSale />
      <div className={styles.grid}>
        {stocks?.map((stock) => (
          <div key={stock._id} className={styles.card}>
            <h2 className={styles.name}>{stock.name}</h2>
            <p className={styles.price}>${stock.currentPrice}</p>
            <p className={styles.id}>ID: {stock._id}</p>
            <button className={styles.button} onClick={() => openPopup(stock)}>
              Sell Stock
            </button>
          </div>
        ))}
      </div>
      {selectedStock && <StockSellBuy stockId={selectedStock._id} onClose={closePopup} stockName={selectedStock.name} />}
    </div>
  );
};

export default Stocks;
