import { SidebarProvider } from "@/context/sidebar-context";
import Sidebar from "@/components/layout/Sidebar";
//import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="min-h-screen bg-gray-100 transition-all duration-300 md:pl-64">
        {/* Header solo visible en móvil */}
        
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}