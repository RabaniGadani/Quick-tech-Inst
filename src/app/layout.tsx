import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google"
import Header from "@/components/Header";


const roboto = Roboto({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "QUICK TECH INSTITUTE ",
  description: "Quick Tech Institute of Information Technology",
  icons: {
    icon: {url: "/logo11.jpg", type: "image/jpg"}
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
