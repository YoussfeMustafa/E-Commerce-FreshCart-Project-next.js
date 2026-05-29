"use client"; // ضروري لاستخدام usePathname

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'; // استيراد الهوك الخاص بالمسار

export default function SectionProduct() {
  const pathname = usePathname(); // الحصول على المسار الحالي

  // التحقق: هل نحن في صفحة المنتجات؟
  // إذا لم نكن في "/products"، لا نظهر أي شيء (return null)
  if (pathname !== '/products') {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-green-700 via-green-600 to-green-500 w-full h-60 flex items-center">
        <div className="w-11/12 max-w-6xl mx-5 space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-1.5">
            <Link className="text-gray-300 font-semibold hover:text-white" href={"/"}>Home</Link>
            <span className="text-white">/</span>
            <h4 className="text-white font-semibold"> Products</h4>
          </div>

          {/* Brand Info */}
          <div className="flex items-center gap-4">
            <div className="bg-green-300 w-15 h-15 flex justify-center items-center rounded-2xl">
              <i className="fa-solid fa-chart-bar text-2xl text-white"></i>           
            </div>
            <div className="text-shadow-4xl">
              <h2 className="text-white font-bold text-4xl">All Products</h2>
              <p className="text-gray-200 font-semibold">Browse our wide range of All Product</p>
            </div>
          </div>
        </div>
    </div>
  )
}