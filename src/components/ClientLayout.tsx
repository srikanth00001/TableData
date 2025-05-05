// src/components/ClientLayout.tsx
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
    <div className="flex">
      <SideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="w-full">
        <TopBar toggleSidebar={toggleSidebar} />
        <TableView data={dummyData} />
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;