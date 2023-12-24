"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductImageSlider({ images }) {
  return (
    <div className=" overflow-hidden object-cover">
      <Carousel
        showThumbs={false}
        autoPlay={false}
        infiniteLoop={true}
        showStatus={false}
        emulateTouch={true}
        showIndicators={false}
      >
        {images.map((image, index) => (
          <div key={index} className="h-96 lg:h-[480px] ">
            <Image
              src={image?.url}
              alt="product image"
              width={500}
              height={500}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
