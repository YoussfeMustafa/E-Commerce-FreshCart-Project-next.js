"use client";
import React from "react";
import img1 from "../../../../public/imgSlider/slider1.jpg";
import img2 from "../../../../public/imgSlider/slider2.jpg";
import img3 from "../../../../public/imgSlider/slider3.jpg";
import img4 from "../../../../public/imgSlider/slider4.jpg";
import img5 from "../../../../public/imgSlider/slider5.jpg";
import img6 from "../../../../public/imgSlider/slider6.webp"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";



export default function MainSlider() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-[90%] lg:w-[95%] mx-auto py-5 gap-4">
        <div className="w-full lg:w-3/4">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{delay:3000}}
          >
            <SwiperSlide>
              {" "}
              {
                <Image
                  src={img1}
                  alt=""
                  className="w-full h-[410px] object-cover rounded-2xl"
                />
              }
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              {
                <Image
                  src={img2}
                  alt=""
                  className="w-full h-[410px] object-cover rounded-2xl"
                />
              }
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              {
                <Image
                  src={img3}
                  alt=""
                  className="w-full h-[410px] object-cover rounded-2xl"
                />
              }
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              {
                <Image
                  src={img6}
                  alt=""
                  className="w-full h-[410px] object-cover rounded-2xl"
                />
              }
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-full lg:w-1/4 flex lg:flex-col gap-2 ">
          <Image
            src={img4}
            alt=""
            className="w-1/2 lg:w-full h-50 object-cover rounded-2xl"
          />
          <Image
            src={img5}
            alt=""
            className="w-1/2 lg:w-full h-50 object-cover rounded-2xl"
          />
        </div>
      </div>
    </>
  );
}
