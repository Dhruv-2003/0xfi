import React from "react";
import styles from "../css/Layout.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.svg";

export default function Layout({ children }) {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image className={styles.logo} src={logo} />
        </div>
        <span className={styles.navlink}>
          <Link href="/dashboard">Dashboard</Link>
        </span>
      </nav>
      {children}
      <footer className={styles.footer}></footer>
    </>
  );
}
