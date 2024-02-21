import React from "react";
import ReduxProvider from "@/store/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { type Metadata } from "next";
import "./globals.css";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "ProcCom-E",
  description: "An e-commerce web app",
};

const RootLayout = ({ children }: Props) => {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          {children}
          <ToastContainer />
        </body>
      </html>
    </ReduxProvider>
  );
};

export default RootLayout;
