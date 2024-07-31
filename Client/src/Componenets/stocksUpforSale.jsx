import React, { useEffect, useState } from "react";
import styles from "../styles/StocksSale.module.css";

const StocksSale = () => {
  const [stocks, setStocks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);


  const togglePopup = () => {
    setShowPopup(!showPopup);
    fetch('http://localhost:5000')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setStocks(data.transactions);
        }
    );  
    
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
                  <p>{stock?.stockId?.name}</p>
                  <p>${stock?.price}</p>
                  <p>
                    Quantity: {stock.quantity} | Seller: {stock?.userId?.username}
                  </p>
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
