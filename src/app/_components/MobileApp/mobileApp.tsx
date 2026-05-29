import Link from 'next/link';
import React from 'react';

export default function MobileApp() {
    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-24">
            <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">

                {/* 1. Newsletter Card */}
                <div className="lg:col-span-7 bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 border border-slate-100 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-slate-100 duration-500">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold text-slate-400">50,000+ Subscribers</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            Get the Freshest Updates
                            <span className="font-black text-green-600 block md:inline"> Delivered Free</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-500 font-semibold">
                            Weekly recipes, seasonal offers & exclusive member perks.
                        </p>

                        <div className='flex flex-wrap gap-2 md:gap-4'>
                            <div className="flex items-center gap-2 md:gap-3 bg-slate-50 border border-slate-100 px-3 md:px-5 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-sm cursor-default">
                                <span className="text-lg">🌱</span>
                                <h4 className="text-[11px] md:text-sm font-bold text-slate-700 tracking-tight">Fresh Picks</h4>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 bg-slate-50 border border-slate-100 px-3 md:px-5 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-sm cursor-default">
                                <span className="text-lg">🚚</span>
                                <h4 className="text-[11px] md:text-sm font-bold text-slate-700 tracking-tight">Free Delivery</h4>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 bg-slate-50 border border-slate-100 px-3 md:px-5 py-3 rounded-2xl transition-all hover:bg-white hover:shadow-sm cursor-default">
                                <span className="text-lg">💎</span>
                                <h4 className="text-[11px] md:text-sm font-bold text-slate-700 tracking-tight">Member Deals</h4>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-8">
                        <input
                            type="email"
                            placeholder="your@example.com"
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-5 pr-5 md:pr-32 outline-none focus:ring-4 focus:ring-green-500/5 focus:border-green-500 transition-all text-slate-900 shadow-sm"
                        />
                        <button className="w-full md:w-auto mt-3 md:mt-0 md:absolute right-2 top-2 bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-all">
                            Subscribe
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className='text-gray-400 text-xs md:text-sm font-semibold'>✨ Unsubscribe anytime. No spam, ever.</p>
                    </div>
                </div>

                {/* 2. Mobile App Card */}
                <div className="lg:col-span-5 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 text-white relative overflow-hidden group flex flex-col justify-between border border-slate-800">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover:bg-green-500/20 transition-all duration-700" />

                    <div className="relative z-10 space-y-4">
                        <div>
                            <span className="text-xs font-semibold text-green-400 border border-2 p-1 rounded-full ">📱 MOBILE APP</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Shop Faster on Our App
                        </h2>
                        <p className="text-slate-400 text-md leading-relaxed font-semibold">
                            Get app-exclusive deals & 15% off your first order.
                        </p>
                    </div>

                    <Link href={"/_components/Navbar"}>
                        <div className="relative z-10 mt-8 space-y-4">
                            <button className="w-full flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl hover:bg-white hover:text-black transition-all duration-500 group">
                                <i className="fa-brands fa-apple text-3xl"></i>
                                <div className="text-left">
                                    <p className="text-[9px] uppercase font-semibold tracking-tighter opacity-50">Download on</p>
                                    <p className="text-lg md:text-xl font-bold">App Store</p>
                                </div>
                            </button>
                            <button className="w-full flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl hover:bg-white hover:text-black transition-all duration-500 group">
                                <i className="fa-brands fa-google-play text-2xl"></i>
                                <div className="text-left">
                                    <p className="text-[9px] uppercase font-semibold tracking-tighter opacity-50">Get it on</p>
                                    <p className="text-lg md:text-xl font-bold">Google Play</p>
                                </div>
                            </button>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                        <div className="flex text-yellow-400 text-sm">★★★★★</div>
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wide uppercase">
                            4.9 • 100K+ downloads
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}