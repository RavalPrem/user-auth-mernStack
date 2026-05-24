import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../util'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setproducts] = useState([])
  
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('Username'))
  },[])

  const handleLogOut = (e) => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('Username')
    
    handleSuccess('log out suuccessfully')
    setTimeout(() => {
      navigate('/login')
    },2500)
  }

  const fetchProducts = async(e) => {
    try {
      const url = 'http://localhost:8080/products'
      
      const headers = {
        headers : {
          'authorization' : localStorage.getItem('jwtToken')
        }
      }
      const response = await fetch(url,headers)

      const result = await response.json()
      console.log(result)
      setproducts(result)

    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() =>{
    fetchProducts()
  },[])

  return (
    <div className='h-screen w-screen text-4xl flex flex-col gap-10 items-center justify-center'>
      <h1>
        {loggedInUser}
      </h1>
      <button
        className='text-white text-3xl rounded-2xl bg-[#289090] hover:bg-[#102d45] p-4 duration-500 hover:cursor-pointer'
        onClick={handleLogOut}     
      >
        Log Out
      </button>
      <div>
        {
          products.map((e,index) => {
            return (
              <div key={index}>
                <p>{e.name}  {e.age}</p>
              </div>
            )
          })
        }
      </div>
      <ToastContainer className='text-[15px]'/>
    </div>
  )
}

export default Home