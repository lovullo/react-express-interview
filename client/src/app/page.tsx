'use client'

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // View forwarded ports in VSCode to determine your port
        const response = await fetch('http://localhost:62396/');
        const jsonData = await response.json();

        setData(jsonData.text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h1>
        {data ? (
          data
        ) : (
          <p>Loading data...</p>
        )}
      </h1>
        <label htmlFor="payment" className={styles.label}>
          Payment amount
        </label>
        <input
          type="text"
          id="payment"
          name="payment"
          className={styles.input}
          placeholder="Enter amount"
        />
      </main>
    </div>
  );
}
