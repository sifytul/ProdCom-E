// ============ Admin Types ============

export interface TPaymentInfo {
  id: number;
  status: "paid" | "unpaid";
  medium: string;
  amount: number;
  createdAt: string;
}

export interface TContactInfo {
  phoneOne: string;
  phoneTwo: string | null;
}

export interface TShippingInfo {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  contact: TContactInfo;
}

export interface TOrderedItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
  subTotal: number;
  category: string;
}

export interface TOrder {
  id: number;
  itemsPrice: number;
  totalItems: number;
  totalPrice: number;
  shippingPrice: number;
  status: "pending" | "confirmed" | "canceled" | "delivered";
  probableDeliveryDate: string;
  deliveredAt: string | null;
  paymentInfo: TPaymentInfo | null;
  createdAt: string;
  shippingInfo: TShippingInfo;
  orderedItems: TOrderedItem[];
}

export interface TOrderResponse {
  totalOrders: number;
  orders: TOrder[];
}

export interface TProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  specifications: Record<string, string>;
  category: {
    category_name: string;
  };
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface TCategory {
  id: number;
  category_name: string;
  image: string | null;
  products?: TProductResponse[];
  productCount?: number;
}

export interface TUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "user" | "admin";
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: TOrder[];
  topProducts: TProductResponse[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
