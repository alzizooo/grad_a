import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import {
  Menu,
  Search,
  Users,
  FileText,
  Settings,
  Bell,
  ChevronUp,
  LogOut,
  LayoutGrid,
  CircleCheckBig,
  CircleAlert,
  Wrench,
  X,
  UserPlus,
  UserCog,
  UserMinus
} from "lucide-react";
import "./DashboardAdmin.css"
import UserManagement from "./UserManagement";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import CreateUser from "./CreateUser";
export const ResponsiveDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/admin" },
    { name: "User Management", icon: Users, path: "/admin/user-management" },
    { name: "Exam Management", icon: FileText, path: "/admin/exam-management" },
    { name: "Access Control", icon: CircleCheckBig, path: "/admin/access-control" },
    { name: "Issue Resolution", icon: CircleAlert, path: "/admin/issue-resolution" },
    { name: "Maintenance", icon: Wrench, path: "/admin/maintenance" },
    { name: "Result and Reporting", icon: FileText, path: "/admin/results" },
    { name: "Settings", icon: Settings, path: "/admin/settings" }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static w-64 bg-white border-r min-h-screen z-30
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-2 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 pt-2">
                <img
                  src="..\src\assets\Logo.png"
                  alt="Smartex Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="text-xl font-semibold">SMARTEX</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-1 flex-grow">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  toggleSidebar();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${isActivePath(item.path)
                  ? 'text-green-500 bg-green-50 border-l-4 border-green-500'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
          </nav>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white py-3 px-4 sm:px-6 flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[524px] relative">
              <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
              <div className="relative flex items-center px-4 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400"
                />
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <img
              src="..\src\assets\Profile.png"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Main Content Area */}
        <Routes>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/" element={
            <main className="p-4 sm:p-6 flex-1">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Stats Cards Container */}
                <div className="space-y-4">
                  {/* Active Users Card */}
                  <div className="bg-white p-4 rounded-xl border">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">Total Active Users</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-semibold">560</span>
                      <div className="flex items-center gap-1 text-green-600 text-sm bg-green-50 px-2 py-1 rounded">
                        <ChevronUp className="w-4 h-4" />
                        <span>12%</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center gap-2 text-gray-400 text-xs">
                      Update: December 16, 2024
                    </div>
                  </div>

                  {/* Active Exams Card */}
                  <div className="bg-white p-4 rounded-xl border">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600">Total Active Exams</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-semibold">15</span>
                      <div className="flex items-center gap-1 text-red-600 text-sm bg-red-50 px-2 py-1 rounded">
                        <ChevronUp className="w-4 h-4 rotate-180" />
                        <span>8%</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center gap-2 text-gray-400 text-xs">
                      Update: December 16, 2024
                    </div>
                  </div>
                </div>

                {/* Calendar Card */}
                <div className="  rounded-xl ">
                  <div className="flex justify-between items-center mb-4">

                  </div>
                  <div className="overflow-x-auto">
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      className="border-none w-full"
                    />
                  </div>
                </div>
              </div>
            </main>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default ResponsiveDashboard;