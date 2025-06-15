import type { Metadata } from "next";
import { Ubuntu_Mono } from 'next/font/google'
import "./globals.css";

const ubuntuMono = Ubuntu_Mono({ 
  weight: '400',
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: "balitabytes",
  description: "your AI-powered news app that brings you the most important Philippine news, summarized and ready to read in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntuMono.className}>{children}</body>
    </html>
  )
}
