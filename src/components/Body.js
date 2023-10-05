import React, { useEffect } from 'react'
import Browse from './Browse'
import Login from './Login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Body = () => {
  const dispatcher=useDispatch()
  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/browse",
      element:<Browse/>
    }
  ])
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email , displayName , } = user;
        dispatcher(addUser({uid:uid,email:email,displayName:displayName}))
      } else {
        // User is signed out
        dispatcher(removeUser())
      }
    });
    
  },[])

  return (
    <div className=''> 
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body