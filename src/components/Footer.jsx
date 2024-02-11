import "./index.scss";
import { FaGithub } from "react-icons/fa";
import { Link, useTheme } from "../components/index";
function Footer() {
  const { isDark } = useTheme();
  return (
    <>
      <div className="footer">
        <p>Made with ❤️ BY SMIT BATCH 10 ||</p>
        <Link
          onClick={() =>
            window.open("https://github.com/ghousahmed/smit-share", "_blank")
          }
          className="footer-link"
        >
          <FaGithub target="_blank" className={isDark ? "dark-text" : null} />
        </Link>
      </div>
    </>
  );
}

export default Footer;
