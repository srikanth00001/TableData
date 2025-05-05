// src/components/TopBar.tsx
"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaMoon,
  FaBell,
  FaChevronDown,
  FaChartBar,
  FaEllipsisH,
} from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";


const styles = {
  navbar: "hidden md:block bg-white shadow-md p-4 md:flex items-center justify-between",
  toggleButton: "mr-4 text-gray-600 hover:text-gray-800",
  toggleButtonInner: "text-xl transition-transform duration-300 ease-in-out", // For smooth icon transition
  searchContainer: "relative flex items-center",
  searchInput:
    "border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500",
  searchIcon: "absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 h-4 w-4",
  shortcut: "ml-2 text-gray-400 text-sm border border-gray-300 rounded px-2 py-1",
  rightSection: "flex items-center space-x-4",
  iconButton: "text-gray-600 hover:text-gray-800 relative p-3 border rounded-full",
  userSection: "flex items-center",
  userAvatar: "h-8 w-8 rounded-full mr-2",
  userName: "text-sm text-gray-700 cursor-pointer",
  dropdownIcon: "ml-1 text-sm text-gray-600",
  topSmall: "md:hidden block",
  toggle: "flex bg-white shadow-md p-4 items-center justify-between relative",
  toggleButton1: "text-gray-600 hover:text-gray-800",
  toggleButtonInner1: "text-xl transition-transform duration-300 ease-in-out", // For smooth icon transition
  logoContent: "flex items-center",
  logoIcon: "text-[#4299E1] text-xl mr-2",
  logoText: "text-[#1A202C] text-lg font-bold",
  moreButton: "bg-gray-100 text-black hover:bg-gray-100 hover:text-black p-2 rounded",
  moreIcon: "text-xl",
  dropdownMenu:
    "absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-4 flex justify-between items-center z-50 w-full",
  smallUser: "",
  iconGroup: "flex items-center space-x-4",
};

const TopBar = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Mobile View */}
      <div className={styles.topSmall}>
        <div className={styles.toggle}>
          {/* Left: Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className={styles.toggleButton1}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className={styles.toggleButtonInner1} />
            ) : (
              <FaBars className={styles.toggleButtonInner1} />
            )}
          </button>

          {/* Center: Logo */}
          <div className={styles.logoContent}>
            <span className={styles.logoIcon}>
              <FaChartBar />
            </span>
            <span className={styles.logoText}>TailAdmin</span>
          </div>

          {/* Right: More Button */}
          <button
            onClick={toggleDropdown}
            className={styles.moreButton}
            aria-label="More options"
            aria-expanded={isDropdownOpen}
            aria-controls="mobile-dropdown"
          >
            <FaEllipsisH className={styles.moreIcon} />
          </button>

          {/* Dropdown Menu (Mobile Only) */}
          {isDropdownOpen && (
            <div id="mobile-dropdown" className={styles.dropdownMenu}>
              {/* Left: Icons Group */}
              <div className={styles.iconGroup}>
                <div className="border rounded-full">
                  <ModeToggle />
                </div>
                <button
                  className={styles.iconButton}
                  aria-label="View notifications"
                >
                  <FaBell className="text-xl" />
                  <span className={styles.notificationDot}></span>
                </button>
              </div>

              {/* Right: User Section */}
              <div className={styles.smallUser}>
                <div className={styles.userSection}>
                  <img
                    src="https://picsum.photos/200" // Replaced with a valid placeholder image URL
                    alt="User Profile"
                    className={styles.userAvatar}
                  />
                  <span className={styles.userName}>Srikanth</span>
                  <FaChevronDown className={styles.dropdownIcon} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className={styles.navbar}>
        {/* Left Section: Toggle Button and Search */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className={styles.toggleButton}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className={styles.toggleButtonInner} />
            ) : (
              <FaBars className={styles.toggleButtonInner} />
            )}
          </button>
          <div className={styles.searchContainer}>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search or type command..."
                className="w-full pl-4 pr-16 py-2 border rounded-md text-sm focus:outline-none"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                ⌘ K
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Icons and User Profile */}
        <div className={styles.rightSection}>
          <div className="border rounded-full">
            <ModeToggle />
          </div>
          <button
            className={styles.iconButton}
            aria-label="View notifications"
          >
            <FaBell className="text-xl" />
            <span className={styles.notificationDot}></span>
          </button>
          <div className={styles.userSection}>
            <img
              src="https://picsum.photos/200"
              alt="User Profile"
              className={styles.userAvatar}
            />
            <span className={styles.userName}>Srikanth</span>
            <FaChevronDown className={styles.dropdownIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;