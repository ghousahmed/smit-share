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
import { Switch, notification } from "antd";
import { auth, signInWithEmailAndPassword } from "../../db/index";
import { useTranslation } from "react-i18next";

function LoginPage({ login }) {
  const { t, i18n } = useTranslation();

  const handleChange = (checked) => {
    const newLanguage = checked ? "ur" : "en";
    i18n.changeLanguage(newLanguage);
  };
  let loginUser = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        notification.success({
          message: "Login Success",
          description: `Welcome, ${user.email}!`,
          duration: 2.5,
        });
        // console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        notification.error({
          message: "Login Failed",
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
              <Link
                to="/how-it-works"
                style={{
                  textDecoration: "none",
                  color: isDark ? "#fff" : "#000",
                }}
              >
                How it works
              </Link>

              <li className={isDark ? "dark-text" : " "}>
                <Link
                  to={"/feedback"}
                  style={{
                    textDecoration: "none",
                    color: isDark ? "#fff" : "#000",
                  }}
                >
                  {t("Feedback")}
                </Link>
              </li>
              {login ? (
                <li className="menu-btn" onClick={logoutUser}>
                  {t("Logout")}
                </li>
              ) : (
                <li className="menu-btn">
                  <span>

                    {" "}
                    <Link
                      className="menu-btn"
                      style={{ textDecoration: "none" }}
                      to={"/login"}
                    >
                      {" "}
                      Login{" "}
                    </Link>
                  </span>
                  /{" "}
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
              )}
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ margin: "0px 8px" }}>En</span>
                  <Switch
                    size="small"
                    defaultChecked={i18n.language === "ur"}
                    onChange={handleChange}
                  />
                  <span style={{ margin: "0px 8px" }}>Ur</span>
                </div>
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
