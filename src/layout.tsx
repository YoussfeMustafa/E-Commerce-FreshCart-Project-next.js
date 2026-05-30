import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./app/_components/Navbar/Navbar";
import FooterAllComponent from "./app/_components/FooterAllComponent/FooterAllComponent";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/provider/auth-provider";
import { CartContextProvider } from "@/context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Your favorite online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* الحل الجذري للرسالة الحمراء: استيراد FontAwesome عبر CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <AuthProvider>
          <CartContextProvider>
            <Toaster position="top-right" />
            <Navbar />
            
            <main className="min-h-screen pt-28"> {/* pt-28 لإعطاء مساحة تحت النافبار الثابت */}
              {children}
            </main>

            {/* قسم الميزات (Features) */}
            <div className="container mx-auto px-6 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: "fa-truck", title: "Free Shipping", sub: "Above 500 EGP", color: "text-blue-600" },
                  { icon: "fa-shield-halved", title: "Secure Payment", sub: "100% Protected", color: "text-green-600" },
                  { icon: "fa-tag", title: "Best Offers", sub: "Daily Discounts", color: "text-purple-600" },
                  { icon: "fa-rotate-left", title: "Easy Returns", sub: "7 Days Returns", color: "text-amber-600" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center group">
                    <div className={`flex-shrink-0 w-12 h-12 bg-green-50 ${item.color} rounded-lg flex justify-center items-center`}>
                      <i className={`fa-solid ${item.icon} text-xl`}></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <FooterAllComponent />
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}