import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth) {
      navigate("/");
    }
    setUser(auth);
  }, []);

  setTimeout(() => {
    fetch(`http://localhost:5000/api/user/${user.user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((auth) => {
        setUser(auth);
      });
  }, 1000);

  return (
    <>
      <div className={styles.profileBox}>
        <h1 className={styles.heading}>User Profile</h1>
        <p className={styles.text}>Username: {user?.user?.username}</p>
        <p className={styles.text}>Email: {user?.user?.email}</p>
        <p className={styles.text}>Money: ${user?.user?.money}</p>
        <h1>Stocks</h1>
        <ul>
          {user?.user?.stocks?.map((stock) => (
            <li key={stock._id}>
              <p>{stock?.stockId?.name}</p>
              <p>Quantity: {stock.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;
