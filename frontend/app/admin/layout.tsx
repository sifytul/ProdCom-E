import AdminHeader from "@/components/adminComponents/AdminHeader";
import AdminSidebar from "@/components/adminComponents/AdminSideBar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-[#f9fafb] font-poppins max-w-screen-2xl">
      <AdminSidebar />
      <div className="flex-grow">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
