import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMinus, Search } from 'lucide-react';

const DeleteUser = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch user details based on ID
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setUserDetails(null);

    try {
      const response = await fetch(`http://localhost:8081/api/users/${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        setError('User not found. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while searching for the user.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete the user
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/${userDetails.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setShowDeleteDialog(false);
        setUserDetails(null);

      } else {
        setError('Failed to delete the user.');
      }
    } catch (err) {
      setError('An error occurred while deleting the user.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Delete User</h1>
          <p className="text-gray-600 mt-2">Search for the user you want to delete by ID</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <Search size={20} />
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* User Details */}
        {loading && <p>Loading...</p>}
        {userDetails && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="../src/assets/Profile.png"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{userDetails.name}</h2>
                  <p className="text-gray-600">{userDetails.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="mt-1">{userDetails.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="mt-1">{userDetails.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="mt-1">{userDetails.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <p className="mt-1">{userDetails.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <UserMinus size={20} />
                Delete User
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. This will permanently delete the user
                account and remove all associated data from the system.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteUser;
