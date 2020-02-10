import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Loader from './components/Loader'
import Homepage from './pages/Homepage';
import UserProfilePage from './pages/UserProfilePage';
import NavBar from './components/Navbar';
import Aboutpage from './pages/Aboutpage';
import { ToastContainer } from 'react-toastify';
import MyProfile from './pages/MyProfile';
import UploadPage from './pages/UploadPage';


function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )
  const handleLogOut = () => {
    // console.log(loggedIn)
    if (loggedIn === true) {
      setLoggedIn(false)
      localStorage.removeItem("jwt")
      localStorage.removeItem("name")
    }
  }

  useEffect(() => {
    // performing a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        // If successful, we do stuffs with 'result'
        setUsers(result.data)
        setLoading(false)
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
      })
  }, [])

  const handleLogin = () => {
    // login logic here

  }

  return (

    <>
      < NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleLogOut={handleLogOut} />


      <ToastContainer />

      <Route exact path="/">
        {/* exact specifies path at exactly "/" forward sign */}
        <Homepage users={users} />

      </Route>

      <Route path="/about">
        <Aboutpage />
      </Route>

      <Route path="/user/:userId/:username">
        <UserProfilePage />
      </Route>

      <Route path="/uploadPage">
        <UploadPage />
      </Route>


      <Route path="/myProfile">
        <MyProfile />
      </Route>

      {/* :id to determine which user profile is being viewed */}

      {loading ? <Loader width="500px" height="500px" color="#1d3f72" /> : false}

    </>
  )
}


//axios.get("url")
//.then(result => {setUsers(results.data);})


export default App;
