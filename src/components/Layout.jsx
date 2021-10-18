import Header from './Header';
import Head from 'next/head';
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Instagram Clone App</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
}
