import react, { useEffect, useState } from 'react';
import {Routes,Route, useNavigate,Navigate} from 'react-router';
import axios from 'axios'
import HomePage from './pages/HomePage';
import Login from './pages/Login'
import Register from './pages/Register'


export default function App() {
  const [user,setUser]=useState(null);
  const [error,setError]=useState('');
  const [isLoading,setIsLoading]=useState(true);
  const navigate=useNavigate();

  useEffect(()=>{
       const fetchUser=async ()=>{
            const token=localStorage.getItem("token");
            if(token)
            {
              try
              {
                setIsLoading(true);
                const res=await axios.get("http://localhost:5000/api/user",{headers:{
                  Authorization:`Bearer ${token}`}});
                  setUser(res.data);
              }
              catch(error)
              {
                  setError("failed to load error");
                  console.log(error.response?.data?.message);
                  localStorage.removeItem("token")
                  setUser(null);
              }
              finally{
                setIsLoading(false);
              }
            }
            else{
              setIsLoading(false);
            }

          }
          fetchUser()
  },[])
    if(isLoading){
      return <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Verifying session...</p>
      </div>
    }
  
  return (
        <Routes>
          <Route path='/' element ={ user?<HomePage setUser={setUser} error={error}/>:<Navigate to="/login"/>}></Route>
          <Route path='/login' element ={<Login/>}></Route>
          <Route path='/register' element ={<Register/>}></Route>
        </Routes>
  )
}
