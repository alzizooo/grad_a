import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, UserCog, UserMinus } from "lucide-react";

const UserManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-8">User Management</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create User Card */}
        <div
          className="bg-green-50 p-6 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/admin/create-user")}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Create User</h2>
              <p className="text-sm text-gray-600 mt-2">Add New User</p>
            </div>
            <div className="text-green-500">
              <UserPlus size={24} />
            </div>
          </div>
        </div>

        {/* Edit User Card */}
        <div
          className="bg-blue-50 p-6 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/admin/edit-user")}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
              <p className="text-sm text-gray-600 mt-2">Reset or Update User Information</p>
            </div>
            <div className="text-blue-500">
              <UserCog size={24} />
            </div>
          </div>
        </div>

        {/* Delete User Card */}
        <div
          className="bg-red-50 p-6 rounded-xl cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/admin/delete-user")}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Delete User</h2>
              <p className="text-sm text-gray-600 mt-2">Delete User Data From The System</p>
            </div>
            <div className="text-red-500">
              <UserMinus size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;