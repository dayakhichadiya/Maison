import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Maison — Thoughtfully crafted essentials for a life well-lived." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
