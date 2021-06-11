import styles from "@styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

export default function Page() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && <Link href="/signin">Sign in</Link>}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      <Link href="/secret">
        <a className={styles.link}>Secret</a>
      </Link>
    </>
  );
}
