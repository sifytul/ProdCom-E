"use client";

import Carousel from "./ui/Carousel";

const carouselSlider = [
  {
    imageURL: "/assets/images/slider-2.jfif",
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
const images = [
  "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const HeroSection = () => {
  return (
    <div>
      <Carousel images={images} />
    </div>
    // <div className="w-full xl:w-3/5 rounded-md overflow-hidden h-[520px]">
    //   <Carousel
    //     autoPlay={false}
    //     infiniteLoop={true}
    //     showStatus={false}
    //     emulateTouch={true}
    //     showThumbs={false}
    //     className="h-full"
    //   >
    //     {carouselSlider.map((item, index) => (
    //       <CarouselBanner
    //         key={index}
    //         heading={item.heading}
    //         subHeading={item.subheading}
    //         bgImage={item.imageURL}
    //       />
    //     ))}
    //   </Carousel>
    // </div>
  );
};

export default HeroSection;
