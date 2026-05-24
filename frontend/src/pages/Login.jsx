import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../util'
import { ToastContainer,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [logInInfo, setLogInInfo] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    const copyLogInInfo = { ...logInInfo }
    copyLogInInfo[name] = value

    setLogInInfo(copyLogInInfo)
  }

  const formHandle = async (e) => {
    e.preventDefault()

    const { name, email, password } = logInInfo

    if ( !email || !password ) {
      return handleError('email and password needed')
    }

    try {
      const url = "https://user-auth-mern-stack-api.vercel.app/auth/login"

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(logInInfo)
      });

      const result = await response.json()
      const { success, message, jwtToken, name ,error } = result

      if (success) {
        handleSuccess(message)

        localStorage.setItem('jwtToken',jwtToken)
        localStorage.setItem('Username',name)

        setTimeout(() => {
          navigate('/home')
        }, 2000)
      } else if (error) {
        const details = error.details[0].message;
        handleError(details)
      } else if (!success) {
        handleError(message)
      }

      console.log(result)
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <div className='h-screen w-screen flex flex-col gap-4 items-center justify-center bg-[#111519] text-[#F87060] text-[1.2rem] relative'>
      <img
        src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"
        alt="background Image"
        className='absolute top-0 left-0 h-full w-full z-1 opacity-40'
      />

      <h1 className='text-4xl text-white z-4'>Login Page</h1>
      <form 
        className='p-10 rounded-4xl flex flex-col gap-4 border border-[#27c733] z-4  backdrop-blur-md bg-[#0c1220f0]'
        onSubmit={formHandle}
      >

        <div className='grid gap-2'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            autoFocus
            autoComplete='email'
            placeholder='Enter Your Email ...'
            value={logInInfo.email}
            className='p-4 outline outline-gray-500 rounded-2xl w-100'
          />
        </div>

        <div className='grid gap-2'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            autoComplete='current-password'
            placeholder='Enter Your password ...'
            value={logInInfo.password}
            className='p-4 outline outline-gray-500 rounded-2xl w-100'
          />
        </div>

        {/*Button*/}
        <div className='mt-3 w-full grid place-items-center'>
          <button className='outline-1 outline-[white] py-4 w-50 hover:outline-gray-400 hover:cursor-pointer rounded-full bg-[#17252a] hover:bg-[#104242] text-[white] hover:text-[white]'>
            Log In
          </button>
        </div>
        <span className='text-white text-[22px] text-center'>
          Doesn't have an account ?
          <Link to="/signup" className='text-blue-400'> Sign up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login