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
import { notification } from "antd";
import { auth, signInWithEmailAndPassword } from "../../db/index";

function LoginPage() {
  let loginUser = (values) => {
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
        
        const errorMessage = error.message;
        notification.error({
          message: 'Login Failed',
          description: errorMessage,
          duration: 2.5,
        });
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
              <li><Link className={isDark ? "dark-text" : ""} to='/how-it-works' style={{textDecoration: "none",  color: isDark ? '' : '#3e3e42' }}>How it works</Link></li>
              <li className={isDark ? "dark-text" : ""}>Download</li>
              <li className={isDark ? "dark-text" : ""}>Upgrade</li>
              <li><Link className={isDark ? "dark-text" : ""} to='/feedback' style={{textDecoration: "none",  color: isDark ? '' : '#3e3e42' }}>
              Feedback
              </Link> </li>
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
      <div className="footer">
        <span>
          © 2023-2024 AirForShare.com <br />
          Made in<Link className="link" to="https://www.linkedin.com/company/saylanimasstraining/?originalSubdomain=pk"> SMIT.com </Link>
          with ❤️
        </span>
      </div>
    </div>
  );
}
export default LoginPage;
