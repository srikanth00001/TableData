"use client";

import React, { useState } from "react";
import SideNav from "@/components/SideNav";
import TopBar from "@/components/TopBar";
import TableView from "@/components/TableView";

type ClientLayoutProps = {
  dummyData: Array<{
    Name: string;
    Role: string;
    Email: string;
  }>;
  children: React.ReactNode;
};

const ClientLayout = ({ dummyData, children }: ClientLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* TopBar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Content */}
        <div
          className={`pt-16 transition-all duration-300 h-full overflow-auto ${
            isSidebarOpen ? "md:ml-64" : "md:ml-16"
          }`}
        >
          <div className=" max-w-full">
            <TableView data={dummyData} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
