import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSideBar from "../components/layout/LeftSideBar";
import TopBar from "../components/layout/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Accessories Hub Dashboard page",
  description: "Admin Dashboard to manage Accessories Hub data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex max-lg:flex-col">
        <LeftSideBar/>
        <TopBar/>
       <div className="flex-1"> {children}</div>
        </div>
        </body>
    </html>
  );
}
