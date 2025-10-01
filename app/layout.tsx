import type { Metadata } from "next";
import { TodoStoreProvider } from "./lib/store/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo application built with Next.js and Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <TodoStoreProvider>{children}</TodoStoreProvider>
      </body>
    </html>
  );
}
