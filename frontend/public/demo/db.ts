import { LiaMoneyBillSolid, LiaShippingFastSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
export const products = [
  {
    id: 1,
    title: "Sony - WH-CH720N Wireless Noise Cancelling",
    price: 24.99,
    discount: "20%",
    rating: 5,
    image: "/assets/images/sofa.png",
    trendingTitle: "hot",
  },
  {
    id: 2,
    title: "Sony - WH-CH720N Wireless Noise Cancelling",
    price: 24.99,
    discount: 49.99,
    rating: 5,
    image: "/assets/images/lamp.png",
    trendingTitle: "new",
  },
  {
    id: 3,
    title: "Sony - WH-CH720N Wireless Noise Cancelling",
    price: 24.99,
    discount: 49.99,
    rating: 5,
    image: "/assets/images/sofa-white.png",
    trendingTitle: "hot",
  },
  {
    id: 4,
    title: "Sony - WH-CH720N Wireless Noise Cancelling",
    price: 24.99,
    discount: 49.99,
    rating: 5,
    image: "/assets/images/wardrob.png",
    trendingTitle: "sale",
  },
  {
    id: 5,
    title: "Sony - WH-CH720N Wireless Noise Cancelling",
    price: 24.99,
    discount: 49.99,
    rating: 5,
    image: "/assets/images/sofa.png",
    trendingTitle: "sale",
  },
];

export const ValuesInfo = [
  {
    title: "Free Shipping",
    desc: "Orders over $100",
    Icon: LiaShippingFastSolid,
  },
  {
    title: "Money Back Guarantee",
    desc: "30 days guarantee",
    Icon: LiaMoneyBillSolid,
  },
  {
    title: "24/7 Service",
    desc: "Phone and Email support",
    Icon: MdSupportAgent,
  },
  {
    title: "Secure Payments",
    desc: "Secure checkout with SSL",
    Icon: RiSecurePaymentFill,
  },
];
