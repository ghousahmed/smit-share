import LoginForm from "../../components/LoginForm";
import LOGO from "../../assets/logo.svg";
import { MdLightMode } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import useScreenWidth from "../../helper/screenWidth";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import SignupForm from "../../components/SignupForm";
import React from 'react';
import { auth, createUserWithEmailAndPassword } from "../../db/index";
function SignupPage() {

  const registerUser = (values) => {
    // console.log(values.email);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  const { theme, toggleTheme } = useTheme();
  const screenWidth = useScreenWidth();

  let styles = {
    color: theme === "dark" ? "#fff" : "",
    backgroundColor: theme === "dark" ? "#23272F" : "",
  };
  return (
    <div className="container">
      <div className="header-bar">
        <div className="logo">
          <Link to={"/"}>
            <img src={LOGO} alt="" />
          </Link>
        </div>
        <div className="menu-bar">
          {screenWidth.widthScreen > 768 ? (
            <ul>
              <li style={styles}><Link to={"/howitwork"} style={{textDecoration:"none"}}>How it works</Link></li>
              {/* <li style={styles}> <Link to={"/download"} style={{textDecoration:"none"}}> Download</Link></li>
              <li style={styles}><Link to={"/upgrade"} style={{textDecoration:"none"}}>Upgrade</Link></li> */}
              <li style={styles}><Link to={"/feedback"} style={{textDecoration:"none"}}>Feedback</Link> </li>
              <li className="menu-btn"><span> <Link className="menu-btn" to={"/login"} style={{textDecoration:"none"}}> Login </Link></span> / <span> Register </span> </li>

              <li onClick={toggleTheme}>
                {" "}
                {theme === "light" ? (
                  <MdDarkMode size={24} />
                ) : (
                  <MdLightMode size={24} color="white" />
                )}{" "}
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <FiMenu size={30} />
              </li>
            </ul>
          )}
        </div>
      </div>
      <div
        className="main-card"
        style={{ backgroundColor: theme === "dark" ? "rgb(20 23 30)" : "" }}
      >
        <SignupForm registerUser={registerUser}/>{" "}
      </div>
    </div>
  );
}
export default SignupPage;
