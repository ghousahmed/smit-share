import "./style.scss";
import "./mediaQuery.scss";
import { useTheme } from "../../components/index";
import Navbar from "../../components/Navbar";

function HowItWorks({ login }) {
  const { isDark } = useTheme();
  return (
    <div className={`container ${isDark ? "dark" : ""}`}>
      <Navbar login={login} />
      <div className={`main-card ${isDark ? "dark-light" : " "}`}>
        <div className="how_it_work-container">
          <div className="topcard">
            <h2 className={isDark ? "dark-text" : " "}>How It Works</h2>
            <p>
              SMIT-Share (SS) is easy solution to share files, text and links to
              everyone.
            </p>
          </div>
          <div className="bottomcard">
            <div className="step number">
              <h1 className={isDark ? "dark-text" : " "}>1.</h1>
              <h3 className={isDark ? "dark-text" : " "}>
                Connect your devices to the <span>network</span>
              </h3>
            </div>
            <div className="step number">
              <h1 className={isDark ? "dark-text" : " "}>2.</h1>
              <h3 className={isDark ? "dark-text" : " "}>
                <span>Upload</span> to SMIT-Share anything you want
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
