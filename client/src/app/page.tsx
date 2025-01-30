'use client'

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState(null);
  const [payment, setPayment] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // View forwarded ports in VSCode to determine your port
        const response = await fetch('http://localhost:8899/');
        const jsonData = await response.json();

        setData(jsonData.text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const handlePaymentSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8899/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Payment successful:', result);
    } catch (error) {
      console.error('Error posting payment:', error);
    }
  };

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
          value={payment}
          onChange={handlePaymentChange}
        />
        <button onClick={handlePaymentSubmit} className={styles.button}>
          Submit Payment
        </button>
      </main>
    </div>
  );
}
