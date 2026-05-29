"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from 'swiper/modules';
import { ProductDetails } from "@/types/ProductDetails.types";
import Image from "next/image";
import 'swiper/css/pagination';

export default function SwiperDetail({ data }: { data: ProductDetails; }) {
  console.log("dataiilllllllll", data);

  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {data.images.map((myImg, index) => (
          <SwiperSlide key={index}>
            {/* التعديل هنا: استخدام aspect-square يجعل الصورة مربعة ومنظمة */}
            <div className="relative aspect-square w-full bg-white">
              <Image
                fill
                src={myImg}
                alt={data.title}
                className="object-contain p-3" // object-contain يمنع الصورة من التمدد البشع
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
