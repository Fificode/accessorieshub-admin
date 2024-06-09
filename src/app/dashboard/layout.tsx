import type { Metadata } from "next";
import LeftSideBar from "../components/layout/LeftSideBar";



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
      <body>
        <LeftSideBar/>
        {children}
        </body>
    </html>
  );
}
