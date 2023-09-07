import Head from "next/head";
import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>最初の投稿です</title>
      </Head>
      <div>
        <h1>こんにちは</h1>
        <h2>初めての投稿ですね！</h2>
        <Link href="/">ホームに戻る</Link>
      </div>
    </>
  );
}
