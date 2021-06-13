import styles from "@styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/secret">
        <a className={styles.link}>Home page</a>
      </Link>
    </>
  );
}
