import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../util'
import { ToastContainer,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target

    const copySignupInfo = { ...signUpInfo }
    copySignupInfo[name] = value

    setSignUpInfo(copySignupInfo)
  }

  const formHandle = async(e) => {
    e.preventDefault()

    const { name, email, password } = signUpInfo

    if (!name || !email || !password) {
      return handleError('name, email and password needed bro')
    }

    try {
      const url = "https://user-auth-mern-stack-api.vercel.app/auth/signup"

      const response = await fetch(url, {
        method : "POST",
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(signUpInfo)
      });

      const result = await response.json()
      const {success, message, error} = result


      if(success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate('/login')
        },2000)
      } else if(error) {
        const details = error.details[0].message;
        handleError(details)
      } else if(!success) {
        handleError(message)
      }

      console.log(result)
    } catch (error) {
        handleError(error)
    }
  }

  return (
    <div className='h-screen w-screen flex flex-col gap-4 items-center justify-center bg-[#111519] text-[#F87060] text-[1.2rem]'>
      <h1 className='text-3xl'>Signup</h1>
      <form
        className='p-10 rounded-4xl flex flex-col gap-4 border border-[#27c733]'
        onSubmit={formHandle}
      >
        <div className='grid gap-2'>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            autoComplete='name'
            placeholder='Enter Your name ...'
            value={signUpInfo.name}
            className='p-4 outline outline-gray-500 rounded-2xl'
          />
        </div>

        <div className='grid gap-2'>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoComplete='email'
            placeholder='Enter Your Email ...'
            value={signUpInfo.email}
            className='p-4 outline outline-gray-500 rounded-2xl w-100'
          />
        </div>

        <div className='grid gap-2'>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete='current-password'
            placeholder='Enter Your password ...'
            value={signUpInfo.password}
            className='p-4 outline outline-gray-500 rounded-2xl w-100'
          />
        </div>
        <div className='mt-3 w-full grid place-items-center'>
          <button
            className='outline outline-white py-4 w-50 hover:outline-gray-400 hover:cursor-pointer rounded-full'
            type='submit'
          >
            Sign Up
          </button>
        </div>
        <span className='text-white text-[22px] text-center'>
          Already Have an account ?
          <Link to="/login" className='text-blue-400'>  Login</Link>
        </span>
      </form>
      {/* <ToastContainer />
       */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />

    </div>
  )
}

export default Signup