import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  ClipboardList,
  Bell,
  Settings,
  HelpCircle,
  Info,
  X,
  Menu,
  LogOut
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./DashboardTaker.css";

// Custom Alert Component
const CustomAlert = ({ title, description, onClose }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 relative">
    <div className="flex gap-2">
      <Info className="w-4 h-4 text-green-500 mt-1" />
      <div>
        <h4 className="text-sm font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);

export const ResponsiveDashboardT = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [loggedInUserName, setLoggedInUserName] = useState("Guest"); // Default name

  useEffect(() => {
    // Fetch the logged-in user's name from localStorage or an API
    const fetchUserName = () => {
      const userInfo = JSON.parse(localStorage.getItem("user")); // Replace "user" with your key
      if (userInfo && userInfo.name) {
        setLoggedInUserName(userInfo.name);
      }
    };

    fetchUserName();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/", tooltip: "View your dashboard" },
    { name: "Exams", icon: FileText, path: "/exams", tooltip: "View upcoming exams" },
    { name: "Grades", icon: ClipboardList, path: "/grades", tooltip: "Check your grades" },
    { name: "Settings", icon: Settings, path: "/settings", tooltip: "Manage your settings" },
    { name: "Support", icon: HelpCircle, path: "/support", tooltip: "Get help" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data on logout
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [events] = useState([
    {
      title: "Quiz 1 Linear",
      start: "2024-03-06",
      color: "#FFB6C1",
      details: "Linear Algebra Quiz - Chapter 1-3",
      duration: "1 hour"
    },
    {
      title: "Theory Final Exam",
      start: "2024-03-14",
      color: "#FFEB8A",
      details: "Comprehensive Theory Exam",
      duration: "2 hours"
    },
    {
      title: "Network Quiz 2",
      start: "2024-03-13",
      color: "#B0E0E6",
      details: "Networking Fundamentals",
      duration: "45 minutes"
    },
    {
      title: "Machine Learning Final Exam",
      start: "2024-03-26",
      color: "#ADD8E6",
      details: "ML Algorithms and Applications",
      duration: "3 hours"
    },
    {
      title: "Logic Design Final Exam",
      start: "2024-03-25",
      color: "#B0E0E6",
      details: "Digital Logic Design Final",
      duration: "2 hours"
    },
    {
      title: "Linear Final Exam",
      start: "2024-03-17",
      color: "#FFEB8A",
      details: "Linear Algebra Final Exam",
      duration: "2.5 hours"
    },
  ]);

  const isActivePath = (path) => location.pathname === path;

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      date: info.event.start,
      details: info.event.extendedProps.details,
      duration: info.event.extendedProps.duration,
      color: info.event.backgroundColor
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white min-h-screen border-r shadow-sm transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:transform-none transition-transform duration-200 ease-in-out`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <img
                src="..\src\assets\Logo.png"
                alt="Smartex Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-semibold text-gray-800">SMARTEX</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden">
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
                  ? "text-green-500 bg-green-50 border-l-4 border-green-500"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white py-4 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold">Welcome Back {loggedInUserName} 👋</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-10">
                  <div className="text-sm text-gray-600 p-2">
                    You have upcoming exams this week
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="relative"
              >
                <img
                  src="..\src\assets\Profile.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Welcome Message */}
        {showWelcomeMessage && (
          <div className="mx-6 mt-6">
            <CustomAlert
              title="Welcome to Your Dashboard"
              description="Here you can view your upcoming exams and manage your schedule. Click on any exam for more details."
              onClose={() => setShowWelcomeMessage(false)}
            />
          </div>
        )}

        {/* Calendar */}
        <main className="p-6 flex-1">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "",
              }}
              titleFormat={{ month: "long", year: "numeric" }}
              dayHeaderFormat={{ weekday: "short" }}
              height="auto"
              eventDisplay="block"
              eventBackgroundColor="transparent"
              eventBorderColor="transparent"
              eventTextColor="#000"
              eventClassNames="px-2 py-1 rounded text-sm cursor-pointer hover:opacity-80 transition-opacity"
              dayCellClassNames="hover:bg-gray-50"
              firstDay={0}
              fixedWeekCount={false}
              eventClick={handleEventClick}
            />
          </div>
        </main>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">{selectedEvent.title}</h3>
              <div className="space-y-2 text-gray-600">
                <p>Date: {selectedEvent.date.toLocaleDateString()}</p>
                <p>Duration: {selectedEvent.duration}</p>
                <p>Details: {selectedEvent.details}</p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveDashboardT;
