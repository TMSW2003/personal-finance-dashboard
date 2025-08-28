// src/components/Layout.jsx
import { useState } from "react";
import { Menu, X, Home, BarChart3, Wallet,LogOut, Settings } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { session, signOut } = UserAuth();


  console.log("Current session:", session);

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        }  fixed top-0 left-0 h-screen flex flex-col bg-neutral-900 shadow-md transition-all duration-300  `}
      >
        <div className="flex items-center justify-between h-16 p-4 border-b">
          <span
            className={`text-xl font-bold text-gray-200 ${
              !isOpen && "hidden"
            }`}
          >
            Finance Menu
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-200 transition"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="flex-1 p-2">
          <SidebarItem icon={<Home />} label="Dashboard" isOpen={isOpen} />
          <SidebarItem icon={<BarChart3 />} label="Analytics" isOpen={isOpen} />
          <SidebarItem icon={<Wallet />} label="Accounts" isOpen={isOpen} />
          <SidebarItem icon={<Settings />} label="Settings" isOpen={isOpen} />
          <SidebarItem icon={<LogOut />} label="Sign out" isOpen={isOpen} />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header
        className={`fixed top-0 right-0 h-16 bg-[#2563eb] px-3 shadow-md flex justify-between items-center transition-all duration-300
        ${isOpen ? "left-64" : "left-20"}`}
        >
            <h3 className="text-s font-bold text-gray-200">
            Personal Finance Dashboard
            </h3>
            <div className="flex space-x-3">
              <button>+ Add Account</button>
              <button>+ Add Transaction</button>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-gray-200">Hello, {session?.user?.email}</span>
                <img
                    src="https://via.placeholder.com/40"
                    alt="profile"
                    className="rounded-full w-10 h-10"
                />
            </div>
        </header>

        {/* Page content */}
        <main className=" p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen }) {
  return (
    <div className=" flex items-center space-x-3 p-3 rounded-md hover:bg-[#3c99dc] cursor-pointer transition">
      {icon}
      {isOpen && <span className="text-gray-200">{label}</span>}
    </div>
  );
}

