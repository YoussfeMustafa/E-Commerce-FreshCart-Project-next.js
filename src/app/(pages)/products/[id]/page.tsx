import React from "react";
import { Button } from "@/components/ui/button";
import SwiperDetail from "@/app/_components/SwiperDetail/SwiperDetail";
import { ProductDetails } from "@/types/ProductDetails.types";
import AddToCartBtnId from "@/app/_components/Cart/AddToCartBtnId";

export default async function Productdetail({ params }: {
  params: ProductDetails;
}) {
  let { id } = await params;
  console.log(id);

  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,);
  let { data } = await response.json();

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* أضفنا pt-32 لكي لا يختفي المحتوى تحت النافبار الثابت */}
        <div className="container mx-auto px-6 pt-32 lg:pt-10 pb-20">
          <div className="flex flex-col lg:flex-row justify-center items-start gap-12 xl:gap-12">

            {/* القسم الأيسر: الصور (مساحة ملمومة ومنظمة) */}
            <div className="w-full md:w-2/3 lg:w-1/3 xl:w-[35%] mx-auto lg:mx-0">
              <div className="sticky top-40 ">
                <SwiperDetail data={data} />
              </div>
            </div>

            {/* القسم الأيمن: البيانات */}
            <div className="w-full lg:w-2/3 xl:w-[50%] flex flex-col space-y-6">
              {/* العنوان والبراند */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {data.title}
                </h1>
                <p className="text-green-600 font-bold mt-2 text-md ">
                  {data.category?.name || "Premium Product"}
                </p>
              </div>

              {/* الوصف */}
              <p className="text-slate-500 font-medium text-md leading-relaxed border-l-4 border-slate-100 pl-5">
                {data.description}
              </p>

              {/* السعر والتقييم */}
              <div className="flex justify-between items-center py-6 border-y border-slate-50">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-xs font-bold uppercase mb-1">Total Price</span>
                  <span className="text-2xl font-bold text-slate-900">
                    {data.price} <span className="text-xl font-medium text-green-600 ml-1">EGP</span>
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-slate-400 text-xs font-bold uppercase mb-1">Customer Rating</span>
                  <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl">
                    <i className="fa-solid fa-star text-amber-400"></i>
                    <span className="font-bold text-amber-800 text-lg">{data.ratingsAverage}</span>
                  </div>
                </div>
              </div>

              {/* المخزون */}
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${data.quantity > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="font-medium text-slate-700 text-sm">
                  {data.quantity > 0 ? `Available in Stock (${data.quantity})` : "Out of Stock"}
                </span>
              </div>

              {/* زر الإضافة للسلة */}
              <div className="pt-6">
                <AddToCartBtnId productId={data._id} />
              </div>

              {/* ميزات سريعة */}
              <div className="flex gap-8 pt-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                  <i className="fa-solid fa-truck-fast text-green-600"></i>
                  Free Delivery
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                  <i className="fa-solid fa-rotate-left text-green-600"></i>
                  7-Day Returns
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
