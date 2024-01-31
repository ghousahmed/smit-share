import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLightMode } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import { MdDarkMode } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import useScreenWidth from '../../helper/screenWidth';
import { auth, signInWithEmailAndPassword } from '../../db/index';
import {  notification } from 'antd';
import LoginForm from '../../components/LoginForm';
import Loader from '../../components/Loader';
import LOGO from '../../assets/logo.svg';

function LoginPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const screenWidth = useScreenWidth();
  let loginUser = (values) => {
    setLoading(true)
    loading ? <Loader /> :
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        notification.success({
          message: 'Login Success',
          description: `Welcome, ${user.email}!`,
          duration: 2.5,
        });
        // console.log(user);
      })
      .catch((error) => {
        setLoading(false)
        const errorMessage = error.message;
        notification.error({
          message: 'Login Failed',
          description: errorMessage,
          duration: 2.5,
        });
        console.log(errorMessage);
      });
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    return (
      <div className={`container ${isDark ? "dark" : " "}`}>
        <div className="header-bar">
        <div className="logo">
            <Link to={"/"} >
            <img src={LOGO} alt="" />
            </Link>
          </div>
           <div className="menu-bar">
          {screenWidth.widthScreen > 768 ? (
            <ul>
              <li className={isDark ? "dark-text" : " "}>How it works</li>
              <li className={isDark ? "dark-text" : " "}> Download</li>
              <li className={isDark ? "dark-text" : " "}>Upgrade</li>
              <li className={isDark ? "dark-text" : " "}>Feedback</li>
              <li className="menu-btn"><span> <Link className="menu-btn" style={{textDecoration:"none"}} to={"/login"}> Login </Link></span>/ <span> <Link className="menu-btn" to={"/signup"} style={{textDecoration:"none"}}> Register </Link></span></li>
              <li onClick={toggleTheme}>
                {isDark ? (
                  <MdLightMode size={24} color="white" />
                ) : (
                  <MdDarkMode size={24} />
                )}
              </li>
            </ul>
          ) : (
            <ul>
              <li onClick={toggleMenu}>
                <FiMenu size={30} />
              </li>
              <li onClick={toggleTheme}>
                {isDark ? (
                  <MdLightMode size={24} color="white" />
                ) : (
                  <MdDarkMode size={24} />
                )}
              </li>
            </ul>
          )}
          {isMenuOpen ? (
            <div className="mobile-menu">
              <ul>
                <li className={isDark ? "dark" : " "}>How it works</li>
                <li className={isDark ? "dark" : " "}> Download</li>
                <li className={isDark ? "dark" : " "}>Upgrade</li>
                <li className={isDark ? "dark" : " "}>Feedback</li>
                <li className={isDark ? "dark" : "menu-btn"}>
                  Login / Register
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        </div>
        <div
          className="main-card"
          style={{ backgroundColor: theme === "dark" ? "rgb(20 23 30)" : "" }}
        ><LoginForm loginUser={loginUser}/> </div>
      </div>
    );
}
export default LoginPage;