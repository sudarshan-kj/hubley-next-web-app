import Link from "next/link";
import styles from "@styles/About.module.css";

const About = () => (
  <div className={styles.container}>
    <h1>About page </h1>
    <Link href="/">
      <a>Go back</a>
    </Link>
  </div>
);

export default About;
