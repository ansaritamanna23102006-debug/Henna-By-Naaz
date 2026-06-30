import React from "react";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import ToastContainer from "@/components/admin/Toast";
import { cookies } from "next/headers";

export default async function AdminDashboardLayout({ children }) {
  let admin = null;
  try {
    const cookieStore = await cookies();

    // Create mock request to satisfy the verifyAuth helper
    const mockRequest = {
      cookies: {
        get: (name) => cookieStore.get(name),
      },
    };

    admin = await verifyAuth(mockRequest);
  } catch (error) {
    // If not authenticated, force redirect to login
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-bg-warm text-primary">
      {/* Sidebar navigation */}
      <Sidebar admin={JSON.parse(JSON.stringify(admin))} />

      {/* Main content grid */}
      <div className="flex-1 flex flex-col xl:pl-64 min-h-screen pt-[60px] xl:pt-0">
        <main className="flex-1 p-6 md:p-8 xl:p-10 max-w-7xl w-full mx-auto relative">
          {children}
        </main>
      </div>

      {/* Toasts */}
      <ToastContainer />
    </div>
  );
}
