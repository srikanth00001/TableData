// src/components/SideNav.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChartBar,
  FaCalendarAlt,
  FaUser,
  FaTasks,
  FaFileAlt,
  FaTable,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const styles = {
  sidebar: "bg-white  shadow-md h-screen transition-all duration-300 z-50 fixed md:relative top-20 md:top-0",
  logoSection: "flex items-center p-4 hidden md:block",
  logoIcon: "text-[#4299E1] text-xl mr-2",
  logoText: "text-[#1A202C] text-lg font-bold",
  menuLabel: "px-4 py-2 text-gray-400 text-xs",
  menuText: "uppercase",
  menuItems: "flex flex-col",
  navButton:
    "flex items-center p-4 text-gray-600 hover:bg-gray-100 w-full text-left",
  activeButton: "bg-gray-100",
  dropdownContent: "pl-2",
  childButton: "block p-2 text-sm text-gray-600 hover:bg-gray-100 w-full",
};

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
      className={`${styles.sidebar} ${
        isOpen || isHovered ? "w-64" : "w-16"
      } ${isOpen ? "block" : "hidden md:block"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.logoSection}>
        <span className={styles.logoIcon}>
          <FaChartBar />
        </span>
        {(isOpen || isHovered) && <span className={styles.logoText}>TailAdmin</span>}
      </div>

      {(isOpen || isHovered) && (
        <div className={styles.menuLabel}>
          <span className={styles.menuText}>MENU</span>
        </div>
      )}

      <div className={styles.menuItems}>
        {navItems.map((item, idx) => (
          <div key={idx}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`${styles.navButton} ${
                    openDropdowns[item.name] ? styles.activeButton : ""
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
                  <div className={styles.dropdownContent}>
                    {item.children.map((child, cidx) => (
                      <button
                        key={cidx}
                        onClick={() => {
                          router.push(child.path);
                          toggleSidebar();
                        }}
                        className={styles.childButton}
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
                className={styles.navButton}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {(isOpen || isHovered) && <span className="text-sm">{item.name}</span>}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;