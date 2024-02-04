import "../pages/Home/css/style.scss";
import "../mediaquery/mediaquery.scss";
import {
  useTheme,
  useScreenWidth,
  useEffect,
  useState,
  auth,
  signOut,
  LOGO,
  FiMenu,
  MdLightMode,
  MdDarkMode,
  Link,
  Switch,
  notification,
  useTranslation,
} from "../components/index.js";

const Navbar = ({ login }) => {
  const { isDark, toggleTheme } = useTheme();
  const screenWidth = useScreenWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleChange = (checked) => {
    const newLanguage = checked ? "ur" : "en";
    i18n.changeLanguage(newLanguage);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        notification.success({
          message: "Logged Out",
          duration: 2.5,
        });
        console.log(user);
        console.log("out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : " "}>
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
                    <Link
                      className="menu-btn"
                      style={{ textDecoration: "none" }}
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </span>
                  /
                  <span>
                    <Link
                      className="menu-btn"
                      to={"/signup"}
                      style={{ textDecoration: "none" }}
                    >
                      Register
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
          {isMenuOpen ? (
            <div className="mobile-menu">
              <ul>
                <li className={isDark ? "dark-text" : ""}>
                  <Link
                    to="/how-it-works"
                    style={{
                      textDecoration: "none",
                      color: isDark ? "#fff" : "#000",
                    }}
                  >
                    How it works
                  </Link>
                </li>
                <li className={isDark ? "dark" : " "}> {t("Download")}</li>
                <li className={isDark ? "dark" : " "}>{t("Upgrade")}</li>
                <li className={isDark ? "dark" : " "}>{t("Feedback")}</li>
                <li className={isDark ? "dark" : "menu-btn"}>
                  <span>
                    <Link
                      className="menu-btn"
                      to={"/login"}
                      style={{ textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </span>
                  /
                  <span>
                    <Link
                      className="menu-btn"
                      to={"/signup"}
                      style={{ textDecoration: "none" }}
                    >
                      Register
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
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
