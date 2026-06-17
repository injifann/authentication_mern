import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {Route,Routes,Navigate } from 'react-router'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register'

export default function App() {
  
  const[users,setUsers]=useState(null);
  const [error,setError]=useState('');
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    const fetchUsers=async()=>{
       const token=localStorage.getItem("token");
       if(token)
       {
        try
        {
           const res=await axios.get("http://localhost:5000/api/users/me",{
            headers:{Authorization:`Bearer ${token}`} })
            setUsers(res.data);
          
        }
        catch(error)
        {
          setError("Failed to load user data");
          console.log(error);
          localStorage.removeItem("token");

        }
        finally{
          setIsLoading(false)
        }
    }}
    fetchUsers();
  },[])
if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Verifying session...</p>
      </div>
    );}

  return (
        
        <Routes>
        <Route path='/' element={users ?<HomePage user={users} error={error}/>:<Navigate to={"/login"}></Navigate>}> </Route>
        <Route path="/login" element={<Login  setUsers={setUsers}/>}></Route>
        <Route path='/register' element={<Register setUsers={setUsers}/>}></Route>
       </Routes>
  )
}
