import { TypeCategory } from "@/types/CategoryHome.Type";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryMain({ data }: { data: TypeCategory[]; }) {
  return (
    <>
      <div className="bg-gradient-to-b from-green-700 via-green-600 to-green-500 w-full h-60 flex items-center   ">
        <div className=" w-11/12 max-w-6xl mx-5 space-y-5">

          {/* Breadcrumb */}
          <div className="flex items-center space-x-1.5">
            <Link className="text-gray-300 font-semibold hover:text-white" href={"/"}>Home</Link>
            <span className="text-white">/</span>
            <h4 className="text-white font-semibold">
               Categories
            </h4>
          </div>

          {/* Brand Info */}
          <div className="flex items-center gap-4">
            <div className="bg-green-300 w-15 h-15 flex justify-center items-center rounded-2xl">
              <i className="fa-solid fa-layer-group text-2xl text-white"></i>            </div>
            <div className="text-shadow-4xl">
              <h2 className="text-white font-bold text-4xl">All Categories</h2>
              <p className="text-gray-200 font-semibold">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-10 ">
        {data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white ">
              <div className="relative aspect-[6/7] w-full overflow-hidden">
                <Image
                  fill
                  src={category.image}
                  alt={category.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 ">
                <p className="text-lg text-center text-black font-medium capitalize truncate">
                  {category.slug.replace(/-/g, ' ')}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}