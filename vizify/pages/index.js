import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

// Import the Example component
import Example from '../components/Example';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vizify</title>
        <meta name="description" content="Vizify HubSpot App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Vizify</a>
        </h1>

        <p className={styles.description}>
          A HubSpot application deployed on Vercel
        </p>

        <div className={styles.card}>
          <Example />
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by Vercel
        </a>
      </footer>
    </div>
  );
}