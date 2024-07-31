import React, { useEffect, useState } from "react";
import styles from "../styles/InitialBuy.module.css";
import UserProfile from "../Componenets/UserProfile";
import { useRevalidator } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InitialBuy = () => {
  const [stocks, setStocks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/stocks')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStocks(data.stocks);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
            navigate('/stocks');
          // Add logic to handle the end of the timer, such as disabling the buy button
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const handleQuantityChange = (stockId, value) => {
    setQuantities({
      ...quantities,
      [stockId]: value,
    });
  };

  const buyStock = (stockId) => {
    const quantity = quantities[stockId] || 0;

    const user = JSON.parse(localStorage.getItem('auth'));

    fetch(`http://localhost:5000/api/stocks/buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
            userId: user.user._id,
            stockId,
            quantity,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert(data.message);
        });

    fetch(`http://localhost:5000/api/user/data/${user.user._id}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        dispatch(user(data));
        localStorage.setItem('auth', JSON.stringify(data));
    });
    
    console.log(`Buying ${quantity} shares of stock with ID: ${stockId}`);
    // Add logic to handle stock purchase with the specified quantity
  };

  return (
    <div className={styles.container}>
      <UserProfile />
      <div className={styles.timer}>
        <h1>Time Left: {timeLeft} seconds</h1>
      </div>
      <h1 className={styles.heading}>Available Stocks</h1>
      <ul className={styles.stockList}>
        {stocks.map((stock) => (
          <li key={stock._id} className={styles.stockItem}>
            <span className={styles.stockName}>{stock.name}</span>
            <span className={styles.stockPrice}>${stock.currentPrice}</span>
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              className={styles.quantityInput}
              value={quantities[stock._id] || ''}
              onChange={(e) => handleQuantityChange(stock._id, e.target.value)}
              disabled={timeLeft === 0}
            />
            <button
              onClick={() => buyStock(stock._id)}
              className={styles.buyButton}
              disabled={timeLeft === 0}
            >
              Buy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InitialBuy;
