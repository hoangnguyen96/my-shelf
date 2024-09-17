import ChakraUIProviders from "@app/layouts/ChakraProvider";
import "../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Book Shelf",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>

      <body className={inter.className}>
        <ChakraUIProviders>
          <SessionProvider>
            <main className="app" style={{ padding: "48px 35px 38px" }}>
              {children}
            </main>
          </SessionProvider>
        </ChakraUIProviders>
      </body>
    </html>
  );
};

export default RootLayout;
