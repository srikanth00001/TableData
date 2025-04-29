"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaCalculator,
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaPage4,
  FaPaperclip,
  FaTable,
  FaTasks,
  FaUser,
} from "react-icons/fa";

const SideNav = () => {
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
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    {
      name: "User Management",
      icon: <FaUser />,
      children: [
        { name: "Profile", path: "/user/profile" },
        { name: "Settings", path: "/user/settings" },
      ],
    },
    { name: "Task", path: "/task", icon: <FaTasks /> },
    { name: "Forms", path: "/forms", icon: <FaPaperclip /> },
    { name: "Tables", path: "/tables", icon: <FaTable /> },
    {
      name: "Pages",
      icon: <FaPage4 />,
      children: [
        { name: "Login", path: "/pages/login" },
        { name: "Register", path: "/pages/register" },
      ],
    },
    { name: "Calendar", path: "/calendar", icon: <FaCalculator /> },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 pt-10 
        ${isHovered ? "w-64" : "w-16"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="space-y-1 px-2">
        {navItems.map((item, idx) => (
          <div key={idx} className="pb-6">
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center w-full px-2 py-2 rounded hover:bg-gray-700"
                >
                  <span className="text-xl mr-2">{item.icon}</span>
                  {isHovered && (
                    <span className="flex-1 text-left">{item.name}</span>
                  )}
                  {isHovered && (
                    <span>
                      {openDropdowns[item.name] ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  )}
                </button>
                {openDropdowns[item.name] && isHovered && (
                  <div className="pl-8 space-y-1">
                    {item.children.map((child, cidx) => (
                      <button
                        key={cidx}
                        onClick={() => router.push(child.path)}
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-700 rounded"
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push(item.path)}
                className="flex items-center w-full px-2 py-2 rounded hover:bg-gray-700"
              >
                <span className="text-xl mr-2">{item.icon}</span>
                {isHovered && <span>{item.name}</span>}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
