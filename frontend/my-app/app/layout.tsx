import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo List dApp",
  description: "A todo list application built on Base",
  other: {
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: 'https://your-app.com/embed-image',
      button: {
        title: `Launch Todo List App`,
        action: {
          type: 'launch_miniapp',
          name: 'Todo List Mini App',
          url: 'https://base-task5-dvgq.vercel.app/',
          splashImageUrl: 'https://your-app.com/splash-image',
          splashBackgroundColor: '#000000',
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
