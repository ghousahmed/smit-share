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
import sendFeedback from "../../firebase/sendFeedback.js";
import send from './../../assets/send.webp'

function Feedback({ login }) {
  const { isDark, toggleTheme } = useTheme();
  const screenWidth = useScreenWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitted, setSubmitState] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [formDataErrors, setFormDataErrors] = useState({});
  const [formData, setForm] = useState({
    email: '',
    textArea: '',
  });


  useEffect(() => {
    updateBodyClass();
  }, [isDark]);

  const updateBodyClass = () => {
    document.body.classList.toggle("dark", isDark);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...formDataErrors };

    if (name === 'email') {
      const emailValid = value === '' || validateEmail(value);
      errors.email = emailValid ? '' : 'Please enter a valid email address';
    }

    setFormDataErrors(errors);

    setForm({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isButtonDisabled = () => {
    return !formData.email || formDataErrors.email || !formData.textArea;
  };

  const sendfeedbackToFirestore = async (e) => {
    e.preventDefault()
    setLoader(true)
    sendFeedback(formData.email, formData.textArea)
    .then((res) => {
      console.log(res)
      setSubmitState(true)
      setLoader(false)
      })
    setForm({
      email: '',
      textArea: '',
    })
  }


  return (
    <div className={`container ${isDark ? "dark" : ""}`}>
      <div className="header-bar">
        <div className="logo">
          <Link to='/'>
          <img src={LOGO} alt="icon" />
          </Link>
        </div>
        <div className="menu-bar">
          {screenWidth.widthScreen > 768 ? (
            <ul>
              <li className={isDark ? "dark-text" : " "}>
                <Link
                  to="/how-it-works"
                  className={isDark ? "dark-text" : " "}
                  style={{
                    textDecoration: "none",
                    color: isDark ? "#4a4a4a" : "",
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
                  color: "#252526",
                }}
              >
                Feedback
              </Link></li>
              <li className="menu-btn"><Link to='/login' style={{textDecoration: 'none', color: "#638eff"}}>Login</Link> / <Link to='/signup' style={{textDecoration: 'none', color: "#638eff"}}>Register</Link></li>
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
                      color: isDark ? "#fff" : "#4a4a4aa6",
                    }}
                  >
                    How it works
                  </Link>
                </li>
                <li className={isDark ? "dark" : " "}>Download</li>
                <li className={isDark ? "dark" : " "}>Upgrade</li>
                <li className={isDark ? "dark" : " "} style={{color: "#000"}}>Feedback</li>
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
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="main-card">

        {
          isLoading ? (
            <div className="load">
              <div class="loader"></div>
            </div>
          ) : (
            <div className={`feedback ${isDark ? "dark-light" : " "}`}>
              {!isSubmitted ? (
                <form>
                  <h2 className={`${isDark ? "dark-light" : " "}`}>Share your experience</h2>
                  <div className={`fields ${isDark ? "dark-light" : " "}`}>
                    <span>
                      <p className={`${isDark ? "dark-light" : " "}`}>Email</p>
                      <input value={formData.email} name="email" className={`${isDark ? "dark-light dark-input" : " "}`} type="search" placeholder="Enter your email address" onChange={handleChange} />
                      <p className={`error-message ${formDataErrors.email ? 'show' : ''} ${isDark ? "dark-error" : " "}`}>{formDataErrors.email ? formDataErrors.email : ''}</p>
                    </span>
                  </div>
                  <div className={`fields ${isDark ? "dark-light" : " "}`}>
                    <span>
                      <p className={`${isDark ? "dark-light" : " "}`}>Feedback</p>
                      <textarea value={formData.textArea} placeholder="Type here" name="textArea" className={`text-area ${isDark ? "dark-light dark-text-area" : " "}`} cols="30" rows="10" onChange={handleChange}></textarea>
                    </span>
                  </div>
                  <div className={`fields ${isDark ? "dark-light" : " "}`}>
                    <button className={`send-feedback-btn ${isDark ? "dark-light-btn" : " "}`} onClick={sendfeedbackToFirestore} disabled={isButtonDisabled()}>Send Feedback</button>
                  </div>
                </form>
              ) : (
                <div className={`thanks ${isDark ? "dark-light" : " "}`} >
                  <div className={`thank ${isDark ? "dark-light" : " "}`} >
                    <img src={send} alt="" className="icon" />
                    <h1 className={` ${isDark ? "dark-light" : " "}`}>Thanks for your feedback!</h1>
                    <p>
                      Sharing your experience with us is extremely helpful. You rocks!
                    </p>
                    <Link to="/" className="btn">Go to home</Link>
                  </div>
                </div>
              )}
            </div>
          )
        }
      </div>
      <div className="footer">
        <span>
          © 2023-2024 AirForShare.com <br />
          Made in<Link className="link" to="https://www.linkedin.com/company/saylanimasstraining/?originalSubdomain=pk"> SMIT.com </Link>
          with ❤️
        </span>
      </div>
    </div >
  );
}

export default Feedback;
