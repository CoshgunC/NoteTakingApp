import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Note taking app",
  description: "Fully working note taking app for you to save, edit, create and delete notes anywhere - with just one login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} w-screen h-screen overflow-y-auto p-8 bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
