"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundImage() {
    return <>

        <div className="relative h-[80vh] min-h-[600px] w-full pt-20 md:pt-0 overflow-hidden flex items-center ">
            {/* الخلفية ... (كما هي بدون تغيير) */}
            <div className="absolute inset-0 -z-10">
                <Image src="/imgSlider/slider8.jpg" alt="Fresh groceries background" fill priority className="object-cover animate-slow-zoom" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
            </div>

            {/* الحاوية الرئيسية للمحتوى */}
            <div className="container mx-auto px-6 md:px-12">
                {/* أضفنا motion.div هنا للحركة */}
                <motion.div
                    initial={{ opacity: 0, y: -100 }} // يبدأ من اليسار وغير مرئي
                    whileInView={{ opacity: 1, y: 0 }} // يظهر ويستقر في مكانه عند الوصول له
                    viewport={{ once: false, amount: 0.3 }} // يعمل مرة واحدة عند التمرير
                    transition={{ duration: 0.8, ease: "easeOut" }} // سرعة ونعومة الحركة
                    className="max-w-2xl space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] capitalize drop-shadow-xl">
                            Fresh Product <span className="text-green-500">Delivered</span> <br />
                            <span className="relative">
                                To Your Door
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-500/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                            </span>
                        </h2>

                        <p className="text-lg md:text-2xl text-gray-300 font-light tracking-wide flex items-center gap-3">
                            <span className="w-12 h-[2px] bg-green-500 inline-block"></span>
                            Get <span className="text-white font-bold text-3xl italic">20%</span> off your first order
                        </p>
                    </div>

                    <Link href={"/products"}>
                        <div className="flex flex-wrap gap-5 items-center">
                            <button className="group px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_10px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_30px_rgba(34,197,94,0.4)] transform hover:-translate-y-1.5 flex items-center gap-2">
                                Shop Now
                                <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2"></i>
                            </button>
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-2xl font-semibold text-lg transition-all duration-300">
                                View Deals
                            </button>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </div>



    </>;
}
