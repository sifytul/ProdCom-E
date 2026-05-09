"use client";

import {
  useGetDashboardStatsQuery,
  useGetAllOrdersQuery,
} from "@/store/slices/adminApiSlice";
import {
  Package,
  DollarSign,
  Layers,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "@/utils/dateFormatter";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}% vs last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({
    limit: 5,
  });

  console.log("Orders Data:", ordersData);

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders ?? 0}
          change={12}
          icon={<Package className="w-6 h-6" />}
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue ?? 0).toLocaleString()}`}
          change={8.5}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={<Layers className="w-6 h-6" />}
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordersData?.data.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.shippingInfo.address.substring(0, 20)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${Number(order.totalPrice).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "canceled"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(order.createdAt)}
                  </td>
                </tr>
              ))}
              {!ordersData?.data.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Add New Product</h3>
            <p className="text-sm text-gray-500">
              Create a new product listing
            </p>
          </div>
        </Link>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Add Category</h3>
            <p className="text-sm text-gray-500">Create a new category</p>
          </div>
        </Link>
        <Link
          href="/admin/orders?status=pending"
          className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-colors"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Pending Orders</h3>
            <p className="text-sm text-gray-500">Review pending orders</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
