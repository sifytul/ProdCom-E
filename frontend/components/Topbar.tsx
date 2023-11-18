import { RxCross1 } from "@/public/assets/icons/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <div className="h-10 font-inter text-sm bg-neutral-white-dark font-semibold flex items-center justify-center">
      <div className="flex justify-center items-center gap-4">
        <Image
          src={"/assets/icons/ticket-percent.svg"}
          height={24}
          width={24}
          alt="ticket-percentSVG"
        />
        <p>
          <span className="font-bold">30%</span> off storewide -- Limited time!
        </p>
        <div className="text-primary flex ">
          <Link
            href={"/"}
            className="group flex hover:underline gap-1 items-center"
          >
            <p>Shop Now </p>
            <FaArrowRight className="text-primary group-hover:translate-x-1 duration-150" />
          </Link>
        </div>
        <div>
          <RxCross1 className="hover:scale-110 cursor-pointer duration-100 justify-self-end" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
