import React, { useState } from "react";

const CustomSwitch = ({ checked, onChange }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

const EditUser = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");

  // Fetch user data by ID
  const fetchUserData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8081/api/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        setError("User not found.");
        setUserData(null);
      }
    } catch (err) {
      setError("An error occurred while fetching user data.");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle saving updated user data
  const handleSaveUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        alert("User updated successfully!");
        setIsEditable(false);
      } else {
        const errorData = await response.json();
        console.error("Error updating user:", errorData);
        setError("Failed to update user. Please try again.");
      }
    } catch (err) {
      console.error("Error occurred while updating user:", err);
      setError("An error occurred while updating user.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Search Bar */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search User by ID</h2>
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder="Enter user ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="bg-gray-50 rounded-lg p-3 w-full outline-none border border-gray-300"
            />
            <button
              onClick={() => fetchUserData(searchId)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* User Details and Edit Form */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          userData && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src="src/assets/images/Profile.png"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Edit</span>
                  <CustomSwitch
                    checked={isEditable}
                    onChange={setIsEditable}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {Object.entries(userData).map(([key, value]) => (
                  <div
                    className="grid grid-cols-[120px,1fr] items-center gap-4"
                    key={key}
                  >
                    <label className="text-gray-600 capitalize">{key}</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setUserData({ ...userData, [key]: e.target.value })
                      }
                      disabled={!isEditable}
                      className="bg-gray-50 rounded-lg p-3 w-full outline-none disabled:text-gray-600"
                    />
                  </div>
                ))}
              </div>

              {isEditable && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSaveUpdate}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Save Update
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EditUser;
