import React, { useState ,useRef} from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile  } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const dispatcher=useDispatch()  
  const navigate=useNavigate();
  const [isSignInForm,setIsSignInForm] = useState(true);
  const toggleSignInForm = () => 
  {
      setIsSignInForm(!isSignInForm)
  }
  
  const [errorMessage,setErrorMessage] = useState('null')
  
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null) 

  const handleButtonClick = () =>
  {
      // for Validation of form data
      
      const message = checkValidData(email.current.value,password.current.value)
      setErrorMessage(message)
      if(message) return;

      if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          }).then(() => {
            const {uid, email , displayName , } = auth.currentUser;
            dispatcher(addUser({uid:uid,email:email,displayName:displayName}))
          }).catch((error) => {
            navigate('/error')
          });
          
          navigate("/browse")
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage)
        });
      }else {
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          navigate("/browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage)
        });

      }
  }
  return (
    <div>
      <Header/>
      <img className="absolute" src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Background Img" />
      <form onSubmit={(e)=>e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-24 left-0 right-0 mx-auto text-white rounded-lg bg-opacity-80'>
          <h1 className='font-bold text-3xl mb-7'>{isSignInForm ?"Sign In" :"Sign Up"}</h1>
          {
            !isSignInForm && <input type="text" ref={name} placeholder='Name' className='p-4 my-3 w-full bg-gray-800'/>
          }
          <input type="email" ref={email} placeholder='Email Address'  className='p-4 my-3 w-full bg-gray-800' />
          <input type="password" ref={password} placeholder='Password' className='p-4 my-3  w-full bg-gray-800'/>
          {  errorMessage!=="null" && <p className='text-red-500 font-bold text-lg'>{errorMessage}</p>}
          <button className='p-4 my-3 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ?"Sign In" :"Sign Up"}</button>
          <p  className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ?"New To Netflix ? Sign Up Now" :"Already Registered ? Sign In Now"}</p>
      </form>
    </div>  
  )
}

export default Login