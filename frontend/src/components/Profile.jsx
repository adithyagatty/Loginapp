import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection

const Profile = () => {
  const [userData, setUserData] = useState(null); // State for storing user data
  const [error, setError] = useState(null); // State for storing error messages
  const [formData, setFormData] = useState({ username: '', email: '', password: '' }); // Form state
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
          setError('Please log in first'); // No token, prompt to login
          return;
        }
        // Send token as Authorization header
        const response = await axios.get('http://localhost:5000/profile/getprofile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData(response.data); // Store the response data in state
        setFormData({ username: response.data.username, email: response.data.email }); // Populate form fields
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setError('Unauthorized. Please log in first');
          } else {
            setError('An error occurred. Please try again later.');
          }
        } else {
          setError('Network error. Please check your connection.');
        }
      }
    };

    fetchUserData(); // Call the function to fetch data
  }, [isModalOpen]); // Empty dependency array ensures it runs only once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in first');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/profile/updateprofile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      setUserData(response.data); // Update the user data with the latest changes
      setIsModalOpen(false); // Close the modal after successful update
      
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error updating profile');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    
  };
  const handledeleteModalClose = () => {
    setdeleteModalOpen(false);
    
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in first');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:5000/profile/deleteprofile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      alert('User deleted successfully!');
      localStorage.removeItem('token'); // Clear the token after deletion
      navigate('/login'); // Redirect the user to the login page after deletion
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert('Error deleting user!');
    }
  };


  if (!userData && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p>{error}</p>
          <button
            className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Profile</h2>
        {/* Profile Info */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Personal Information</h3>
          <ul className="list-disc pl-6">
            <li className="text-lg text-gray-600">Username: {userData.username}</li>
            <li className="text-lg text-gray-600">Email: {userData.email}</li>
          </ul>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsModalOpen(true)} // Open the modal on button click
          >
            Edit Profile
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={()=>setdeleteModalOpen(true)} // Open the modal on button click
          >
            Delete Profile
          </button>
          <a href="/"><button
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" // Open the modal on button click
          >
            Home
          </button></a>
        </div>
      </div>

      {/* Modal for editing profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-lg text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-lg text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update Profile
                </button>
                
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
       {deleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete your profile?</h3>
            <div className="flex justify-end space-x-4">
              {/* Close button */}
              <button 
                onClick={handledeleteModalClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Close
              </button>

              {/* Confirm Delete button */}
              <button 
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
