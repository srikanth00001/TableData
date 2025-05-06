"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaBell,
  FaChevronDown,
  FaChartBar,
  FaEllipsisH,
} from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

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
      <div className="block md:hidden">
        <div className="flex bg-card text-card-foreground shadow-md p-4 items-center justify-between relative">
          {/* Left: Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className="text-xl transition-transform duration-300 ease-in-out" />
            ) : (
              <FaBars className="text-xl transition-transform duration-300 ease-in-out" />
            )}
          </button>

          {/* Center: Logo */}
          <div className="flex items-center">
            <span className="text-primary text-xl mr-2">
              <FaChartBar />
            </span>
            <span className="text-foreground text-lg font-bold">TailAdmin</span>
          </div>

          {/* Right: More Button */}
          <button
            onClick={toggleDropdown}
            className="bg-muted text-foreground hover:bg-muted/80 p-2 rounded"
            aria-label="More options"
            aria-expanded={isDropdownOpen}
            aria-controls="mobile-dropdown"
          >
            <FaEllipsisH className="text-xl" />
          </button>

          {/* Dropdown Menu (Mobile Only) */}
          {isDropdownOpen && (
            <div
              id="mobile-dropdown"
              className="absolute top-full right-0 mt-2 bg-card text-card-foreground shadow-lg rounded-lg p-4 flex justify-between items-center z-50 w-full"
            >
              {/* Left: Icons Group */}
              <div className="flex items-center space-x-4">
                <div className="border border-border rounded-full">
                  <ModeToggle />
                </div>
                <button
                  className="text-muted-foreground hover:text-foreground relative p-3 border border-border rounded-full"
                  aria-label="View notifications"
                >
                  <FaBell className="text-xl" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Right: User Section */}
              <div className="flex items-center">
                <img
                  src="https://picsum.photos/200"
                  alt="User Profile"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="text-sm text-foreground cursor-pointer">Srikanth</span>
                <FaChevronDown className="ml-1 text-sm text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-card text-card-foreground shadow-md p-4 md:flex items-center justify-between">
        {/* Left Section: Toggle Button and Search */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-muted-foreground hover:text-foreground"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className="text-xl transition-transform duration-300 ease-in-out" />
            ) : (
              <FaBars className="text-xl transition-transform duration-300 ease-in-out" />
            )}
          </button>
          <div className="relative flex items-center">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search or type command..."
                className="w-full pl-4 pr-16 py-2 border border-input rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs bg-muted px-2 py-0.5 rounded-md">
                ⌘ K
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Icons and User Profile */}
        <div className="flex items-center space-x-4">
          <div className="border border-border rounded-full">
            <ModeToggle />
          </div>
          <button
            className="text-muted-foreground hover:text-foreground relative p-3 border border-border rounded-full"
            aria-label="View notifications"
          >
            <FaBell className="text-xl" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <img
              src="https://picsum.photos/200"
              alt="User Profile"
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="text-sm text-foreground cursor-pointer">Srikanth</span>
            <FaChevronDown className="ml-1 text-sm text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;