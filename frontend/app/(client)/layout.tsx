import type { Metadata } from "next";
import TopBar from "@/components/Topbar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Header />
      {children}
      <Footer />
    </>
  );
}
