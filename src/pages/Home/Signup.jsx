import LOGO from "../../assets/logo.svg";
import { MdLightMode } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import useScreenWidth from "../../helper/screenWidth";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import SignupForm from "../../components/SignupForm";
import React ,{useEffect , useState} from 'react';
import {  notification } from 'antd';
import { auth, createUserWithEmailAndPassword } from "../../db/index";
function SignupPage() {

  const registerUser = (values) => {
    // console.log(values.email);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        notification.success({
          message: 'Registered Successfully',
          description: `Welcome, ${user.email}!`,
          duration: 2.5,
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notification.error({
          message: 'Error Occured',
          description: `Sorry, ${errorMessage}`,
          duration: 2.5,
        });
        console.log(errorMessage);

      });
  };

  const { theme, toggleTheme ,isDark } = useTheme();
  const screenWidth = useScreenWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    ><SignupForm registerUser={registerUser}/> </div>
  </div>
  );
}
export default SignupPage;
