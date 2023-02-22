import React, { useState, useEffect } from 'react'
import AppointmentList from './appointment/AppointmentList'
import RecordList from './record/RecordList'
import Home from './Home'
import MedicineList from './medicine/MedicineList'



import './index.css'
import Signup from './user/Signup'
import Signin from './user/Signin'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Alert } from 'react-bootstrap'

export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);
  const [userProf, setUserProf] = useState({});


  
    
useEffect(() => {
  let token = localStorage.getItem("token")
  // let userId = localStorage.getItem("userId")
  if (token != null) {
    let user = jwt_decode(token);

    if (user) {
        setIsAuth(true);
        setUser(user);
        
        console.log("userrrrrr:",user)
    } else if(!user){
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        setIsAuth(false);
    }
}
}, []);


  const registerHandler = (user) => {
    console.log("user:",user)
    Axios.post("auth/signup", user)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    })
  }
    
    const loginHandler = (cred) => {
      Axios.post("auth/signin", cred)
      .then(res => {
        console.log("token:", res.data.token);
        console.log("user111111:", res.data.user);
        
  
        let token = res.data.token;

        if(token != null)
        {
          localStorage.setItem("token", token);
          let user = jwt_decode(token);
          
          setIsAuth(true);
          setUser(user);
          setUserProf(res.data.user)
          console.log("res.data.user",res.data.user)
          localStorage.setItem("userId", res.data.user._id);
          localStorage.setItem("userRole", res.data.user.role);
          setMessage("User logged In successfully!")
        }
  
      })
      .catch(err => {
        console.log(err);
      })
    }

    const onLogoutHandler = (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      setIsAuth(false);
      setUser(null);
      
      setMessage("User logged out successfully")
        
    }
  
    const msg = message ? (
      <Alert variant="success">{message}</Alert>
    ) : null;

  return (
    <Router>
      <div>
      {msg}
      <div >
      <nav className='navbar' role="navigation">
        <div className='nav-wrapper container'>
          <Link to="/" className='brand-logo'>Health Tracker</Link>
          {isAuth ? (
            <div className='center'>
                {user ? "welcome " + user.user.name : null} &nbsp;
                <Link to="/logout" onClick={onLogoutHandler}>Logout</Link>
            </div>
          ) : (
            <div className='center'>
              <Link to="/signup">Signup</Link> &nbsp;
              <Link to="/signin">Signin</Link> &nbsp;
            </div>
          )}
        </div>
      </nav>
        </div>
        <div>
          <Routes>
            <Route path="/record" element={isAuth ? <RecordList />: <Signin login={loginHandler}></Signin>}></Route>
            <Route path="/" element={isAuth ? <Home />: <Signin login={loginHandler}></Signin>}></Route>

            <Route path="/appointment" element={isAuth ? <AppointmentList userProfile={userProf} />: <Signin login={loginHandler}></Signin>}></Route>
            <Route path="/medicine" element={isAuth ? <MedicineList userprofile={userProf} /> : <Signin login={loginHandler}></Signin>}></Route>
            <Route path="/signup" element= {<Signup register={registerHandler} />}></Route>
            <Route path="/signin" element={ isAuth ? <Home userProfile={userProf} /> :<Signin login={loginHandler} />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
// && (localStorage.getItem("userRole") === "admin")