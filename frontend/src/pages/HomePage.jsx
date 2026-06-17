import React from 'react';
import { useNavigate } from 'react-router';

export default function HomePage({ user, setUser,error }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500 font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md">
        
        {/* Welcome Avatar Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>

        {/* Welcome Headline */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome, <span className="text-indigo-600 font-extrabold">{user.userName}</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">You are successfully logged in</p>

        {/* Divider */}
        <hr className="my-5 border-gray-100" />

        {/* User Metadata */}
        <div className="space-y-3 text-left bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Username</span>
            <span className="text-gray-900 font-semibold">@{user.userName}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Email Address</span>
            <span className="text-gray-900 font-mono text-xs bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
              {user.email}
            </span>
          </div>
        </div>

        {/* Styled Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-[0.98] cursor-pointer"
        >
          {/* Sign-out Icon */}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          Log out
        </button>

      </div>
    </div>
  );
}