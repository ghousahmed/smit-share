import "./style.scss";
import "./mediaQuery.scss";
import {
  useTheme,
  // useScreenWidth,
  // useEffect,
  useState,
  Link,
  Navbar,
  Footer,
} from "../../components/index";
import sendFeedback from "../../firebase/sendFeedback.js";
import send from "./../../assets/send.webp";

function Feedback({ login }) {
  const { isDark } = useTheme();
  const [isSubmitted, setSubmitState] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [formDataErrors, setFormDataErrors] = useState({});
  const [formData, setForm] = useState({
    email: "",
    textArea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...formDataErrors };

    if (name === "email") {
      const emailValid = value === "" || validateEmail(value);
      errors.email = emailValid ? "" : "Please enter a valid email address";
    }

    setFormDataErrors(errors);

    setForm({
      ...formData,
      [name]: value,
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
    e.preventDefault();
    setLoader(true);
    sendFeedback(formData.email, formData.textArea).then((res) => {
      console.log(res);
      setSubmitState(true);
      setLoader(false);
    });
    setForm({
      email: "",
      textArea: "",
    });
  };

  return (
    <div className={`container ${isDark ? "dark" : ""}`}>
      <Navbar />

      <div className="main-card">
        {isLoading ? (
          <div className="load">
            <div class="loader"></div>
          </div>
        ) : (
          <div className={`feedback ${isDark ? "dark-light" : " "}`}>
            {!isSubmitted ? (
              <form>
                <h2 className={isDark ? "dark-light" : " "}>
                  Share your experience
                </h2>
                <div className={`fields ${isDark ? "dark-light" : " "}`}>
                  <span>
                    <p className={isDark ? "dark-light" : " "}>Email</p>
                    <input
                      value={formData.email}
                      name="email"
                      className={`${isDark ? "dark-light dark-input" : " "}`}
                      type="search"
                      placeholder="Enter your email address"
                      onChange={handleChange}
                    />
                    <p
                      className={`error-message ${
                        formDataErrors.email ? "show" : ""
                      } ${isDark ? "dark-error" : " "}`}
                    >
                      {formDataErrors.email ? formDataErrors.email : ""}
                    </p>
                  </span>
                </div>
                <div className={`fields ${isDark ? "dark-light" : " "}`}>
                  <span>
                    <p className={`${isDark ? "dark-light" : " "}`}>Feedback</p>
                    <textarea
                      value={formData.textArea}
                      placeholder="Type here"
                      name="textArea"
                      className={`text-area ${
                        isDark ? "dark-light dark-text-area" : " "
                      }`}
                      cols="30"
                      rows="10"
                      onChange={handleChange}
                    ></textarea>
                  </span>
                </div>
                <div className={`fields ${isDark ? "dark-light" : " "}`}>
                  <button
                    className={`send-feedback-btn ${
                      isDark ? "dark-light-btn" : " "
                    }`}
                    onClick={sendfeedbackToFirestore}
                    disabled={isButtonDisabled()}
                  >
                    Send Feedback
                  </button>
                </div>
              </form>
            ) : (
              <div className={`thanks ${isDark ? "dark-light" : " "}`}>
                <div className={`thank ${isDark ? "dark-light" : " "}`}>
                  <img src={send} alt="" className="icon" />
                  <h1 className={` ${isDark ? "dark-light" : " "}`}>
                    Thanks for your feedback!
                  </h1>
                  <p>
                    Sharing your experience with us is extremely helpful. You
                    rocks!
                  </p>
                  <Link to="/" className="btn">
                    Go to home
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Feedback;
