import Image from "next/image";
import { Button } from "./ui/button";

type Props = {
  heading: string;
  subHeading: string;
  bgImage: string;
};

const CarouselBanner = ({ heading, subHeading, bgImage }: Props) => {
  return (
    <div className="relative text-left rounded-md overflow-hidden h-full">
      <Image
        src={bgImage}
        height={500}
        width={500}
        alt="carousel banner image"
        style={{ objectFit: "contain", height: "100%", width: "100%" }}
      />
      <div className="absolute top-0 w-2/3 m-2 p-2 md:m-8 md:p-8  space-y-2">
        <h1 className="font-bold text-xl sm:text-3xl">{heading}</h1>
        <p className="text-gray-primary text-xs md:text-base">{subHeading}</p>
        <Button>Shop Now</Button>
      </div>
    </div>
  );
};

export default CarouselBanner;
