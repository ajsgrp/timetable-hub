import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalendarProvider } from "../context/CalendarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TimeTable Hub",
  description: "Smart Productivity Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-100">

        <CalendarProvider>
          {children}
        </CalendarProvider>

      </body>
    </html>
  );
}