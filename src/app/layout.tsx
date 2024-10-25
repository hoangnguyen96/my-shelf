import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import ChakraUIProviders from "@app/layouts/ChakraProvider";
import "../styles/globals.css";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@app/themes";

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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>

      <body className={inter.className}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
