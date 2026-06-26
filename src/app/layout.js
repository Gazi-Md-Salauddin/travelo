import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Toaster } from "react-hot-toast"
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Travelo",
  description: "Online Ticket booking platform",
};

export default function RootLayout({ children }) {
      
  return(
  <html
      lang="en"
      className="h-full antialiased"
    suppressHydrationWarning
    >
      <body className="min-h-full">
       <Providers> 
      <Toaster/>
        <Navbar/>     
      {children}
        <Footer/>
       </Providers>
      </body>
    </html>
  );
}
