import "./style.scss";
import "./mediaQuery.scss";
import { useTheme } from "../../components/index";
import Navbar from "../../components/Navbar";

function HowItWorks({ login }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className={`container ${isDark ? "dark" : ""}`}>
      <Navbar login={login} />
      <div className="main-card">
        <div className={`how_it_work-container ${isDark ? "dark-light" : " "}`}>
          <div className={`topcard ${isDark ? "dark-light" : " "}`}>
            <h2 className={`${isDark ? "dark-light" : " "}`}>How It Works</h2>
            <p>
              SMIT-Share (SS) is easy solution to share files, text and links to
              everyone.
            </p>
          </div>
          <div className={`bottomcard ${isDark ? "dark-light" : " "}`}>
            <div className="step number">
              <h1 className={isDark ? "dark-text" : " "}>1.</h1>
              <h3 className={isDark ? "dark-text" : " "}>
                Connect your devices to the <span>network</span>
              </h3>
            </div>
            <div className="step number">
              <h1 className={isDark ? "dark-text" : " "}>2.</h1>
              <h3 className={isDark ? "dark-text" : " "}>
                <span>Upload</span> to AirForShare anything you want
              </h3>
            </div>
            <div className="step">
              <h1 className={isDark ? "dark-text" : " "}>3.</h1>
              <h3 className={isDark ? "dark-text" : " "}>
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
