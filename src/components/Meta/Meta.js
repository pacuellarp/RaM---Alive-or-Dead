// components/Meta.js

import Head from "next/head";

export default function Meta({ pageName }) {
  return (
    <Head>
      <title>{`${pageName}`}</title>

      <meta
        name="description"
        content="Is your favorite Rick and Morty character dead or alive? Let's find it out!"
      />
      <link rel="icon" href="/favicon.png" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta charset="utf-8" />
    </Head>
  );
}
