import React from "react";
import Link from "next/link";

export default function FooterAllComponent() {
  return (
    <>
      <footer className="relative bg-gradient-to-b from-green-900 to-slate-950 pt-20 pb-6 text-white overflow-hidden">
  
  {/* شكل جمالي في الخلفية (اختياري) */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30"></div>

  <div className="container mx-auto px-6">
    
    {/* المربع الأبيض العلوي (المميزات) - بتصميم أرفع وأشيك */}
    <div className="relative -mt-12 mb-12 bg-white rounded-2xl shadow-2xl p-8 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Item 1 */}
        <div className="group flex items-center gap-5 p-4 rounded-2xl transition-all hover:bg-green-50">
          <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 transition-transform group-hover:scale-110">
            <i className="fa-solid fa-truck-fast text-2xl"></i>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold">Free Shipping</h4>
            <p className="text-slate-500 text-xs">On orders above ₹500</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="group flex items-center gap-5 p-4 rounded-2xl transition-all hover:bg-green-50">
          <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 transition-transform group-hover:scale-110">
            <i className="fa-solid fa-shield-halved text-xl"></i>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold">Secure Pay</h4>
            <p className="text-slate-500 text-xs">100% secure checkout</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="group flex items-center gap-5 p-4 rounded-2xl transition-all hover:bg-green-50">
          <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 transition-transform group-hover:scale-110">
            <i className="fa-solid fa-tag text-xl"></i>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold">Best Offers</h4>
            <p className="text-slate-500 text-xs">Daily deals & discounts</p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="group flex items-center gap-5 p-4 rounded-2xl transition-all hover:bg-green-50">
          <div className="w-14 h-14 shrink-0 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 transition-transform group-hover:scale-110">
            <i className="fa-solid fa-rotate-left text-xl"></i>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold">Easy Returns</h4>
            <p className="text-slate-500 text-xs">Hassle-free returns</p>
          </div>
        </div>

      </div>
    </div>

    {/* محتوى الفوتر الأساسي */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
      
      {/* القسم الأول: عن البراند */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping text-3xl text-green-400"></i>
            <h2 className="text-3xl font-black tracking-tighter">Fresh<span className="text-green-500">Cart</span></h2>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Your one-stop destination for premium groceries and daily essentials. We source the freshest products for your family.
        </p>
        <div className="flex gap-4">
          {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
            <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-green-500 hover:border-green-500 transition-all group">
              <i className={`fa-brands fa-${social} text-lg group-hover:scale-110`}></i>
            </a>
          ))}
        </div>
      </div>

      {/* القسم الثاني: روابط سريعة */}
      <div>
        <h3 className="text-lg font-bold mb-6 border-b border-green-500/30 pb-2 inline-block">Quick Links</h3>
        <ul className="space-y-4 text-gray-400">
          <li><a href="#" className="hover:text-green-400 transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-green-400 transition-colors">All Products</a></li>
          <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-green-400 transition-colors">Our Blog</a></li>
        </ul>
      </div>

      {/* القسم الثالث: تواصل معنا */}
      <div>
        <h3 className="text-lg font-bold mb-6 border-b border-green-500/30 pb-2 inline-block">Contact Us</h3>
        <ul className="space-y-4 text-gray-400">
          <li className="flex gap-3">
            <i className="fa-solid fa-location-dot text-green-500 mt-1"></i>
            <span>123 Grocery St, Koramangala, Bangalore, 560034</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-phone text-green-500 mt-1"></i>
            <span>+91 98765 43210</span>
          </li>
          <li className="flex gap-3">
            <i className="fa-solid fa-envelope text-green-500 mt-1"></i>
            <span>support@freshcart.com</span>
          </li>
        </ul>
      </div>

      {/* القسم الرابع: النشرة البريدية (Newsletter) */}
      <div>
        <h3 className="text-lg font-bold mb-6 border-b border-green-500/30 pb-2 inline-block">Newsletter</h3>
        <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and updates.</p>
        <div className="relative">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <button className="absolute right-1 top-1 bottom-1 bg-green-600 px-4 rounded-lg hover:bg-green-500 transition-colors">
            Join
          </button>
        </div>
      </div>

    </div>

    {/* السطر الأخير (Copyright) */}
    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-500 text-sm">
        © 2026 <span className="text-green-500 font-semibold">FreshCart</span>. All rights reserved.
      </p>
      <div className="flex gap-6 text-xs text-gray-500">
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
      </div>
    </div>

  </div>
</footer>
    </>
  );
}
