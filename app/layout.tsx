import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Eisenhower Matrix",
  description: "Implements the Eisenhower Matrix methodology for task management and prioritization.",
};

export const viewport: Viewport = {
  themeColor: '#37b6fc',
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: '#37b6fc' }, // for light mode
  //   { media: '(prefers-color-scheme: dark)', color: '#0056b3' },  // for dark mode
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#007bff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className="w-screen max-w-full mx-auto p-6 flex flex-col md:flex-row justify-around">
            {children}
          </div>
      </body>
    </html>
  );
}
