import React, { use } from 'react'

export default function HomePage({user,error}) {
  
  console.log(user.userName,"from home page");
  console.log(user.email);
  return (
    <div>
      {error && (<p>{error}</p>)}

      {user && (<div><p>Welcome </p>
      <p>{user.userName}</p>
      <p>{user.email}</p></div>)}
      
    </div>
  )
}
