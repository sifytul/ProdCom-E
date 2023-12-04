"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function ProductImageSlider({ images }) {
  return (
    <div className="h-full w-full overflow-hidden">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt="Picture of the product"
              width={500}
              height={500}
              layout="responsive"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
