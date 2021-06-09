import Link from "next/link";
import styles from "@styles/Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [headerBg, setHeaderBg] = useState("#0070f3");

  useEffect(() => {
    const listenScrollEvent = (e) => {
      if (window.scrollY > 199) {
        setHeaderBg("black");
      } else {
        setHeaderBg("#0070f3");
      }
    };
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div style={{ background: headerBg }} className={styles.container}>
      <div className={styles.logo}>
        <h1>Logo</h1>
      </div>
      <nav className={styles.navBar}>
        <ul className={styles.links}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
