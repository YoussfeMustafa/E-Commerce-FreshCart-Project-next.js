import { getAllBrands } from "@/API/AllBrands.Api";
import { getUserToken } from "@/lib/Auth";
import { authOptions } from "@/lib/AuthOption";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Brands() {


  const session = await getServerSession(authOptions);
  // console.log(session, 'bbbbbbbbbrrrraaaannndddd');

  const data = await getAllBrands();

  const response =await getUserToken()
  console.log(response , 'tokennnnnnnnnnnnnnn');
  
  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-b from-violet-800 via-violet-600 to-violet-500 w-full h-60 flex items-center">
        <div className="w-11/12 max-w-6xl mx-auto space-y-5">
          <div className="flex items-center space-x-1.5">
            <Link className="text-gray-300 font-semibold hover:text-white transition" href={"/"}>Home</Link>
            <span className="text-white">/</span>
            <h4 className="text-white font-semibold">Brands</h4>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md w-16 h-16 flex justify-center items-center rounded-2xl">
              <i className="fa-solid fa-tag text-white text-2xl"></i>
            </div>
            <div>
              <h2 className="text-white font-bold text-4xl">Top Brands</h2>
              <p className="text-gray-200 font-semibold">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="bg-white min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-12">
            {data.map((brand: any) => (
              <Link
                href={`/brands/${brand._id}`}
                key={brand._id}
                className="group cursor-pointer block"
              >
                <div className="aspect-square bg-white rounded-3xl border border-slate-100 flex items-center justify-center p-8 transition-all duration-300 group-hover:border-slate-200 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain transition-transform duration-500 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-violet-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </div>

                <div className="mt-5 text-center">
                  <p className="text-[13px] font-bold tracking-widest text-slate-500 uppercase group-hover:text-violet-600 transition-colors duration-300">
                    {brand.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}