import "../../mediaquery/mediaquery.scss";
import "../../pages/Home/css/style.scss";
import LoginForm from "../../components/LoginForm";
import LOGO from "../../assets/logo.svg";
import { MdLightMode } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import useScreenWidth from "../../helper/screenWidth";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import { auth, signInWithEmailAndPassword } from "../../db/index";

function LoginPage() {
  let loginUser = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        <Alert message="Success Text" type="success" />;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const screenWidth = useScreenWidth();
  const { isDark, toggleTheme } = useTheme();
  useEffect(() => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);
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
              <li>How it works</li>
              <li>Download</li>
              <li>Upgrade</li>
              <li>Feedback </li>
              <li className="menu-btn">
                <span> Login </span>/{" "}
                <span>
                  {" "}
                  <Link
                    className="menu-btn"
                    to={"/signup"}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    Register{" "}
                  </Link>
                </span>
              </li>
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
              <li>
                <FiMenu size={30} />
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={`main-card ${isDark ? "dark-lighter" : " "}`}>
        <LoginForm loginUser={loginUser} />
      </div>
    </div>
  );
}
export default LoginPage;
