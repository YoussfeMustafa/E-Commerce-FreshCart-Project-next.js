"use client";
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Heart, Truck, Gift, LogIn, UserPlus, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from './Search/page';
import { CartContext } from '@/context/CartContext';

export default function Navbar() {
  const { CartCount, WishlistCount = 0, updateCartCount } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      updateCartCount();
    }
  }, [status]);

  return ( 
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* 1. الشريط العلوي (Top Bar) */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-100 py-2">
        <div className="container mx-auto px-5 flex justify-between items-center text-xs font-medium text-gray-500">
          <div className="flex gap-6">
            <div className="flex items-center gap-2"><Truck size={14} className="text-green-600" /> Free Shipping on Orders 500 EGP</div>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-6"><Gift size={14} className="text-green-600" /> New Arrivals Daily</div>
          </div>
          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Welcome, <span className="text-green-600 font-bold">{session.user?.name}</span></span>
                <button onClick={() => signOut({ callbackUrl: "/SignIn" })} className="hover:text-red-600 flex items-center gap-1 font-bold"><LogOut size={14} /> Sign Out</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/SignIn" className="hover:text-green-600 flex items-center gap-1"><LogIn size={14} /> Sign In</Link>
                <div className="w-[1px] h-3 bg-gray-300"></div>
                <Link href="/SignUp" className="hover:text-green-600 flex items-center gap-1"><UserPlus size={14} /> Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. النافبار الأساسي */}
      <nav className="container mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <FaShoppingCart className="text-3xl text-green-600" />
          <span className="text-3xl font-black tracking-tighter">
            <span className="text-black">Fresh</span>
            <span className="text-green-600">Cart</span>
          </span>
        </Link>

        <SearchBar />

        {/* القائمة المنسدلة */}
        <div className={`${isOpen ? "absolute top-full left-0 w-full bg-white p-6 border-b shadow-xl flex flex-col gap-6" : "hidden"} md:flex md:static md:w-auto md:bg-transparent md:p-0 md:shadow-none md:flex-row items-center gap-6 font-semibold text-gray-700`}>
          {["Home", "Products", "Categories", "Brands"].map((item) => (
            <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-green-600 transition-colors">{item}</Link>
          ))}

          <Link href="/Support" className="flex items-center gap-2 group">
            <div className="bg-green-100 p-1.5 rounded-full text-green-800"><i className="fa-solid fa-headset"></i></div>
            <div className="flex flex-col"><span className="text-[10px] text-gray-400">Support</span><span className="text-xs">24/7 Help</span></div>
          </Link>

          {/* إضافة تسجيل الدخول هنا لتظهر في الموبايل فقط */}
          <div className="md:hidden flex flex-col gap-3 w-full border-t pt-4">
            {status === "loading" ? null : session ? (
              <button onClick={() => signOut()} className="flex items-center gap-2 text-red-600 font-bold"><LogOut size={20} /> Sign Out</button>
            ) : (
              <Link href="/SignIn" className="flex items-center gap-2 text-green-700 font-bold"><LogIn size={20} /> Sign In</Link>
            )}
          </div>

          <div className="hidden md:block h-8 w-[1px] bg-gray-300"></div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <Link href="/Wishlist" className="relative cursor-pointer hover:scale-105 transition-transform group p-1">
            <Heart size={24} className="text-gray-700 group-hover:text-red-600 transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {WishlistCount}
            </span>
          </Link>

          <Link href="/Carts" className="relative cursor-pointer hover:scale-105 transition-transform group p-1">
            <ShoppingCart size={24} className="text-gray-700 group-hover:text-green-600 transition-colors" />
            {CartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-fade-in">
                {CartCount}
              </span>
            )}
          </Link>

          <div className="hidden md:block h-8 w-[1px] bg-gray-300"></div>

          <div className="hidden md:flex items-center">
            {status === "loading" ? (
              <div className="w-20 h-8 bg-gray-100 animate-pulse rounded"></div>
            ) : session ? (
              <div className="flex items-center gap-3 font-bold text-sm">
                <span className="text-green-600 truncate max-w-[80px]">{session.user?.name}</span>
                <button onClick={() => signOut()} className="text-gray-500 hover:text-red-600"><LogOut size={20} /></button>
              </div>
            ) : (
              <Link href="/SignIn" className="text-white bg-green-700 px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-green-800 transition-all">
                <LogIn size={18} /> Sign in
              </Link>
            )}
          </div>

          <button className="md:hidden p-2 ml-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
}