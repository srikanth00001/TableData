"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaUser,
  FaTasks,
  FaFileAlt,
  FaTable,
  FaChevronDown,
  FaChevronRight,
  FaChartBar,
} from "react-icons/fa";

const SideNav = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FaChartBar /> },
    { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
    { name: "User Profile", path: "/user/profile", icon: <FaUser /> },
    { name: "Task", path: "/task", icon: <FaTasks /> },
    { name: "Forms", path: "/forms", icon: <FaFileAlt /> },
    {
      name: "Tables",
      icon: <FaTable />,
      children: [
        { name: "Basic Tables", path: "/tables/basic" },
        { name: "Data Tables", path: "/tables/data" },
      ],
    },
    {
      name: "Pages",
      icon: <FaFileAlt />,
      children: [
        { name: "Login", path: "/pages/login" },
        { name: "Register", path: "/pages/register" },
      ],
    },
  ];

  return (
    <div
      className={`bg-sidebar text-sidebar-foreground shadow-md h-screen transition-all duration-300 z-50 fixed top-0 ${isOpen || isHovered ? "w-64" : "w-16"
        } ${isOpen ? "block" : "hidden md:block"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header: Visible on desktop, hidden on mobile */}
      <div className="flex items-center p-4 hidden md:block">
        <span className="text-sidebar-primary text-xl mr-2">
          <FaChartBar />
        </span>
        {(isOpen || isHovered) && (
          <span className="text-sidebar-foreground text-lg font-bold">TailAdmin</span>
        )}
      </div>

      {/* Content Wrapper: Offset on mobile to account for TopBar */}
      <div className="md:pt-0 pt-16 h-full overflow-y-auto">
        {(isOpen || isHovered) && (
          <div className="px-4 py-2 text-sidebar-muted-foreground text-xs uppercase">
            MENU
          </div>
        )}

        <div className="flex flex-col">
          {navItems.map((item, idx) => (
            <div key={idx}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center p-4 text-sidebar-foreground hover:bg-sidebar-accent w-full text-left ${openDropdowns[item.name] ? "bg-sidebar-accent" : ""
                      }`}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    {(isOpen || isHovered) && (
                      <span className="flex-1 text-left text-sm">{item.name}</span>
                    )}
                    {(isOpen || isHovered) && (
                      <span className="text-sm">
                        {openDropdowns[item.name] ? <FaChevronDown /> : <FaChevronRight />}
                      </span>
                    )}
                  </button>
                  {openDropdowns[item.name] && (isOpen || isHovered) && (
                    <div className="pl-2">
                      {item.children.map((child, cidx) => (
                        <button
                          key={cidx}
                          onClick={() => {
                            router.push(child.path);
                            toggleSidebar();
                          }}
                          className="block p-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent w-full"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    router.push(item.path);
                    toggleSidebar();
                  }}
                  className="flex items-center p-4 text-sidebar-foreground hover:bg-sidebar-accent w-full text-left"
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {(isOpen || isHovered) && <span className="text-sm">{item.name}</span>}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;