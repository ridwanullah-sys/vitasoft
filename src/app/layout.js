import { Inter } from "next/font/google";
import "./globals.css";
import UserContextProvider from "./context/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VITASOFT",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
