import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* favicon */}
          <link href="/favicon.ico" rel="shortcut icon" />

          {/* Nanum Gothic ( https://fonts.google.com/specimen/Nanum+Gothic?subset=korean ) */}
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
