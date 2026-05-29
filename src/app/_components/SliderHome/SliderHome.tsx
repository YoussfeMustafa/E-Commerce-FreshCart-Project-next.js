"use client";

import React from "react";
import "swiper/css";
import { TypeCategory } from "@/types/CategoryHome.Type";
import Link from "next/link";

export default function SliderHome({ data }: { data: TypeCategory; }) {
  console.log("Category", data);

  return (
    <>
      <div className="container mx-auto px-6 py-10 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-6">

          {/* العنوان */}
          <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">
              Shop By <span className="text-green-600">Category</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-lg font-medium">
              Explore our wide range of fresh products by category
            </p>
          </div>

          {/* الرابط */}
          <Link href="/categories" className="group flex items-center gap-2 self-start md:self-auto">
            <span className="text-base md:text-lg font-bold text-slate-700 group-hover:text-green-600 transition-colors">
              View All
            </span>
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </div>
          </Link>

        </div>
      </div>
      <div className="w-[95%] mx-auto py-10">
        {/* توزيع الدفات (Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data.map((category) => (
            <div
              key={category._id}
              className="group bg-white border border-slate-100 rounded-3xl p-4  flex flex-col items-center"
            >

              {/* المربع الداخلي الصغير اللي جواه الدائرة */}
              <div className="relative w-full aspect-square bg-slate-50 rounded-2xl flex justify-center items-center overflow-hidden">

                {/* الدائرة التي تحتوي على الصورة */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />
                </div>

              </div>

              {/* اسم القسم أسفل المربع */}
              <div className="mt-4 text-center">
                <h2 className="text-sm md:text-base font-medium text-slate-800 ">
                  {category.name}
                </h2>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
