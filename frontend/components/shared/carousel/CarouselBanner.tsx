import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  heading: string;
  subHeading: string;
  bgImage: string;
};

const CarouselBanner = ({ heading, subHeading, bgImage }: Props) => {
  return (
    <div className="relative text-left rounded-md overflow-hidden max-h-[450px]">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={bgImage}
          height={300}
          width={450}
          alt="carousel banner image"
          style={{ objectFit: "cover", height: "auto", width: "100%" }}
        />
      </AspectRatio>
      <div className="absolute bottom-1/2 translate-y-1/2 md:bottom-0 md:translate-y-0 w-2/3 m-2 p-2 md:m-8 md:p-8 space-y-2">
        <h1 className="font-bold text-xl sm:text-3xl">{heading}</h1>
        <p className="text-gray-primary text-xs md:text-base">{subHeading}</p>
        <Button>Shop Now</Button>
      </div>
    </div>
  );
};

export default CarouselBanner;
