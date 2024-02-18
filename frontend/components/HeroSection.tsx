"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselBanner from "./shared/carousel/CarouselBanner";

const carouselSlider = [
  {
    imageURL: "/assets/images/home-cover.png",
    heading: "The Best Quality Products Guranteed!!",
    subheading:
      "We choose the best for our client. Client happiness is the most priority",
  },
  {
    imageURL: "/assets/images/shop-page-cover.png",
    heading: "The Best Quality Products Guranteed!!",
    subheading:
      "We choose the best for our client. Client happiness is the most priority",
  },
  {
    imageURL: "/assets/images/home-cover.png",
    heading: "The Best Quality Products Guranteed!!",
    subheading:
      "We choose the best for our client. Client happiness is the most priority",
  },
];
const HeroSection = () => {
  return (
    // <div>
    //   <Carousel images={images} />
    // </div>
    <div className="md:container">
      <Carousel
        autoPlay={true}
        transitionTime={1000}
        interval={5000}
        stopOnHover={true}
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
