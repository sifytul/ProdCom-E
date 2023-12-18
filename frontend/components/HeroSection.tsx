"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselBanner from "./shared/carousel/CarouselBanner";
import Image from "next/image";

const carouselSlider = [
  {
    imageURL: "/assets/images/home-cover.jfif",
    heading: "The Best Quality Products Guranteed!!",
    subheading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, rem.",
  },
  {
    imageURL: "/assets/images/home-cover.jfif",
    heading: "The Best Quality Products Guranteed!!",
    subheading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, rem.",
  },
  {
    imageURL: "/assets/images/home-cover.jfif",
    heading: "The Best Quality Products Guranteed!!",
    subheading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, rem.",
  },
];
const HeroSection = () => {
  return (
    // <div>
    //   <Carousel images={images} />
    // </div>
    <div className="md:container">
      <Carousel
        autoPlay={false}
        infiniteLoop={true}
        showStatus={false}
        emulateTouch={true}
        showThumbs={false}
      >
        {carouselSlider.map((item, index) => (
          <CarouselBanner
            key={index}
            heading={item.heading}
            subHeading={item.subheading}
            bgImage={item.imageURL}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
