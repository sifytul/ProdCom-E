import { PaymentStatus } from '@/Entity/payment.entity';

export type TPaymentInfo = {
  id: number;
  status: PaymentStatus;
  medium: string;
  amount: number;
  createdAt: Date;
};

export type TOrder = {
  id: number;
  itemsPrice: number;
  totalItems: number;
  totalPrice: number;
  shippingPrice: number;
  status: string;
  probableDeliveryDate: Date;
  deliveredAt: Date;
  paymentInfo: TPaymentInfo | null;
  shippingInfo: {
    address: string;
    city: string;
    country: string;
    postalCode: number;
    contact: {
      phoneOne: string;
      phoneTwo: string | null;
    };
  };
  orderedItems: TOrderItemResponse[];
  createdAt: Date;
};

export type TOrderItemResponse = {
  productId: number;
  name: string;
  image: ProductImage;
  price: number;
  discount: number;
  quantity: number;
  subTotal: number;
};

export type TOrderResponse = {
  totalOrders: number;
  orders: TOrder[];
};
