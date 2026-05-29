"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductType } from "@/types/AllProduct.types";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext";
import { Loader } from "lucide-react";
import { handelAddtocart } from "@/API/Cart";
import AddToCartBtn from "../Cart/AddToCartBtn";

export default function SingleCard({ CurrentProduct }: { CurrentProduct: ProductType; }) {
  const { data: session } = useSession();

  // استخراج الدالة من الـ Context لتحديث عدد السلة
  const { setCartCount } = useContext(CartContext) as any;

  const [isLoading, setIsLoading] = useState(false);

  async function handelAddToCart() {
    const token = (session as any)?.token;


    if (!token) {
      toast.error("Please log in first to add products to the cart.", { position: "top-center" });
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify({
          productId: CurrentProduct._id,
        }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        // تحديث الـ Context بالعدد الجديد القادم من الـ API
        setCartCount(data.numOfCartItems);
        toast.success("Product added to cart successfully!", { position: "top-center" });
      } else {
        toast.error(data.message || "Failed to add product to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
    finally {
      setIsLoading(false);
    }
  }

  

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1">
      <Link href={`/products/${CurrentProduct.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <span className="absolute top-3 left-3 z-10 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
          <Image
            width={400}
            height={400}
            src={CurrentProduct.imageCover}
            alt={CurrentProduct.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5">
          <p className="text-sm font-medium text-green-600 uppercase tracking-widest mb-2">
            {CurrentProduct.category.name}
          </p>
          <h3 className="text-gray-800 text-xs font-medium line-clamp-2 min-h-[3rem] leading-tight group-hover:text-green-700 transition-colors">
            {CurrentProduct.title}
          </h3>
          <div className="flex justify-between items-end mt-4">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-400 line-through">
                {(CurrentProduct.price * 1.2).toFixed(0)} EGP
              </span>
              <span className="text-sm font-medium text-slate-900">
                {CurrentProduct.price} <span className="text-sm font-medium">EGP</span>
              </span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
              <i className="fa-solid fa-star text-amber-400 text-xs"></i>
              <span className="text-xs font-medium text-amber-700">
                {CurrentProduct.ratingsAverage}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <AddToCartBtn productId={CurrentProduct.id}/>
      </div>
    </div>
  );
}