import React from "react";
import styles from "../css/Layout.module.css";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav className={styles.navbar}>
        <h2>CreatorFi</h2>
        <span className={styles.navlink}>
          <Link href="/dashboard">Dashboard</Link>
        </span>
      </nav>
      {children}
      <footer className={styles.footer}></footer>
    </>
  );
}
