import Counter from "@/components/Counter";
import Image from "next/image";
import { CgCross } from "react-icons/cg";
import { FaCross } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
type Props = {};

const CartItemInSidebar = (props: Props) => {
  return (
    <div className="flex justify-between items-center py-4 border-b border-green-50">
      <div className="flex items-center gap-2">
        <div className="bg-white-100 w-24 h-24 flex-shrink-0">
          <Image
            src="/assets/images/sofa.png"
            width={100}
            height={100}
            alt="sofa"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div>
          <h3 className="font-semibold">Sofa</h3>
          <div className="my-1">
            <p className="text-sm text-gray">Color: Black</p>
            <p className="text-sm">
              <span className="text-gray">Price: </span>$ 100
            </p>
          </div>
          <Counter
            value={4}
            increaseHandler={() => {}}
            decreaseHandler={() => {}}
          />
        </div>
      </div>
      <div className="space-y-1 p-1">
        <div>
          <p className="font-semibold">$400</p>
        </div>

        <RxCross1 />
      </div>
    </div>
  );
};

export default CartItemInSidebar;
