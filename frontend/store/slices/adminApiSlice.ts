import { apiSlice } from "./apiSlice";
import {
  TOrder,
  TOrderResponse,
  TProductResponse,
  TCategory,
} from "@/types/admin";

// ============ Types ============
export interface UpdateOrderDto {
  status?: "pending" | "confirmed" | "canceled" | "delivered";
  paymentStatus?: "paid" | "unpaid";
  paymentInfo?: {
    medium: string;
    transactionId: string;
    paidAt: string;
    amount: number;
  };
  probableDeliveryDate?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  discount: number;
  specifications?: Record<string, string>;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  images?: string[];
}

export interface CreateCategoryDto {
  category_name: string;
  image?: string;
}

export interface AdminQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  sortBy?: string;
  sortType?: "ASC" | "DESC";
  searchTerm?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ============ Admin API Slice ============
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ============ Orders ============
    getAllOrders: builder.query<PaginatedResponse<TOrder>, AdminQueryParams>({
      query: (params) => ({
        url: "/admin/orders",
        method: "GET",
        params,
      }),
      providesTags: ["AdminOrders"],
    }),

    getOrderById: builder.query<TOrder, number>({
      query: (id) => `/admin/orders/${id}`,
      providesTags: ["AdminOrders"],
    }),

    updateOrder: builder.mutation<
      { success: boolean; message: string },
      { id: number; data: UpdateOrderDto }
    >({
      query: ({ id, data }) => ({
        url: `/admin/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminOrders"],
    }),

    // ============ Products ============
    getAllProducts: builder.query<
      PaginatedResponse<TProductResponse>,
      AdminQueryParams
    >({
      query: (params) => ({
        url: "/admin/products",
        method: "GET",
        params: { ...params, admin: true },
      }),
      providesTags: ["AdminProducts"],
    }),

    createProduct: builder.mutation<TProductResponse, CreateProductDto>({
      query: (data) => ({
        url: "/admin/products/new",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminProducts"],
    }),

    updateProduct: builder.mutation<
      { success: boolean; message: string },
      { id: number; data: UpdateProductDto }
    >({
      query: ({ id, data }) => ({
        url: `/admin/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminProducts"],
    }),

    deleteProduct: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminProducts"],
    }),

    // ============ Categories ============
    getAllCategories: builder.query<TCategory[], void>({
      query: () => "/admin/categories",
      providesTags: ["AdminCategories"],
    }),

    createCategory: builder.mutation<TCategory, CreateCategoryDto>({
      query: (data) => ({
        url: "/admin/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminCategories"],
    }),

    updateCategory: builder.mutation<
      TCategory,
      { id: number; data: Partial<CreateCategoryDto> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminCategories"],
    }),

    deleteCategory: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminCategories"],
    }),

    // ============ Users ============
    getAllUsers: builder.query<PaginatedResponse<any>, AdminQueryParams>({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params,
      }),
      providesTags: ["AdminUsers"],
    }),

    updateUserRole: builder.mutation<
      { success: boolean; message: string },
      { id: number; role: string }
    >({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    deleteUser: builder.mutation<{ success: boolean; message: string }, number>(
      {
        query: (id) => ({
          url: `/admin/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["AdminUsers"],
      }
    ),

    // ============ Dashboard Stats ============
    getDashboardStats: builder.query<any, void>({
      query: () => "/order/admin/stats",
      providesTags: ["AdminStats"],
    }),
  }),
});

export const {
  // Orders
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  // Products
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  // Categories
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  // Users
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  // Stats
  useGetDashboardStatsQuery,
} = adminApi;
