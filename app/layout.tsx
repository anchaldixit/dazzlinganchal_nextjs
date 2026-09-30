import type { Metadata } from "next";
import "./globals.css";
import Header from "./compontents/common/Header";
import Footer from "./compontents/common/Footer";

export const metadata: Metadata = {
  title: "Dazzling Anchal — Travel · Trekking · Running · Stories",
  description:
    "A personal journal of places explored, trails walked, races run, and stories worth keeping.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}