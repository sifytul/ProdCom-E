"use client";

import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/products", label: "Products", icon: Layers },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Admin</span>
            <span className="text-xl font-semibold">Panel</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/admin" className="hover:text-primary">
              Admin
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="capitalize">{pathname.split("/").pop()}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{user.name}</span>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              {user.name[0]}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
