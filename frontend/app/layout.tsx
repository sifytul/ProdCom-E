import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/Topbar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/store/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "ProcCom-E",
  description: "An e-commerce web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastContainer />;
        </body>
      </html>
    </ReduxProvider>
  );
}
