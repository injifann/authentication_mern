import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [islogging, setIslogging] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess=async(credentialResponse)=>{

    try
    {
      const res=await axios.post("http://localhost:5000/api/user/googleAuth",{
        token:credentialResponse.credential
      })
      localStorage.setItem("token",res.data.token);

      setUser(res.data.user);
      navigate("/");

    }
    catch(error)
    {
     toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to login");
    }

  }
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
   
  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please Enter all required fields");
      return;
    }

    else {
      try {
        setIslogging(true);

        const res = await axios.post("http://localhost:5000/api/user/login", formData);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("Login successfull");
        navigate("/");
      }
      catch (error) {
        toast.error(error.response?.data?.message || "Failed to Login");
      }
      finally {
        setIslogging(false);
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-100">
        
        {/* Heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
          <h2 className="text-center text-3xl font-bold font-sans tracking-tight text-gray-900">
            Login into your account
          </h2>
        </div>

        {/* Form Container */}
        <div>
          <form className="space-y-5" onSubmit={handleSubmission}>
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
                disabled={islogging}
                className={`flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  islogging 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'
                }`}
              >
                {islogging ? "Log in..." : "Log in"}
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
  
          {/* Minimalist text header */}
                <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
                  Or continue with Google
                </p>
                
                {/* The Google Button Wrapper */}
                <div className="w-full flex justify-center filter drop-shadow-sm">
                  <GoogleLogin
                   onSuccess={handleGoogleSuccess} 
                   onError={()=>{toast.error("Failed to Login")}}
                  />
                </div>

            </div>
            
            {/* Styled Link to Register */}
            <div className="text-center pt-1 text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <Link 
                to="/register" 
                className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4 transition-colors duration-200"
              >
                Register
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}