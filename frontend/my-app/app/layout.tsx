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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Todo List dApp",
    description: "A todo list application built on Base",
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: 'https://i.postimg.cc/wMtLzNh9/Pngtree-to-do-list-icon-cartoon-5080528.png',
        button: {
          title: `Launch TodoApp`,
          action: {
            type: 'launch_miniapp',
            name: 'Todo List Mini App',
            url: 'https://base-task5-dvgq.vercel.app/',
            splashImageUrl: 'https://base-task5-dvgq.vercel.app/file.svg',
            splashBackgroundColor: '#000000',
          },
        },
      }),
    },
  };
}

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
