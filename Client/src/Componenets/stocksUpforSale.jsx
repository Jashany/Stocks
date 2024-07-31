import React, { useEffect, useState } from "react";
import styles from "../styles/StocksSale.module.css";

const StocksSale = () => {
  const [stocks, setStocks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchStocks = async () => {
        console.log("fetching stocks");
      const response = await fetch("http://localhost:5000/api/stocks/forsale");
      const data = await response.json();
      console.log(data);
      setStocks(data.transactions);
    };
    fetchStocks();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className={styles.stocksSaleBox} onClick={togglePopup}>
        Stocks for Sale
      </div>
      {showPopup && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={togglePopup}>X</button>
            <h2>Available Stocks</h2>
            <ul className={styles.stockList}>
              {stocks.map((stock) => (
                <li key={stock._id} className={styles.stockItem}>
                  <p>{stock.name}</p>
                  <p>${stock.currentPrice}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksSale;
