import type { Metadata } from "next";
import "./globals.css";
import {Inter, Bebas_Neue, Spline_Sans_Mono, Manrope} from 'next/font/google'
import LenisProvider from "@/components/common/LenisProvider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ['latin'],
  variable: '--font-bebas',
})

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})



export const metadata: Metadata = {
  title: "Learnova",
  description: "The smarter way to learn and retain knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${splineSansMono.variable} ${manrope.variable}`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
