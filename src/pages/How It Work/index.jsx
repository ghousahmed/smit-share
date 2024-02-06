import "./style.scss";
import "./mediaQuery.scss";
import {
  useTheme,
  useScreenWidth,
  useEffect,
  useState,
  LOGO,
  FiMenu,
  MdLightMode,
  MdDarkMode,
} from "../../components/index";
import { Link } from "react-router-dom";

function HowItWorks() {
  const { isDark, toggleTheme } = useTheme();
  const screenWidth = useScreenWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    updateBodyClass();
  }, [isDark]);

  const updateBodyClass = () => {
    document.body.classList.toggle("dark", isDark);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`container ${isDark ? "dark" : ""}`}>
      <div className="header-bar">
        <div className="logo">
          <Link to='/'>
          <img src={LOGO} alt="" />
          </Link>
        </div>
        <div className="menu-bar">
          {screenWidth.widthScreen > 768 ? (
            <ul>
              <li className={isDark ? "dark-text" : " "}>
                <Link
                  to="/how-it-works"
                  className={isDark ? "dark" : " "}
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  How it works
                </Link>
              </li>
              <li className={isDark ? "dark-text" : " "}>Download</li>
              <li className={isDark ? "dark-text" : " "}>Upgrade</li>
              <li className={isDark ? "dark-text" : " "}><Link
                to="/feedback"
                className={isDark ? "dark" : " "}
                style={{
                  textDecoration: "none",
                  color: "#4a4a4a",
                }}
              >
                Feedback
              </Link></li>
              <li className="menu-btn">Login / Register</li>
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
            <div className={`mobile-menu ${isDark ? "dark" : ""}`}>
              <ul style={{ backgroundColor: isDark ? "#252526" : "#f4f4f4" }}>
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
                <li className={isDark ? "dark" : " "}>Download</li>
                <li className={isDark ? "dark" : " "}>Upgrade</li>
                <li className={isDark ? "dark" : " "}><Link style={{
                  textDecoration: "none",
                  color: isDark ? "#fff" : "#4a4a4a89",
                }} to='/feedback'>Feedback</Link></li>
                <li className="menu-btn">Login / Register</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="main-card">
        <div className={`how_it_work-container ${isDark ? "dark-light" : " "}`}>
          <div className={`topcard ${isDark ? "dark-light" : " "}`}>
            <h2 className={`${isDark ? "dark-light" : " "}`}>How It Works</h2>
            <p>
              AirForShare (AFS) is easy solution to share files, text and links
              within the same Wi-Fi Network.
            </p>
          </div>
          <div className={`bottomcard ${isDark ? "dark-light" : " "}`}>
            <div className="step">
              <h1 className={`number ${isDark ? "dark-light" : " "}`}>1.</h1>
              <h3 className={`number ${isDark ? "dark-light" : " "}`}>
                Connect your devices to the <span>network</span>
              </h3>
            </div>
            <div className="step">
              <h1 className={`number ${isDark ? "dark-light" : " "}`}>2.</h1>
              <h3 className={`number ${isDark ? "dark-light" : " "}`}>
                <span>Upload</span> to AirForShare anything you want
              </h3>
            </div>
            <div className="step">
              <h1 className={`number ${isDark ? "dark-light" : " "}`}>3.</h1>
              <h3 className={`number ${isDark ? "dark-light" : " "}`}>
                View and manage from any <span>devices</span> *
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
