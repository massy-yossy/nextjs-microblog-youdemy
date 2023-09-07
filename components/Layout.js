import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "yosimoto masashi";
export const siteTitle = "Next.js blog";

function Layout(props) {
  const { children, home } = props;
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
              src="/images/profile.png"
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              className={`${utilStyles.borderCircle}`}
              src="/images/profile.png"
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← ホームに戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
