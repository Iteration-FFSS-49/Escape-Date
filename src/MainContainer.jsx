import React from 'react';
import logo from '../Images/Axolotl.png';
import SignUpPage from './pages/SignUpPage.jsx';
import DatePage from './pages/DatePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx'; 
//import { connect } = 'react-redux';


const MainContainer = props => (
  <div className = 'container'>
    <div className = 'logo'><img src={logo} alt = 'Logo'/></div>
    <h1>Escape Date</h1>
      <Router>
        <Routes>
          <Route path = '/' element={<LoginPage/>}/>
          <Route path = '/signUp' element = {<SignUpPage />}/>
          <Route path = '/newDate' element = {<DatePage />}/>
          <Route path = '/errorPage' element = {<ErrorPage/>}/>
        </Routes>
      </Router>
  </div>
)

export default MainContainer;