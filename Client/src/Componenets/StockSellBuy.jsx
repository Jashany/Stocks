import React, { useEffect, useState } from "react";
import styles from '../styles/StockSellBuy.module.css';

const StockSellBuy = ({ stockId, onClose,stockName }) => {
    const [form, setForm] = useState({
        stockQuantity: '',
        price: ''
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('auth'));
        if (!user) {
            navigate('/');
        }
        setUser(user);
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/stocks/sell`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                quantity: form.stockQuantity,
                price: form.price,
                stockId: stockId,
                userId : user.user._id
            })

        }).then(response => response.json())    
        .then(data => {
            console.log(data);
            alert("Stock put for sale");
        });
        onClose(); // Close the popup after submitting
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h1 className={styles.heading}>Stock Sell: {stockName}</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Stock Quantity</label>
                    <input
                        type="number"
                        name="stockQuantity"
                        placeholder="Stock Quantity"
                        value={form.stockQuantity}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <label className={styles.label}>Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Sell</button>
                </form>
            </div>
        </div>
    );
};

export default StockSellBuy;
