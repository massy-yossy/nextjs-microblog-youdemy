import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "@/components/Layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getPostsData } from "@/lib/post";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// SSGの場合
export async function getStaticProps() {
  const postData = getPostsData();
  return {
    props: {
      postData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps (context) { //contextは情報が入る
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     }
//   }

// }


export default function Home(props) {
  const { postData } = props;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyles.headingMd}>
          私はエンジニアの勉強をしています。もっともっと頑張るしん
        </p>
      </section>
      <section>
        <h2>📝エンジニアのブログしん</h2>
        <div className={styles.grid}>
          {postData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  className={styles.thumbnailImage}
                  src={thumbnail}
                  alt=""
                />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyles.boldText}>
                  {title}
                </a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
