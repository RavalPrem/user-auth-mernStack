import React, { useState } from 'react'
import {Routes, Route,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import RefreshHandler from './locationHandler/RefreshHandler'

//the topic of private routing

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login'/>
  }

  return (
    <div className="App">
      
      <RefreshHandler statusOfAuthenticated={setisAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>

        {/*Private route*/}
        <Route path="/home" element={<PrivateRoute element={<Home />}/>}/>
      </Routes>
    </div>
  )
}

export default App