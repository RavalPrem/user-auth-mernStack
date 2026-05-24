import React, { useEffect, useState } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({ statusOfAuthenticated }) => {
  const location = useLocation() //used for location (web path)
  const navigate = useNavigate() //uswd to redirect users to particular page

  useEffect(() => {
    //it will navigate to the home page if user had an account with valid jwtToken
    if (localStorage.getItem('jwtToken')) {
      statusOfAuthenticated(true)

      if (location.pathname === '/' ||
        location.pathname === '/signup' ||
        location.pathname === '/login'
      ) {
        navigate('/home', { replace: false }) 
      }

    }
  }, [location, navigate, statusOfAuthenticated]) //dependencies

  return (
    null //returning null because we had nothing to show, this page is about to create function and export it in the App.jsx file
  )
}

export default RefreshHandler