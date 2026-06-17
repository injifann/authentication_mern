import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function Register({ setUser}) {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password) {
      toast.error("Please Enter all required fields");
      return;
    }
    else {
      try {
        setIsRegistering(true); 
        const res = await axios.post("http://localhost:5000/api/user/register", formData);
        setUser(res.data);
        localStorage.setItem("token", res.data.token);
        toast.success("Registered successfully");
        navigate("/login");
      }
      catch (error) {
        toast.error(error.response?.data?.message || "Failed to register");
      }
      finally {
        setIsRegistering(false);
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100">
        
        {/* Heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
          <h2 className="text-center text-3xl font-bold font-sans tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Join us to get started
          </p>
        </div>

        {/* Form Container */}
        <div>
          <form className="space-y-5" onSubmit={handleSubmission}>
            
            {/* Username Field */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                id="userName"
                type="text"
                name="userName"
                placeholder="Enter your username"
                value={formData.userName}
                onChange={handleInput}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email" 
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInput}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password" 
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInput}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isRegistering}
                className={`flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  isRegistering 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'
                }`}
              >
                {isRegistering ? "Registering..." : "Register"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}