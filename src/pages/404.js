import React from "react";
import Image from "next/image";
import Link from "next/link";

import Layout from "@layout/MainLayout";

const NotFoundPage = () => {
  return (
    <Layout pageName={"Page not found | Rick-a-nation"}>
      <div className="flex h-screen flex-col items-center justify-center">
        <Link href="/">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-4xl font-bold">Page not found.</h1>
            <p className="text-gray-600">
              Oh, it seems that this page doesn&apos;t exist.
            </p>
            <p className="my-3 text-gray-600">
              <span>Click here to go to </span>
              <span className="text-blue-500">the main page</span>
              <span>.</span>
            </p>
            <figure>
              <Image
                src="/404rick.gif"
                width={360}
                height={360}
                className="w-100"
                quality={100}
                alt="404 Rick"
                title="Main page"
              />
            </figure>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
