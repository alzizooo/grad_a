import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    address: ''
  });

  const [error, setError] = useState(null); // To handle any API errors
  const [success, setSuccess] = useState(false); // To track success state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true); // Show success popup
        setTimeout(() => {
          setSuccess(false);

        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create user');
      }
    } catch (err) {
      setError('An error occurred while creating the user');
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-300 rounded-full mb-8">
          <h1 className="text-xl font-medium text-center py-4">Create Account</h1>
        </div>

        <div className="bg-white rounded-xl p-8">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <h2 className="text-green-500 text-xl font-bold">User Created Successfully!</h2>
                <p className="mt-2 text-gray-700">Redirecting to User Management...</p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center">
              <label className="w-24 text-gray-700">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                placeholder="Write Name"
                required
                className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700">E-Mail <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Write E-Mail"
                required
                className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700">Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                placeholder="Write Password"
                required
                className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Write Phone"
                className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700">Role <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="role"
                placeholder="Write Role"
                required
                className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Write Address"
                className="flex-1 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-green-400 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-colors"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
