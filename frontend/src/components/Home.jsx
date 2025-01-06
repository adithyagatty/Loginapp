import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleLogout=()=>{
    localStorage.removeItem('token');
    alert("successfully loged out")
    navigate("/login");
  }

  return (
    <div className="p-10">
      {/* Top Section with buttons */}
      <div className="bg-stone-200 p-8 text-3xl flex justify-center items-center rounded-t-2xl">
        <ul className="flex gap-8 flex-row flex-wrap">
          <button
            type="button"
            className="bg-blue-500 px-4 py-2 lg:px-6 lg:py-3 rounded-2xl text-white hover:bg-blue-600 transition-all"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="bg-green-500 px-4 py-2 lg:px-6 lg:py-3 rounded-2xl text-white hover:bg-green-600 transition-all"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            type="button"
            className="bg-gray-500 px-4 py-2 lg:px-6 lg:py-3 rounded-2xl text-white hover:bg-gray-600 transition-all"
            onClick={handleProfile}
          >
            Profile
          </button>
          <button
            type="button"
            className="bg-red-500 px-6 py-3 rounded-2xl text-white hover:bg-red-600 transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </ul>
      </div>

      {/* Bottom Section with welcome message */}
      <div className="bg-slate-100 flex flex-col justify-center items-center h-[470px] text-center rounded-b-2xl p-8">
        <h1 className="text-6xl font-semibold text-gray-800">Welcome to Home</h1>
      </div>
    </div>
  );
};

export default Home;
