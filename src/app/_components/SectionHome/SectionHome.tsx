import Link from 'next/link';
import React from 'react';

export default function SectionHome() {
    return <>


        <div className="container mx-auto px-6 py-5">
            <div className="flex flex-col md:flex-row gap-6 justify-center">

                {/* الدفاية الأولى: Deal of the Day */}
                <div className="relative overflow-hidden w-full md:w-1/2 h-[350px] bg-teal-600 rounded-3xl p-8 flex flex-col justify-center text-white group cursor-pointer">
                    {/* لمسة جمالية خلفية (اختياري: يمكنك وضع صورة هنا) */}
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform duration-500">
                        <i className="fa-solid fa-apple-whole text-[200px]"></i>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div>
                            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                            🔥 Deal of the Day
                        </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                            Fresh Organic Fruits
                        </h2>
                        <p className="text-teal-50 opacity-90 max-w-[250px] text-sm">
                            Get up to <span className="font-bold text-white text-lg">40% off</span> on selected organic fruits.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="border-2 border-dashed border-white/40 px-3 py-1 rounded-lg">
                                <span className="text-sm">Use code:</span>
                                <p className="font-mono font-bold text-sm">ORGANIC40</p>
                            </div>
                            <Link href={"/products"}>
                                <button className="
                                        relative overflow-hidden px-8 py-3 bg-white text-teal-700 font-bold text-md  tracking-wider rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-slate-50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 group/btn                                                ">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Shop Now
                                        <i className="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-1"></i>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* الدفاية الثانية: New Arrivals */}
                <div className="relative overflow-hidden w-full md:w-1/2 h-[350px] bg-amber-600 rounded-3xl p-8 flex flex-col justify-center text-white group cursor-pointer">
                    {/* أيقونة خلفية */}
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:scale-110 transition-transform duration-500">
                        <i className="fa-solid fa-carrot text-[200px]"></i>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div>
                            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                            ✨ New Arrivals
                        </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                            Exotic Vegetables
                        </h2>
                        <p className="text-amber-50 opacity-90 max-w-[250px] text-sm">
                            Discover our latest collection of <span className="font-bold text-white text-lg">premium</span> vegetables.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="border-2 border-dashed border-white/40 px-3 py-1 rounded-lg">
                                <span className="text-xs">Use code:</span>
                                <p className="font-mono font-bold text-sm">FRESH25</p>
                            </div>
                            <Link href={"/products"}>
                                <button className=" relative overflow-hidden px-8 py-3  bg-white text-teal-700 font-bold text-md  tracking-wider rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-slate-50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 group/btn">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Now
                                        <i className="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-1"></i>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>



    </>;
}
