import React, { useState } from "react";
import styles from "../styles/Headline.module.css";

const Headline = () => {
  const [showPopup, setShowPopup] = useState(false);

  const headlines = [
    "Breaking News: Market Hits All-Time High!",
    "Update: New Tech Stocks Soar in Value",
    "Alert: Economic Downturn Predicted Next Quarter",
    "News: Major Company Files for Bankruptcy",
  ];

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className={styles.headline} onClick={togglePopup}>
        {headlines[0]}
      </div>
      {showPopup && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={togglePopup}>X</button>
            <h2>All Headlines</h2>
            <ul className={styles.headlineList}>
              {headlines.map((headline, index) => (
                <li key={index} className={styles.headlineItem}>{headline}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Headline;
